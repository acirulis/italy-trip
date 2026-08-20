import { BaseLocation, RouteItem } from '../types';

export const INITIAL_BASE_LOCATION: BaseLocation = {
  name: 'Our Living Location (Tuscany Base)',
  region: 'Sarteano / Val d’Orcia, Province of Siena, Tuscany',
  address: '42.9458216, 11.8524569 (Near Sarteano & Radicofani)',
  lat: 42.9458216,
  lng: 11.8524569,
  description: 'Our private Tuscan base camp located in the rolling hills between Val d’Orcia and Val di Chiana, ideally positioned for day trips to thermal springs, medieval hill towns, and panoramic hiking trails.',
};

export const DEFAULT_ROUTES: RouteItem[] = [
  {
    id: 'cascate-del-mulino-saturnia',
    title: 'Cascate del Mulino Thermal Springs (Saturnia)',
    subtitle: 'Cascading natural limestone thermal pools & historic stone mill',
    category: 'thermal',
    isPrimaryPick: true,
    lat: 42.6482857,
    lng: 11.5126785,
    distanceKm: 58.3,
    drivingTimeMin: 73,
    hikingTimeMin: 30,
    trailDifficulty: 'Easy',
    elevationGainM: 20,
    bestTimeToVisit: 'Early morning sunrise or late evening moonlight for steam rising over limestone terraces without crowds',
    description:
      'Italy’s most celebrated natural thermal cascades located near Saturnia. Sulfur-rich thermal water gushes continuously at a heavenly 37.5°C (99.5°F) from volcanic underground springs, cascading down multi-tiered natural travertine limestone pools beside a picturesque medieval stone mill.',
    highlights: [
      'Multi-tiered natural travertine limestone hot tubs carved by thousands of years of flowing mineral water',
      'Constant year-round 37.5°C (99.5°F) therapeutic sulfur-carbonic thermal waters',
      'Historic rustic stone watermill overlooking the cascading pools',
      '100% free open-air public access 24/7 day and night',
    ],
    practicalTips: [
      'Bring water shoes or sandals with grip for walking on wet limestone edges.',
      'Park in the dedicated free public parking lot roughly 200m away (Parcheggio Cascate del Mulino).',
      'No changing rooms or lockers on the wild free riverbank; there is a small café bar and paid showers nearby during daytime.',
      'Magical at dawn or night under the stars when the mineral steam glows in the cool air.',
    ],
    googleMapsUrl:
      'https://www.google.com/maps/place/Cascate+del+Mulino/@42.6482857,11.5126785,16z/data=!4m6!3m5!1s0x13290366b31c96c3:0x2ffca3ed7d65295f!8m2!3d42.6482857!4d11.5126785!16s%2Fg%2F11bccj9bft',
    photoUrl: '/images/saturnia/cascate-del-mulino-saturnia-thermal-springs.jpg',
    gallery: [
      {
        url: '/images/saturnia/cascate-del-mulino-saturnia-thermal-springs.jpg',
        caption: 'Cascate del Mulino: natural stepped limestone thermal pools fed by 37.5°C healing sulfur springs beside the historic stone mill',
      },
    ],
  },
  {
    id: 'sentierelsa-trail',
    title: 'Sentierelsa Trail & Diborrato Waterfall',
    subtitle: 'Turquoise river pools, stepping stones & 15m waterfall',
    category: 'trekking',
    isPrimaryPick: true,
    lat: 43.4235199,
    lng: 11.1308355,
    distanceKm: 106.7,
    drivingTimeMin: 98,
    hikingTimeMin: 120,
    trailDifficulty: 'Easy',
    elevationGainM: 45,
    bestTimeToVisit: 'Morning or sunny afternoon for vibrant turquoise water reflections & refreshing river dip',
    description:
      'An enchanted river park (Parco Fluviale dell’Alta Val d’Elsa) along the Elsa River in Colle di Val d’Elsa. World-famous for its crystal-clear turquoise waters, the 15-meter Diborrato Waterfall plunging into a deep blue pool ("Il Pozzone"), wooden bridges, and natural limestone stepping stone river crossings.',
    highlights: [
      'Cascata del Diborrato: 15-meter thundering waterfall and the 10m-deep turquoise "Pozzone" pool',
      'Attraversamento su massi: limestone stepping stones to walk directly across the crystal-clear azure river',
      'Turquoise crystal pools and refreshing natural swimming holes under the forest canopy',
      'Shaded 4km river trail with wooden walkways, historic watermills (Steccaia and Callone Reale)',
    ],
    practicalTips: [
      'Park near Ponte di Spugna (North Entrance) or near Gracciano (South Entrance by San Marziale bridge).',
      'Wear water shoes or sturdy trainers with good grip—river stones and wood can be wet and slippery.',
      'Bathing is not universally allowed: “Divieto di balneazione / No swimming” signs are posted along parts of the river, including near the pools — check the signage where you stop rather than assuming a pool is open for a dip.',
      'Completely free public access 24/7 along the 4km protected river pathway.',
    ],
    googleMapsUrl:
      'https://www.google.com/maps/place/Sentierelsa+Trail/@43.4235199,11.1308355,16z/data=!4m6!3m5!1s0x132a3ae9297a15e9:0x457aa52830608703!8m2!3d43.4235199!4d11.1308355!16s%2Fg%2F11dzdkqhxl',
    photoUrl: '/images/sentierelsa/sentierelsa-turquoise-river.jpg',
    gallery: [
      {
        url: '/images/sentierelsa/sentierelsa-turquoise-river.jpg',
        caption: 'Sentierelsa Trail: the rope-assisted stepping stone crossing over the turquoise Elsa, with travertine ledges and a deep swimming pool on the far side',
      },
      {
        url: '/images/sentierelsa/diborrato-waterfall-cascata.jpg',
        caption: 'Cascata del Diborrato: iconic 15-meter waterfall plunging into the deep blue "Il Pozzone" natural swimming pool',
      },
      {
        url: '/images/sentierelsa/sentierelsa-travertine-terraced-pools.jpg',
        caption: 'Travertine steps below the trail: the Elsa spilling over terraced limestone shelves into milky turquoise basins',
      },
      {
        url: '/images/sentierelsa/sentierelsa-stepping-stones-rapids-crossing.jpg',
        caption: 'The attraversamento su massi seen along its length — a line of limestone blocks and a guide rope carrying the path across the rapids',
      },
      {
        url: '/images/sentierelsa/sentierelsa-limestone-boulder-rapids.jpg',
        caption: 'A travertine boulder mid-river, with the Elsa breaking white around it into deep green pools',
      },
      {
        url: '/images/sentierelsa/sentierelsa-trail-map-information-board.jpg',
        caption: 'The official “Il Sentierelsa” board at the entrance: the full 4km route with numbered points of interest, from the Callone Reale to the Cascata del Diborrato',
      },
    ],
  },
  {
    id: 'bagni-san-filippo',
    title: 'Bagni San Filippo Hot Springs & Fosso Bianco',
    subtitle: 'Natural thermal forest pools & the iconic "Balena Bianca" (White Whale)',
    category: 'thermal',
    isPrimaryPick: true,
    lat: 42.9266598,
    lng: 11.7006903,
    distanceKm: 21.8,
    drivingTimeMin: 27,
    hikingTimeMin: 45,
    trailDifficulty: 'Easy',
    elevationGainM: 65,
    bestTimeToVisit: 'Morning before 10:30 AM or late afternoon for calm golden light',
    description:
      'A fairytale natural spa hidden in a lush Tuscan chestnut forest. Hot sulfurous waters (37°C - 48°C) bubble from the earth into stepped limestone pools crowned by the massive calcium carbonate rock cascade known as "Balena Bianca" (The White Whale).',
    highlights: [
      'Balena Bianca (White Whale) giant limestone waterfall formation',
      'Cascading natural thermal pools with therapeutic thermal mud',
      'Shaded forest footpath along the steaming Fosso Bianco stream',
      'Completely free public access 24/7 year-round',
    ],
    practicalTips: [
      'Bring water shoes or non-slip sandals—the calcium rock bed can be slippery and sharp.',
      'Remove silver and precious jewelry beforehand (the natural sulfur will tarnish it).',
      'Park along Via San Filippo (blue spaces require ticket, or free parking at village entrance).',
      'The upper pools near the road are lukewarm; walk 5–10 mins down the trail to reach hotter pools and the Balena Bianca.',
    ],
    googleMapsUrl:
      'https://www.google.com/maps/place/53023+Bagni+San+Filippo,+Province+of+Siena,+Italy/@42.9266598,11.7006903,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIDqwoDxFQ!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHRPTWks0LaFE3UpXe-SaUp-Yg0U0JX5UIcNgjv081tzFzUKE-ZZK6FXFgJrXo59wUnevjlARPX1Ufhws6fLfZSIdxxjtt_UvHC7daVMTQEaJTz_UALnAjw7ai2nHuc85gdlOAP43ao%3Dw114-h86-k-no!7i3968!8i2976!4m11!1m3!11m2!2sULOpeeNzFiXs4OJMZs-ZI1fxZKz8Xw!3e3!3m6!1s0x13296a79868cdf55:0x26082c9206497671!8m2!3d42.9266598!4d11.7006903!10e5!16s%2Fm%2F064kqzc?authuser=1&entry=ttu&g_ep=EgoyMDI2MDgxNy4wIKXMDSoASAFQAw%3D%3D',
    photoUrl: '/images/bagni-san-filippo/balena-bianca-google-maps.jpg',
    gallery: [
      {
        url: '/images/bagni-san-filippo/balena-bianca-google-maps.jpg',
        caption: 'Balena Bianca (White Whale) natural thermal cascade from Google Maps',
      },
      {
        url: '/images/bagni-san-filippo/balena-bianca-cascade.jpg',
        caption: 'Cascading hot mineral water flowing over the massive calcium formation',
      },
      {
        url: '/images/bagni-san-filippo/balena-bianca-limestone-detail.jpg',
        caption: 'Close-up view of the towering limestone wall and mineral deposits',
      },
      {
        url: '/images/bagni-san-filippo/balena-bianca-thermal-pools.jpg',
        caption: 'Warm thermal pools and sulfur stream nestled at the base of the formation',
      },
    ],
  },
  {
    id: 'radicofani-fortress',
    title: 'Radicofani Fortress & Via Francigena Section',
    subtitle: 'Dramatic 896m high medieval stronghold & pilgrim trek',
    category: 'trekking',
    lat: 42.8985265,
    lng: 11.7688068,
    distanceKm: 14.5,
    drivingTimeMin: 19,
    hikingTimeMin: 90,
    trailDifficulty: 'Moderate',
    elevationGainM: 240,
    bestTimeToVisit: 'Clear sunset for 360° views across Val d’Orcia and Monte Amiata',
    description:
      'Towering nearly 900 meters above sea level on a basalt cliff, the fortress of Radicofani was the legendary lair of "Ghino di Tacco" (the Tuscan Robin Hood). Part of the ancient pilgrim trail Via Francigena.',
    highlights: [
      'Climb the restored stone keep tower for one of Tuscany’s widest vistas',
      'Explore underground passageways, ancient ramparts, and historic catapults',
      'Hike a segment of the historic Via Francigena pilgrim footpath',
      'Picturesque cobblestone village with quiet trattorias',
    ],
    practicalTips: [
      'Strong winds are frequent at the summit tower; bring a light windbreaker.',
      'Small parking area available right below the fortress gates (Parcheggio Rocca).',
    ],
    photoUrl: '/images/radicofani/radicofani-fortress-tower-view.jpg',
    googleMapsUrl:
      'https://www.google.com/maps/place/Fortezza+di+Radicofani/@42.8985265,11.7688068,17z/data=!4m6!3m5!1s0x132940ec6c9d80af:0xe87705e890c96bf8!8m2!3d42.8985265!4d11.7688068!16s%2Fg%2F11c3pcrgr1',
    gallery: [
      {
        url: '/images/radicofani/radicofani-fortress-tower-view.jpg',
        caption: 'Fortezza di Radicofani: towering medieval stone keep perched at 896m above southern Tuscany',
      },
      {
        url: '/images/radicofani/radicofani-fortress-keep-walls.jpg',
        caption: 'The mighty fortified keep and outer curtain walls built by the Republic of Siena',
      },
      {
        url: '/images/radicofani/radicofani-bastion-ramparts.jpg',
        caption: 'Stone ramparts and high artillery bastions with panoramic views over Monte Amiata & Val d’Orcia',
      },
      {
        url: '/images/radicofani/radicofani-fortress-gateway.jpg',
        caption: 'Inner fortress gate, arched passageways, and archaeological remains of the garrison quarters',
      },
      {
        url: '/images/radicofani/radicofani-via-francigena-countryside.jpg',
        caption: 'The legendary Via Francigena pilgrim path winding through the rolling hills below the citadel',
      },
    ],
  },
  {
    id: 'pienza-unesco-ring',
    title: 'Pienza & Val d’Orcia UNESCO Panoramic Ring',
    subtitle: 'Renaissance ideal town & scenic rolling hills trail',
    category: 'sightseeing',
    lat: 43.0776004,
    lng: 11.6774515,
    distanceKm: 28.5,
    drivingTimeMin: 34,
    hikingTimeMin: 75,
    trailDifficulty: 'Easy',
    elevationGainM: 110,
    bestTimeToVisit: 'Late morning to combine walking with pecorino cheese tasting and lunch',
    description:
      'Pienza is the crown jewel of Renaissance urban design, redesigned by Pope Pius II in 1459. Its perimeter walls offer unmatched views over the UNESCO-listed Val d’Orcia valley.',
    highlights: [
      'Piazza Pio II, Palazzo Piccolomini, and Pienza Cathedral',
      'Panoramic wall promenade (Via del Bacio, Via dell’Amore)',
      'Tasting aged Pecorino di Pienza cheese drizzled with Tuscan honey',
      'Walk the gentle path down toward the Pieve di Corsignano church & Cappella di Vitaleta',
    ],
    practicalTips: [
      'Mind the ZTL (Limited Traffic Zone) at town gates; park at Parcheggio Gozzante or Via Mario Mencattelli.',
      'Try the local artisanal pasta "Pici all’Aglione".',
    ],
    googleMapsUrl:
      'https://www.google.com/maps/place/53026+Pienza,+Province+of+Siena,+Italy/@43.0776004,11.6774515,16z/data=!4m6!3m5!1s0x13296709c3dd8955:0x3ec38ba0023cdad7!8m2!3d43.0776004!4d11.6774515!16zL20vMDZ5dmZs',
    photoUrl: '/images/pienza/pienza-val-dorcia-panoramic-view.jpg',
    gallery: [
      {
        url: '/images/pienza/pienza-val-dorcia-panoramic-view.jpg',
        caption: 'Pienza & Val d’Orcia UNESCO panoramic viewpoint overlooking the classic rolling hills',
      },
      {
        url: '/images/pienza/pienza-val-dorcia-rolling-hills.jpg',
        caption: 'Iconic undulating hills and cypress groves of the Val d’Orcia UNESCO world heritage valley',
      },
      {
        url: '/images/pienza/pienza-renaissance-streets.jpg',
        caption: 'Pienza historic center: flower-lined Renaissance stone lanes leading towards Piazza Pio II',
      },
      {
        url: '/images/pienza/pienza-cappella-vitaleta.jpg',
        caption: 'Cappella della Madonna di Vitaleta: iconic hilltop chapel framed by Tuscan cypress trees',
      },
      {
        url: '/images/pienza/pienza-val-dorcia-cypress-roads.jpg',
        caption: 'Scenic country trails and winding cypress-lined roads connecting Pienza with the valley floor',
      },
    ],
  },
  {
    id: 'montepulciano-vino-nobile',
    title: 'Montepulciano Hilltop & San Biagio Temple',
    subtitle: 'Monumental Renaissance architecture & historic underground wine cellars',
    category: 'sightseeing',
    lat: 43.0907791,
    lng: 11.7745647,
    distanceKm: 23.8,
    drivingTimeMin: 29,
    hikingTimeMin: 60,
    trailDifficulty: 'Moderate',
    elevationGainM: 180,
    bestTimeToVisit: 'Afternoon for cellar tours followed by golden hour aperitivo at Piazza Grande',
    description:
      'Perched high on a limestone ridge, Montepulciano is internationally renowned for Vino Nobile di Montepulciano. Stroll the grand Corso lined with Renaissance palazzi down to the breathtaking solitary travertine Temple of San Biagio.',
    highlights: [
      'Temple of San Biagio: Antonio da Sangallo’s Renaissance greek-cross masterpiece',
      'Underground "cathedral" wine cellars (Cantina De’ Ricci, Contucci, Talosa)',
      'Piazza Grande and Palazzo Comunale tower climb',
      'Scenic cypress-lined downhill walk to the Temple of San Biagio',
      'Artisanal copper, leather, and cantucci biscotti boutiques',
    ],
    practicalTips: [
      'Montepulciano is steep! Wear comfortable walking shoes.',
      'Park at Parking Lot 1 (P1 Piazza Don Minzoni) or P6 right beside San Biagio Temple.',
    ],
    photoUrl: '/images/montepulciano/montepulciano-san-biagio-temple.jpg',
    googleMapsUrl:
      'https://www.google.com/maps/place/Sanctuary+of+the+Madonna+di+San+Biagio/@43.0907791,11.7745647,17z/data=!4m6!3m5!1s0x13295c3e1baa8c1f:0xdde4a80f20a14ff8!8m2!3d43.0907791!4d11.7745647!16s%2Fm%2F0gtxm35',
    gallery: [
      {
        url: '/images/montepulciano/montepulciano-san-biagio-temple.jpg',
        caption: 'Sanctuary of the Madonna di San Biagio: 16th-century Renaissance travertine temple designed by Antonio da Sangallo the Elder',
      },
      {
        url: '/images/montepulciano/montepulciano-piazza-grande.jpg',
        caption: 'Piazza Grande: monumental heart of Montepulciano with the Palazzo Comunale and historic clock tower',
      },
      {
        url: '/images/montepulciano/montepulciano-cantina-cellars.jpg',
        caption: 'Underground monumental wine cellars aging Vino Nobile di Montepulciano in giant oak casks',
      },
      {
        url: '/images/montepulciano/montepulciano-panoramic-hillside.jpg',
        caption: 'Panoramic view of Montepulciano hilltop surrounded by Sangiovese vineyards and olive groves',
      },
      {
        url: '/images/montepulciano/montepulciano-corso-renaissance.jpg',
        caption: 'Il Corso: historic main street lined with Renaissance palaces, artisan wine shops, and Tuscan bottegas',
      },
    ],
  },
  {
    id: 'monte-amiata-summit',
    title: 'Monte Amiata Volcano Summit Trek (1,738m)',
    subtitle: 'Southern Tuscany’s highest peak & ancient beech forest trails',
    category: 'trekking',
    isPrimaryPick: true,
    lat: 42.88769,
    lng: 11.6239051,
    distanceKm: 32.4,
    drivingTimeMin: 43,
    hikingTimeMin: 150,
    trailDifficulty: 'Moderate',
    elevationGainM: 380,
    bestTimeToVisit: 'Warm midday to escape valley heat in refreshing alpine shade; late June to October for snow-free trails',
    description:
      'An extinct ancient volcano dominating the skyline of southern Tuscany. Its slopes are blanketed by Europe’s largest monumental beech forest, leading up to the iconic 22-meter iron monumental summit cross. The whole mountain is laced with a waymarked trail network rebuilt by the Club Alpino Italiano (Siena section), and the classic outing starts from the meadow of Prato delle Macinaie: the summit ring Le Macinaie – Rifugio Cantore – Vetta Amiata – Contessa – Le Macinaie, roughly 7 km of beech woods and trachyte, is the shortest way onto the top. For hikers with a full day there is also a long circumnavigation loop of about 32 km that stays between 800 and 1,300 m and rings the mountain through forest, chestnut groves, and old villages. Trail overview, route notes, and the free CAI map: https://lemacinaie.it/en/mappa-trekking-amiata/',
    highlights: [
      'Panoramic summit cross with views from Gran Sasso to Corsica and Elba Island',
      'The ≈7 km summit ring from Prato delle Macinaie via Rifugio Cantore, the Vetta, and the Contessa junction',
      'Cool shaded hiking trails through towering ancient beech trees (Faggeta del Monte Amiata)',
      'A ≈32 km circumnavigation loop between 800–1,300 m for a full day of forest, chestnut groves, and hamlets',
      'Volcanic rock fields, boulder formations, and alpine rifugios',
      'Delicious mountain porcini mushrooms and roasted chestnut delicacies',
    ],
    practicalTips: [
      'Temperatures at the top are 8°C to 12°C cooler than the valleys; take layers.',
      'You can drive up to Rifugio Cantore (1400m) or Vetta Amiata (1650m) and hike the remaining loop.',
      'Park at Prato delle Macinaie (≈1,385 m) for the classic summit ring — it is the busiest trailhead and the easiest to find.',
      'The CAI Siena trail map for the whole massif is described (and given free to guests) at lemacinaie.it — worth a look before you go: https://lemacinaie.it/en/mappa-trekking-amiata/',
      'Trails run easy to technically demanding; guided excursions and pre-loaded GPS tracks for the popular routes can be arranged locally.',
    ],
    photoUrl: '/images/monte-amiata/monte-amiata-summit-cross.jpg',
    googleMapsUrl:
      'https://www.google.com/maps/place/Mt+Amiata/@42.88769,11.6239051,16z/data=!4m6!3m5!1s0x13296b4602660249:0x7c964ebbc73f6bc9!8m2!3d42.88769!4d11.6239051!16s%2Fm%2F02w80hs',
    gallery: [
      {
        url: '/images/monte-amiata/monte-amiata-summit-cross.jpg',
        caption: 'Vetta Monte Amiata (1,738m): the monumental 22-meter iron cross overlooking southern Tuscany',
      },
      {
        url: '/images/monte-amiata/monte-amiata-beech-forest-trail.jpg',
        caption: 'Monumental beech forest (Faggeta): Europe’s largest beech woodland with cool shaded paths',
      },
      {
        url: '/images/monte-amiata/monte-amiata-volcanic-ridge.jpg',
        caption: 'Volcanic trachytic boulder fields and alpine ridge terrain along the summit trail',
      },
      {
        url: '/images/monte-amiata/monte-amiata-summit-horizon.jpg',
        caption: 'Sweeping 360-degree panoramic vista stretching towards Val d’Orcia, Lake Bolsena, and the Tyrrhenian coast',
      },
      {
        url: '/images/monte-amiata/monte-amiata-faggeta-canopy.jpg',
        caption: 'Towering ancient beech tree canopy filtering sunlight along the mountain switchbacks',
      },
    ],
  },
  {
    id: 'via-ferrata-tordini-galligani',
    title: 'Via Ferrata Tordini-Galligani & Pizzo d’Uccello North Face',
    subtitle: 'Historic cabled marble route to Foce Siggioli beneath the “Apuan Matterhorn”',
    category: 'ferrata',
    isPrimaryPick: true,
    lat: 44.1444005,
    lng: 10.1834521,
    distanceKm: 249.9,
    drivingTimeMin: 224,
    curatedDrivingTimeMin: 224,
    hikingTimeMin: 330,
    trailDifficulty: 'Challenging',
    elevationGainM: 680,
    bestTimeToVisit: 'Late May to early October; start at first light in summer. The face is north-facing and holds ice and verglas well into spring',
    description:
      'The wildest thing in this entire collection, and the one that needs the most respect — and at nearly four hours of driving each way, the one that really wants an overnight rather than a day trip. Tucked into the far northern Apuane above the hamlet of Ugliancaldo, the Tordini-Galligani hauls itself up steep white marble slabs and cabled ramps to the notch of Foce Siggioli at 1,386 m — and the reward at the top is one of the great mountain views in Italy: the sheer north face of Pizzo d’Uccello (1,781 m) rising straight out of the Valle di Vinca in a single 700-metre sweep of pale rock, the wall that earned the peak its nickname as the Matterhorn of the Apuane. The ferrata itself was rigged in 1971 and inaugurated on 25 April 1972, named for Brunello Tordini and Pierluigi Galligani, two CAI Pisa members who died in 1970. It grades out as medium — about 2 out of 5 technically — but the setting is serious: roughly 400 m of cabled development inside an 8 km round trip with 680 m of ascent, and around five and a half hours of movement all in (an hour and a half of approach, two hours on the cables, two hours of descent). From Foce Siggioli strong parties continue up the expert path to the summit of Pizzo d’Uccello; everyone else turns the day into a ring, traversing the Cresta di Capradossa and dropping back to Ugliancaldo on CAI trail 181.',
    highlights: [
      'The 700 m north face of Pizzo d’Uccello framed head-on from the Foce Siggioli notch — the finest rock wall in Tuscany',
      'Around 400 m of cable, staples, and ladder rungs across bright, water-polished Apuan marble',
      'A 1972 CAI-era line with the honest, sparse ironwork of its generation — no theme-park bridges here',
      'Ring finish along the airy Cresta di Capradossa on CAI 181 rather than a there-and-back',
      'Old Cantonaccio marble quarries and chestnut woods on the approach track above Ugliancaldo',
      'Optional continuation on the expert path to the 1,781 m summit of Pizzo d’Uccello',
    ],
    practicalTips: [
      'This needs real via ferrata gear: helmet, harness, and a proper energy-absorbing lanyard set. Nothing here is optional — the rock sheds loose marble plates and rockfall is the main objective danger.',
      'Park in Ugliancaldo (Casola in Lunigiana) and walk the unpaved road towards the Cantonaccio quarries — roughly 45 minutes extra each way, but it spares the car and the approach signage is poor enough that the track is the safest line.',
      'Descend the Cresta di Capradossa on CAI 181. CAI 192 has been left in bad shape by a landslide and fallen timber — do not use it as a shortcut.',
      'It is a long way from base: Google Maps puts it at about 3 hours 40 minutes each way via the A1 and A11, so this is a pre-dawn departure or, far better, an overnight in Lunigiana or Garfagnana.',
      'The face is in shade for much of the day, which keeps it cool in August but also means late-lying ice and wet rock in spring and after rain — skip it on a damp day.',
      'No water on the route and no refuge at the top; carry everything, and check Apuane weather carefully, since afternoon storms build fast on these ridges.',
    ],
    photoUrl: '/images/via-ferrata-tordini-galligani/pizzo-uccello-north-face-from-foce-siggioli.jpg',
    googleMapsUrl:
      'https://www.google.com/maps/place/Via+Ferrata+Tordini-Galligani/@44.1444005,10.1834521,15z/data=!4m6!3m5!1s0x12d513b7a02e270d:0x268abbf31808a0bf!8m2!3d44.1444005!4d10.1834521!16s%2Fg%2F11g4byjbrg',
    gallery: [
      {
        url: '/images/via-ferrata-tordini-galligani/pizzo-uccello-north-face-from-foce-siggioli.jpg',
        caption: 'The north face of Pizzo d’Uccello seen from the top of the route — a single sweep of pale marble above the Valle di Vinca',
      },
      {
        url: '/images/via-ferrata-tordini-galligani/via-ferrata-tordini-galligani-cabled-marble-ridge.jpg',
        caption: 'Steel cable running up the polished white marble crest of the ferrata, with scrub clinging to the slabs',
      },
      {
        url: '/images/via-ferrata-tordini-galligani/via-ferrata-tordini-galligani-climber-on-cables.jpg',
        caption: 'A helmeted climber clipped to the cables on one of the steeper rung sections',
      },
      {
        url: '/images/via-ferrata-tordini-galligani/via-ferrata-tordini-galligani-approach-slabs.jpg',
        caption: 'Looking up the approach slabs towards the jagged skyline of the Foce Siggioli notch',
      },
    ],
  },
  {
    id: 'sarteano-castle-and-borgo',
    title: 'Sarteano Castle & Etruscan Tomb of the Infernal Chariot',
    subtitle: '15th-century fortress, moat & ancient mystery right beside our base',
    category: 'sightseeing',
    lat: 42.9908287,
    lng: 11.8667683,
    distanceKm: 6.2,
    drivingTimeMin: 9,
    hikingTimeMin: 40,
    trailDifficulty: 'Easy',
    elevationGainM: 50,
    bestTimeToVisit: 'Morning or early evening; great spot for daily espresso & bakery',
    description:
      'Located just a 9-minute drive from our living base, Sarteano is an authentic, untouristy medieval jewel crowned by an imposing travertine fortress with a deep rock-cut moat.',
    highlights: [
      'Climb the multi-level Sarteano Castle keep and walk the battlements',
      'Civic Archaeological Museum & the famous 4th-century BC Etruscan tomb paintings',
      'Vibrant local market, butchers, and authentic family-run trattorias',
      'Thermal mineral swimming pools at Parco delle Piscine',
    ],
    practicalTips: [
      'Nearest hub for groceries (Coop supermarket), pharmacies, and Italian espresso bars.',
      'Castle interior visits usually operate on weekend & seasonal timetables.',
    ],
    photoUrl: '/images/sarteano/sarteano-castle-aerial-view.jpg',
    googleMapsUrl: 'https://www.google.com/maps/place/Sarteano+Castle/@42.9908287,11.8667683,17z/data=!4m6!3m5!1s0x132945729dbeecf9:0x243c0ab8987545f5!8m2!3d42.9908287!4d11.8667683!16s%2Fg%2F12605_q7s',
    gallery: [
      {
        url: '/images/sarteano/sarteano-castle-aerial-view.jpg',
        caption: 'Sarteano Castle: 15th-century travertine fortress and central keep perched atop the medieval borgo',
      },
      {
        url: '/images/sarteano/sarteano-castle-keep-front.jpg',
        caption: 'The imposing 4-story stone keep (mastio) and surrounding centuries-old holm oak park',
      },
      {
        url: '/images/sarteano/sarteano-castle-battlements-towers.jpg',
        caption: 'Circular defense towers and perimeter battlements offering vistas over Val d’Orcia and Val di Chiana',
      },
      {
        url: '/images/sarteano/sarteano-castle-drawbridge-entrance.jpg',
        caption: 'Battlemented curtain wall and the arched entry gate on the approach to the inner courtyard',
      },
      {
        url: '/images/sarteano/sarteano-castle-rock-cut-moat.jpg',
        caption: 'The view from the castle walls across Sarteano’s tiled rooftops toward Monte Cetona',
      },
      {
        url: '/images/sarteano/sarteano-porta-umbra-gate.jpg',
        caption: 'Porta Umbra: historic stone gate leading into the winding medieval streets of Sarteano',
      },
    ],
  },
  {
    id: 'cetona-monte-cetona',
    title: 'Cetona & Monte Cetona Prehistoric Caves Hike',
    subtitle: 'Prehistoric Belverde caves, Bronze Age archeodrome & mountain trails',
    category: 'trekking',
    lat: 42.9506215,
    lng: 11.8918154,
    distanceKm: 8.2,
    drivingTimeMin: 13,
    hikingTimeMin: 80,
    trailDifficulty: 'Moderate',
    elevationGainM: 260,
    bestTimeToVisit: 'Morning hike through Belverde prehistoric forest followed by lunch in Piazza Garibaldi',
    description:
      'Voted one of the most beautiful villages in Italy (I Borghi più Belli d’Italia). Nestled on the eastern slopes of Monte Cetona, the Belverde Archaeological Park preserves 18 prehistoric caves inhabited by Neanderthals 50,000 years ago and Bronze Age communities.',
    highlights: [
      'Grotte di Belverde: travertine caverns and rock shelters used for prehistoric worship & dwelling',
      'Archeodromo di Belverde: life-sized reconstructed Bronze Age village huts and artisan areas',
      'Piazza Garibaldi: elegant Renaissance oval square in Cetona borgo lined with cafés',
      'Panoramic hiking trails weaving through the oak and cypress slopes of Monte Cetona (1,148m)',
    ],
    practicalTips: [
      'The Prehistoric Caves & Archeodrome have dedicated parking at Belverde (Strada Provinciale della Montagna).',
      'CAI trail paths link the caves directly upward toward the panoramic summit of Monte Cetona.',
    ],
    photoUrl: '/images/monte-cetona/cave-stone.jpg',
    googleMapsUrl: 'https://www.google.com/maps/place/Prehistoric+Caves/@42.9506215,11.8918154,16z/data=!4m6!3m5!1s0x13294f59d6836fcd:0xe2bb93199bec20cb!8m2!3d42.9506215!4d11.8918154!16s%2Fg%2F1262s776x',
    gallery: [
      {
        url: '/images/monte-cetona/cave-stone.jpg',
        caption: 'Eremo di Santa Maria in Belverde: the stone hermitage set among cypresses beside the prehistoric cave complex',
      },
      {
        url: '/images/monte-cetona/cave-interior.jpg',
        caption: 'The southern crest of Monte Cetona rising above the travertine terraces that hold the Belverde shelters',
      },
      {
        url: '/images/monte-cetona/cave-gorge.jpg',
        caption: 'Monte Cetona seen across the Val di Chiana, its wooded flanks concealing the Belverde rock shelters',
      },
      {
        url: '/images/monte-cetona/slide-parco.jpg',
        caption: 'The wooded eastern slopes of Monte Cetona, where the Belverde park trails climb away from the caves',
      },
      {
        url: '/images/monte-cetona/monte-cetona-summit-view.jpg',
        caption: 'Summit vista of Monte Cetona (1,148m) overlooking Val d’Orcia and Val di Chiana',
      },
      {
        url: '/images/monte-cetona/cetona-historic-village-stone-streets.jpg',
        caption: 'Cetona’s medieval Rivellino tower standing guard over the lanes of the old borgo',
      },
      {
        url: '/images/monte-cetona/cetona-medieval-piazza-garibaldi.jpg',
        caption: 'Piazza Garibaldi: expansive Renaissance square at the foot of Cetona',
      },
      {
        url: '/images/monte-cetona/monte-cetona-olive-slopes.jpg',
        caption: 'The south-western flank of Monte Cetona (1,148m) above its olive terraces and oak woods',
      },
    ],
  },
  {
    id: 'gran-sasso-corno-grande',
    title: 'Gran Sasso d’Italia — Corno Grande & Campo Imperatore',
    subtitle: 'The 2,912m roof of the Apennines, Europe’s southernmost glacier & the “Little Tibet” plateau',
    category: 'trekking',
    isPrimaryPick: true,
    lat: 42.4730557,
    lng: 13.5707703,
    distanceKm: 253,
    drivingTimeMin: 200,
    curatedDrivingTimeMin: 200,
    hikingTimeMin: 360,
    trailDifficulty: 'Challenging',
    elevationGainM: 800,
    bestTimeToVisit: 'Mid-July to mid-September, starting at first light — the summit ridge must be cleared before the early-afternoon thunderstorms that build over the plateau almost daily in summer',
    description:
      'The single biggest mountain day reachable from the base: a long drive east into Abruzzo for Corno Grande (2,912m), the highest summit of the entire Apennine chain and the only place in peninsular Italy that feels genuinely alpine. The cable car lifts you from Fonte Cerreto to Campo Imperatore at 2,130m — a vast, treeless karst plateau nicknamed “Little Tibet”, grazed by semi-wild horses and ringed by limestone walls — and from the top station the Via Normale climbs the Corno Grande in roughly three hours of walking that turns into hands-on scrambling over the final rocky ridge. Tucked in the north-facing cirque below the summit lies the Calderone, the southernmost glacier in Europe, now shrunk to a debris-covered ice patch. This is a full day at minimum and works far better as an overnight: it is close to three hours of motorway each way from Tuscany.',
    highlights: [
      'Corno Grande Vetta Occidentale (2,912m): the highest point in the Apennines, with a summit panorama that on clear mornings reaches both the Adriatic and the Tyrrhenian side of the peninsula',
      'Campo Imperatore: a 27km-long high plateau of bare grassland at 2,130m, grazed by free-roaming horses and cattle, and used as a stand-in for Tibet and the Wild West by generations of film crews',
      'The Calderone glacier, the southernmost surviving glacial body in Europe, visible from the Via Normale as it traverses beneath the summit walls',
      'The cable car ride itself — roughly 1,000 vertical metres from Fonte Cerreto to the plateau in a few minutes, turning an all-day approach into a morning start',
      'Rifugio Duca degli Abruzzi (2,388m) on the ridge above the top station: an easy, non-technical alternative walk with the same views for anyone skipping the summit',
      'The 1930s Hotel Campo Imperatore and the domed Astronomical Observatory standing alone on the plateau beside the top station',
    ],
    practicalTips: [
      'This is not a Val d’Orcia day trip. Reckon on about 3 to 3.5 hours of driving each way (A1 to the Valdichiana or Orte junction, then the A24 across the Apennines to the Assergi exit); leaving before 5 AM or sleeping over in L’Aquila, Assergi or at the plateau itself is the difference between a good day and a miserable one.',
      'Park at Fonte Cerreto (1,120m) and take the Funivia del Gran Sasso up to the Arrivo a monte station — marked as a waypoint below. Check the operator’s current timetable and, critically, the last descent of the day before you commit to the summit; the road up to Campo Imperatore is also drivable if the lift is closed.',
      'The Via Normale is an EE (expert hiker) route, not a footpath: the upper section is loose rock and exposed scrambling where a slip has consequences. Boots with real grip, a helmet against rockfall from parties above, and a head for heights are the minimum.',
      'Weather on this massif turns violently and fast. Summer afternoon thunderstorms over Campo Imperatore are the norm rather than the exception, and the plateau offers no shelter — be off the ridge by early afternoon.',
      'Snow lingers in the couloirs into early summer and returns in autumn; outside roughly July to September the Via Normale becomes a mountaineering route needing axe and crampons.',
      'Carry all your water. There are no springs on the ascent, and the bar at the top station is the last reliable supply.',
      'Mobile signal is patchy in the cirques below the summit — download the map offline and leave your intended route with someone before starting.',
    ],
    googleMapsUrl:
      'https://www.google.com/maps/place/Gran+Sasso+d’Italia/@42.4730557,13.5707703,16z/data=!4m6!3m5!1s0x1331d5ce065bedf7:0x97301345f28ca922!8m2!3d42.4730557!4d13.5707703!16s%2Fg%2F11vdnb2p80',
    photoUrl: '/images/gran-sasso/corno-grande-summit-limestone-pyramid.jpg',
    gallery: [
      {
        url: '/images/gran-sasso/corno-grande-summit-limestone-pyramid.jpg',
        caption: 'Corno Grande rising in bare limestone above the grass slopes of Campo Imperatore, old snow still lodged in its gullies in late summer',
      },
      {
        url: '/images/gran-sasso/campo-imperatore-plateau-road-to-corno-grande.jpg',
        caption: 'The plateau road running dead straight across Campo Imperatore towards the Gran Sasso wall — the emptiness that earned it the “Little Tibet” nickname',
      },
      {
        url: '/images/gran-sasso/funivia-gran-sasso-cabin-on-pylon.jpg',
        caption: 'A funivia cabin on its lattice pylon during the 1,000m ascent from Fonte Cerreto, the wooded valley dropping away beneath',
      },
      {
        url: '/images/gran-sasso/funivia-gran-sasso-top-station-bullwheel-hall.jpg',
        caption: 'Inside the cable car machine hall: the haul bullwheel and cable gear framed by the station’s window over the valley',
      },
      {
        url: '/images/gran-sasso/campo-imperatore-astronomical-observatory-domes.jpg',
        caption: 'The domes of the Campo Imperatore astronomical observatory beside the top station, with walkers heading off across the plateau',
      },
      {
        url: '/images/gran-sasso/gran-sasso-limestone-walls-above-grassland.jpg',
        caption: 'Grey limestone walls and scree cirques of the massif towering over the smooth grassland of the high plateau',
      },
    ],
    waypoints: [
      {
        name: 'Funivia del Gran Sasso (Arrivo a monte)',
        lat: 42.4427489,
        lng: 13.5576741,
        icon: '🚠',
        note: 'Cable car top station on Campo Imperatore at roughly 2,130m — the arrival point from Fonte Cerreto and the start of the Via Normale to Corno Grande, with the hotel, observatory and the last bar before the climb.',
        googleMapsUrl:
          'https://www.google.com/maps/place/Funivia+del+Gran+Sasso+(Arrivo+a+monte)/@42.4427489,13.5576741,16z/data=!4m7!3m6!1s0x1331d560501d3cbb:0x928f0fdcc0d6fb02!8m2!3d42.4427489!4d13.5576741!16s%2Fg%2F11hdxcqbrt',
      },
    ],
  },
  {
    id: 'montalcino-sant-antimo',
    title: 'Montalcino Fortress & Abbey of Sant’Antimo',
    subtitle: 'Brunello wine capital & Romanesque abbey with cypress groves',
    category: 'sightseeing',
    lat: 43.0560413,
    lng: 11.489661,
    distanceKm: 44.5,
    drivingTimeMin: 49,
    hikingTimeMin: 45,
    trailDifficulty: 'Easy',
    elevationGainM: 70,
    bestTimeToVisit: 'Early afternoon for wine cellars, then 4 PM for monastic harmony at the abbey',
    description:
      'The spiritual home of Brunello di Montalcino, one of the world’s most prestigious red wines. A short drive further down the valley leads to the 12th-century Abbey of Sant’Antimo nestled amidst ancient olive trees.',
    highlights: [
      '14th-century Montalcino Fortress and enoteca wine tastings on the ramparts',
      'The Abbey of Sant’Antimo, built from alabaster and travertine',
      'Peaceful walking paths through centuries-old olive orchards',
      'Panoramic ridge roads offering signature Tuscan postcards',
    ],
    practicalTips: [
      'Plan about 50 mins driving through scenic winding hill roads.',
      'Visiting the abbey grounds is free; modest dress (covered shoulders/knees) requested inside.',
    ],
    photoUrl: '/images/montalcino/montalcino-fortress-aerial-view.jpg',
    googleMapsUrl:
      'https://www.google.com/maps/place/Fortezza+di+Montalcino/@43.0560413,11.489661,17z/data=!4m6!3m5!1s0x1329710059bb97c3:0x8f49f14f77e9c46c!8m2!3d43.0560413!4d11.489661!16s%2Fg%2F11yhrj06r9',
    gallery: [
      {
        url: '/images/montalcino/montalcino-fortress-aerial-view.jpg',
        caption: 'Fortezza di Montalcino: 14th-century pentagonal fortress and ramparts overlooking the Brunello vineyards',
      },
      {
        url: '/images/montalcino/sant-antimo-abbey-cypress.jpg',
        caption: 'Abbey of Sant’Antimo: Romanesque alabaster and travertine abbey nestled in the star valley of Castelnuovo dell’Abate',
      },
      {
        url: '/images/montalcino/montalcino-brunello-cellars.jpg',
        caption: 'Historic oak botte barrels aging the world-renowned Brunello di Montalcino DOCG wine',
      },
      {
        url: '/images/montalcino/montalcino-historic-lanes.jpg',
        caption: 'Montalcino medieval stone streets, enotecas, wine tasting cellars, and craft shops',
      },
      {
        url: '/images/montalcino/montalcino-vineyard-slopes.jpg',
        caption: 'Sloping Sangiovese Grosso vineyards and panoramic Tuscan valleys surrounding Montalcino',
      },
    ],
  },
];
