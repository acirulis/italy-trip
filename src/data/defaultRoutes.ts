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
      'Swimming is permitted in designated river pools; water is refreshingly cool year-round.',
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
