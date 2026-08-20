#!/usr/bin/env node
// Download every public photo Google Maps holds for a place, so a new route can be
// illustrated without hand-saving images one at a time.
//
//   node scripts/fetch-maps-photos.mjs <maps-url> --slug <place-slug> [--cycles 2] [--tries 25]
//
// Writes originals to .maps-photos/<slug>/ (git-ignored) plus a contact sheet to
// review in one look. Downscale the keepers into public/images/<slug>/ with the
// `convert` line in CLAUDE.md — the originals here are far too big to commit.
//
// Why it works this way: Maps renders photos client-side, and signed-out Maps serves
// a "limited view" with no photo grid, so there is nothing to scrape from the DOM.
// The photo list rides in the page's own /maps/preview/place RPC. That RPC's `pb`
// payload cannot be retargeted to another place by hand (swapping the feature id
// returns an empty place), so we let a headless Chrome build it for us, then replay
// it with curl. The replay is nondeterministic: the same request returns either a
// lean payload (hero photo only) or a rich one (the full list), so we retry until
// the set stops growing.

import { spawn, execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = process.env.CHROME_BIN || 'google-chrome';
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36';
// Consent cookies: without them Google answers every request with its consent wall.
const COOKIES = [
  { name: 'SOCS', value: 'CAESEwgDEgk0ODE3Nzk3MjQaAmVuIAEaBgiA_LyaBg' },
  { name: 'CONSENT', value: 'YES+cb' },
];
const PHOTO_RE = /lh\d\.googleusercontent\.com\/(?:gps-cs-s|p|geougc-cs|gps-proxy)\/[A-Za-z0-9_-]{20,}/g;

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith('--'));
const flag = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? dflt : args[i + 1];
};
if (!target) {
  console.error('usage: node scripts/fetch-maps-photos.mjs <maps-url> --slug <place-slug> [--cycles 2] [--tries 25]');
  process.exit(1);
}
const slug = flag('slug', 'place');
const tries = Number(flag('tries', 25));
const cycles = Number(flag('cycles', 2));
const outDir = join('.maps-photos', slug);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Chrome keeps writing its profile for a moment after SIGTERM, so wait for the
// process to actually exit and treat a stubborn temp dir as harmless.
async function shutdown(chrome, profile) {
  chrome.kill();
  await Promise.race([new Promise((r) => chrome.once('exit', r)), sleep(5000)]);
  for (let i = 0; i < 5; i++) {
    try { rmSync(profile, { recursive: true, force: true }); return; } catch { await sleep(400); }
  }
}

// maps.app.goo.gl short links need following before Chrome sees them.
async function resolveUrl(url) {
  let current = url;
  for (let i = 0; i < 5; i++) {
    const res = await fetch(current, { redirect: 'manual', headers: { 'User-Agent': UA } });
    const next = res.headers.get('location');
    if (!next) break;
    current = new URL(next, current).toString();
  }
  return current;
}

// Drive Chrome over CDP (node 22 has a global WebSocket, so no npm dependency).
async function capturePlaceRpc(url) {
  const profile = mkdtempSync(join(tmpdir(), 'maps-photos-'));
  const port = 9500 + Number(process.hrtime.bigint() % 400n);
  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
    '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--lang=en-US', '--window-size=1500,1400',
  ], { stdio: 'ignore' });

  let wsUrl;
  for (let i = 0; i < 40 && !wsUrl; i++) {
    await sleep(250);
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      wsUrl = (await res.json()).webSocketDebuggerUrl;
    } catch { /* not listening yet */ }
  }
  if (!wsUrl) {
    await shutdown(chrome, profile);
    throw new Error('Chrome never exposed a CDP endpoint');
  }

  const ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('CDP socket failed')); });

  let id = 0;
  let session;
  const pending = new Map(); // cdp request id -> our message id, for getResponseBody
  const send = (method, params = {}, sessionId) => {
    ws.send(JSON.stringify({ id: ++id, method, params, sessionId }));
    return id;
  };
  const rpcUrls = new Set();
  const photos = new Set();
  const rpcRequestIds = new Set();
  const navigated = new Set();

  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.method === 'Target.attachedToTarget') {
      session = msg.params.sessionId;
      for (const c of COOKIES) send('Network.setCookie', { ...c, domain: '.google.com', path: '/' }, session);
      send('Network.enable', {}, session);
      send('Page.enable', {}, session);
      send('Page.navigate', { url }, session);
    }
    // A search link resolves to a place client-side; remember where we ended up.
    if (msg.method === 'Page.frameNavigated' && msg.params.frame?.url?.includes('/maps/place/')) {
      navigated.add(msg.params.frame.url);
    }
    if (msg.method === 'Network.requestWillBeSent') {
      const u = msg.params.request.url;
      if (u.includes('/maps/preview/place')) { rpcUrls.add(u); rpcRequestIds.add(msg.params.requestId); }
      for (const m of u.match(PHOTO_RE) || []) photos.add(m);
    }
    // The body Chrome itself received is the freshest payload available — read it
    // rather than relying only on replays.
    if (msg.method === 'Network.loadingFinished' && rpcRequestIds.has(msg.params.requestId)) {
      pending.set(send('Network.getResponseBody', { requestId: msg.params.requestId }, session), true);
    }
    if (msg.id && pending.has(msg.id) && msg.result?.body) {
      for (const m of msg.result.body.match(PHOTO_RE) || []) photos.add(m);
    }
  };

  send('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: false, flatten: true });
  await sleep(18000); // the place panel and its RPC land a few seconds after load

  ws.close();
  await shutdown(chrome, profile);
  return { rpcUrls: [...rpcUrls], photos, navigated: [...navigated] };
}

function curl(url) {
  try {
    return execFileSync('curl', ['-s', '-A', UA, '-b', `SOCS=${COOKIES[0].value}`, url], {
      maxBuffer: 64 * 1024 * 1024, encoding: 'latin1',
    });
  } catch { return ''; }
}

// Replay the RPC until the photo set stops growing. Whether Google answers with the
// lean payload (hero photo only) or a fuller one is nondeterministic — about a third
// of replays come back rich, and the richest are rarer still — so be stubborn:
// replays are ~20-200KB each, and only persistence gets the whole list.
function harvest(rpcUrls, seed) {
  const photos = new Set(seed);
  // !3i20 caps how many photos the panel asks for; !1d<span> is the viewport span.
  // Both are safe to rewrite, and varying them shakes loose the full list sooner.
  const variants = [
    (u) => u,
    (u) => u.replace('!3i20', '!3i100'),
    (u) => u.replace(/!1d[\d.]+/, '!1d40000'),
    (u) => u.replace('!3i20', '!3i100').replace(/!1d[\d.]+/, '!1d200'),
  ];
  let quiet = 0;
  for (let i = 0; i < tries && quiet < 12; i++) {
    const before = photos.size;
    for (const base of rpcUrls) {
      const body = curl(variants[i % variants.length](base));
      for (const m of body.match(PHOTO_RE) || []) photos.add(m);
    }
    quiet = photos.size === before ? quiet + 1 : 0;
    console.log(`  attempt ${i + 1}: ${photos.size} unique photo${photos.size === 1 ? '' : 's'}`);
  }
  return [...photos].sort();
}

const url = await resolveUrl(target);
console.log('place url:', url);

// How complete the photo list comes back tracks how fresh the request is, so run the
// whole capture a few times — each cycle is a new page load with a new token — and
// union everything. Raise --cycles if a place still looks short of what Maps shows.
const found = new Set();
let placeUrl = url;
for (let cycle = 1; cycle <= cycles; cycle++) {
  let { rpcUrls, photos: seen, navigated } = await capturePlaceRpc(placeUrl);
  // A /maps/search/ link only emits the place RPC once Maps has settled on a single
  // result; if it redirected, retry on the place URL it landed on.
  if (!rpcUrls.length && navigated.length) {
    placeUrl = navigated[0];
    console.log('followed search link to:', placeUrl);
    ({ rpcUrls, photos: seen } = await capturePlaceRpc(placeUrl));
  }
  if (!rpcUrls.length) {
    console.error('No /maps/preview/place RPC captured. Pass a link to a single place');
    console.error('(open it in Maps and use Share), not a search or directions link.');
    process.exit(1);
  }
  console.log(`cycle ${cycle}/${cycles}: ${rpcUrls.length} place RPC call(s)`);
  for (const p of harvest(rpcUrls, seen)) found.add(p);
  console.log(`cycle ${cycle} total: ${found.size} unique photos`);
}
const photos = [...found].sort();
if (!photos.length) {
  console.error('No photos found for this place.');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

// Google's answers are nondeterministic, so a later run may surface photos this one
// missed. Merge into whatever is already on disk instead of starting over — running
// the script again a few times is a legitimate way to reach a complete set.
const manifestPath = join(outDir, 'manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : [];
const known = new Set(manifest.map((m) => m.source));
let added = 0;
for (const p of photos) {
  const source = `https://${p}`;
  if (known.has(source)) continue;
  const name = `photo${String(manifest.length + 1).padStart(2, '0')}.jpg`;
  // =w2000-h2000-k-no asks for the largest sane copy; the bare id serves a thumbnail.
  execFileSync('curl', ['-sL', '-o', join(outDir, name), `${source}=w2000-h2000-k-no`]);
  manifest.push({ name, source });
  known.add(source);
  added++;
}
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`${added} new photo(s) this run; ${manifest.length} on disk in total`);

try {
  execFileSync('montage', [
    ...manifest.map((m) => join(outDir, m.name)),
    '-tile', '3x', '-geometry', '600x450+5+5', '-background', '#222', '-label', '%f',
    join(outDir, 'contact-sheet.jpg'),
  ]);
  console.log(`contact sheet: ${join(outDir, 'contact-sheet.jpg')}`);
} catch {
  console.log('(install ImageMagick for a contact sheet)');
}

console.log(`\n${manifest.length} photo(s) in ${outDir}/ — review the sheet, then downscale keepers:`);
console.log(`  convert ${outDir}/photoNN.jpg -auto-orient -resize '1200x1200>' -strip \\`);
console.log(`    -sampling-factor 4:2:0 -interlace JPEG -quality 78 \\`);
console.log(`    public/images/${slug}/<descriptive-name>.jpg`);
