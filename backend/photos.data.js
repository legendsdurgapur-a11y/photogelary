const initialPhotos = [
  {
    id: "photo-1",
    title: "Celestial Solitude over Mount Fitz Roy",
    category: "Landscape",
    photographer: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      handle: "@elena_lens",
      location: "Patagonia, Argentina"
    },
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
    orientation: "landscape",
    aspectRatio: "16/10",
    description: "First light striking the jagged granite peaks of Mount Fitz Roy with perfect glass reflection on Laguna de los Tres.",
    featured: true,
    likes: 1248,
    views: 8930,
    isLiked: false,
    date: "2024-04-12",
    tags: ["Patagonia", "Mountains", "Alpine", "Sunrise", "Reflection", "Glacier"],
    exif: {
      camera: "Sony Alpha 7R V",
      lens: "FE 16-35mm f/2.8 GM II",
      focalLength: "21mm",
      aperture: "f/8.0",
      shutterSpeed: "1/4s",
      iso: "100",
      dimensions: "9504 × 6336"
    },
    comments: [
      { id: "c1", user: "Marcus Vance", text: "The reflection clarity is otherworldly!", time: "2 hours ago" },
      { id: "c2", user: "Sarah Jenkins", text: "Incredible dynamic range across the peaks.", time: "1 day ago" }
    ]
  },
  {
    id: "photo-2",
    title: "Gilded Gaze in Venetian Shadow",
    category: "Portrait",
    photographer: {
      name: "Mateo Rossi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      handle: "@mateo_noir",
      location: "Venice, Italy"
    },
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    orientation: "portrait",
    aspectRatio: "4/5",
    description: "Natural golden hour rim lighting capturing subtle emotional warmth in historic San Marco archways.",
    featured: true,
    likes: 982,
    views: 6420,
    isLiked: false,
    date: "2024-05-18",
    tags: ["Portrait", "Venice", "Golden Hour", "Natural Light", "Editorial"],
    exif: {
      camera: "Leica M11-P",
      lens: "Summilux-M 50mm f/1.4 ASPH",
      focalLength: "50mm",
      aperture: "f/1.4",
      shutterSpeed: "1/1000s",
      iso: "64",
      dimensions: "9528 × 6328"
    },
    comments: [
      { id: "c3", user: "Chiara Moretti", text: "Pure poetic framing.", time: "4 hours ago" }
    ]
  },
  {
    id: "photo-3",
    title: "Tokyo Cyber Rain & Neon Trails",
    category: "Street",
    photographer: {
      name: "Kenji Sato",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      handle: "@kenji_street",
      location: "Tokyo, Japan"
    },
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80",
    orientation: "portrait",
    aspectRatio: "3/4",
    description: "Drenched Shinjuku alleyways echoing with glowing kanji neons and umbrella reflections during a summer monsoon.",
    featured: true,
    likes: 1840,
    views: 14200,
    isLiked: false,
    date: "2024-06-03",
    tags: ["Tokyo", "Cyberpunk", "Neon", "Rain", "Street", "Night"],
    exif: {
      camera: "Fujifilm GFX 100 II",
      lens: "GF 45mm f/2.8 R WR",
      focalLength: "45mm",
      aperture: "f/2.8",
      shutterSpeed: "1/125s",
      iso: "800",
      dimensions: "11648 × 8736"
    },
    comments: [
      { id: "c4", user: "Tetsuya", text: "Blade Runner vibes in real life!", time: "1 hour ago" }
    ]
  },
  {
    id: "photo-4",
    title: "The Spiral of Modernity",
    category: "Architecture",
    photographer: {
      name: "Astrid Lindholm",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      handle: "@astrid_arch",
      location: "Copenhagen, Denmark"
    },
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
    orientation: "square",
    aspectRatio: "1/1",
    description: "Geometric harmony and monochromatic rhythm looking upward through a contemporary helical museum atrium.",
    featured: false,
    likes: 673,
    views: 4310,
    isLiked: false,
    date: "2024-03-29",
    tags: ["Architecture", "Minimalism", "Spiral", "BlackAndWhite", "Geometry"],
    exif: {
      camera: "Canon EOS R5",
      lens: "RF 15-35mm f/2.8 L IS USM",
      focalLength: "15mm",
      aperture: "f/11",
      shutterSpeed: "1/2s",
      iso: "100",
      dimensions: "8192 × 5464"
    },
    comments: []
  },
  {
    id: "photo-5",
    title: "Serengeti Apex at Sunset",
    category: "Wildlife",
    photographer: {
      name: "Kofi Mensah",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      handle: "@kofi_wild",
      location: "Serengeti, Tanzania"
    },
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop&q=80",
    orientation: "landscape",
    aspectRatio: "16/9",
    description: "Solitary lioness perched atop an ancient granite kopje, observing migratory herds against the ember glow of the African twilight.",
    featured: true,
    likes: 2190,
    views: 18450,
    isLiked: false,
    date: "2024-02-14",
    tags: ["Wildlife", "Africa", "Lion", "Sunset", "Safari", "Nature"],
    exif: {
      camera: "Nikon Z9",
      lens: "NIKKOR Z 400mm f/2.8 TC VR S",
      focalLength: "400mm",
      aperture: "f/2.8",
      shutterSpeed: "1/1600s",
      iso: "400",
      dimensions: "8256 × 5504"
    },
    comments: [
      { id: "c5", user: "David Attenborough Fan", text: "Magnificent majesty.", time: "3 days ago" }
    ]
  },
  {
    id: "photo-6",
    title: "Milky Way Arch above Atacama Salt Flats",
    category: "Astrophotography",
    photographer: {
      name: "Dr. Carlos Mendez",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
      handle: "@carlos_deepsky",
      location: "Atacama Desert, Chile"
    },
    imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80",
    orientation: "landscape",
    aspectRatio: "16/10",
    description: "Tracked panoramic stitch of the galactic core and zodiacal light illuminating hexagonal salt crust formations 4000 meters above sea level.",
    featured: true,
    likes: 3120,
    views: 22100,
    isLiked: false,
    date: "2024-05-30",
    tags: ["Space", "MilkyWay", "Atacama", "NightSky", "Stars", "Cosmos"],
    exif: {
      camera: "Sony Alpha 1",
      lens: "Sony FE 14mm f/1.8 GM",
      focalLength: "14mm",
      aperture: "f/1.8",
      shutterSpeed: "25s",
      iso: "3200",
      dimensions: "8640 × 5760"
    },
    comments: [
      { id: "c6", user: "Astrophile", text: "The zodiacal dust lane is rendered with such perfection!", time: "5 hours ago" }
    ]
  },
  {
    id: "photo-7",
    title: "Elysian Bloom & Silk Drape",
    category: "Cinematic",
    photographer: {
      name: "Chloe Dupont",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      handle: "@chloe_cinema",
      location: "Paris, France"
    },
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
    orientation: "portrait",
    aspectRatio: "4/5",
    description: "Couture haute-fashion piece exploring surreal botanical motifs and high-speed motion fabric blur.",
    featured: false,
    likes: 840,
    views: 5200,
    isLiked: false,
    date: "2024-06-15",
    tags: ["Fashion", "Cinematic", "Paris", "Editorial", "ColorGrade"],
    exif: {
      camera: "Hasselblad H6D-100c",
      lens: "HC 100mm f/2.2",
      focalLength: "100mm",
      aperture: "f/2.8",
      shutterSpeed: "1/500s",
      iso: "100",
      dimensions: "11600 × 8700"
    },
    comments: []
  },
  {
    id: "photo-8",
    title: "Fractured Glacial Veins from Above",
    category: "Drone",
    photographer: {
      name: "Bjorn Sigurdsson",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      handle: "@bjorn_aerial",
      location: "Vatnajökull, Iceland"
    },
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80",
    orientation: "landscape",
    aspectRatio: "16/9",
    description: "Orthogonal top-down view of glacial meltwater carving deep turquoise river channels across volcanic black sand plains.",
    featured: true,
    likes: 1450,
    views: 11300,
    isLiked: false,
    date: "2024-07-01",
    tags: ["Drone", "Iceland", "Aerial", "Glacier", "Abstract", "Geology"],
    exif: {
      camera: "DJI Inspire 3 (Zenmuse X9-8K)",
      lens: "DL 24mm F2.8 LS ASPH",
      focalLength: "24mm",
      aperture: "f/5.6",
      shutterSpeed: "1/800s",
      iso: "200",
      dimensions: "8192 × 4320"
    },
    comments: [
      { id: "c7", user: "AeroVision", text: "Abstract earth art at its finest.", time: "1 day ago" }
    ]
  },
  {
    id: "photo-9",
    title: "Whispering Redwoods in Morning Mist",
    category: "Landscape",
    photographer: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      handle: "@elena_lens",
      location: "Northern California, USA"
    },
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80",
    orientation: "portrait",
    aspectRatio: "3/4",
    description: "Cathedral-like crepuscular god rays slicing through ancient coastal fog amongst giant sequoia redwoods.",
    featured: false,
    likes: 915,
    views: 7420,
    isLiked: false,
    date: "2024-06-20",
    tags: ["Forest", "Redwood", "Fog", "LightBeams", "Landscape"],
    exif: {
      camera: "Sony Alpha 7R V",
      lens: "FE 24-70mm f/2.8 GM II",
      focalLength: "35mm",
      aperture: "f/7.1",
      shutterSpeed: "1/60s",
      iso: "200",
      dimensions: "9504 × 6336"
    },
    comments: []
  },
  {
    id: "photo-10",
    title: "Shadows in the Medina of Fes",
    category: "Street",
    photographer: {
      name: "Kenji Sato",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      handle: "@kenji_street",
      location: "Fes, Morocco"
    },
    imageUrl: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&auto=format&fit=crop&q=80",
    orientation: "portrait",
    aspectRatio: "4/5",
    description: "Slatted wooden canopies cast sharp parallel striped shadows across ancient sandstone alleyways.",
    featured: false,
    likes: 720,
    views: 5100,
    isLiked: false,
    date: "2024-05-10",
    tags: ["Morocco", "Street", "Shadows", "Architecture", "Travel"],
    exif: {
      camera: "Leica Q3",
      lens: "Summilux 28mm f/1.7 ASPH",
      focalLength: "28mm",
      aperture: "f/4.0",
      shutterSpeed: "1/500s",
      iso: "125",
      dimensions: "9520 × 6336"
    },
    comments: []
  },
  {
    id: "photo-11",
    title: "Nebula Veil: The Orion Crucible",
    category: "Astrophotography",
    photographer: {
      name: "Dr. Carlos Mendez",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
      handle: "@carlos_deepsky",
      location: "Mauna Kea, Hawaii"
    },
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    orientation: "landscape",
    aspectRatio: "16/9",
    description: "Deep exposure narrowband composition of hydrogen-alpha and ionized oxygen gas filaments glowing 1,344 light years away.",
    featured: false,
    likes: 1530,
    views: 12900,
    isLiked: false,
    date: "2024-01-25",
    tags: ["Nebula", "Space", "DeepSky", "Telescope", "Stars"],
    exif: {
      camera: "ZWO ASI6200MM Pro Mono",
      lens: "Takahashi FSQ-106EDX IV",
      focalLength: "530mm",
      aperture: "f/5.0",
      shutterSpeed: "120s x 40 subs",
      iso: "Gain 100",
      dimensions: "9576 × 6388"
    },
    comments: []
  },
  {
    id: "photo-12",
    title: "Emerald Waves of Lofoten Fjords",
    category: "Landscape",
    photographer: {
      name: "Astrid Lindholm",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      handle: "@astrid_arch",
      location: "Lofoten Islands, Norway"
    },
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80",
    orientation: "landscape",
    aspectRatio: "16/10",
    description: "Dramatic arctic archipelago shoreline where razor sharp mountains crash directly into crystal turquoise waters.",
    featured: true,
    likes: 1980,
    views: 16800,
    isLiked: false,
    date: "2024-04-05",
    tags: ["Norway", "Lofoten", "Fjords", "Arctic", "Coast", "Wilderness"],
    exif: {
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8 L IS USM",
      focalLength: "28mm",
      aperture: "f/8",
      shutterSpeed: "1/200s",
      iso: "100",
      dimensions: "8192 × 5464"
    },
    comments: []
  }
];

const albums = [
  {
    id: "album-1",
    title: "Nordic Whispers & Glacial Fjords",
    subtitle: "A journey through untouched Arctic wilderness and frozen serenity",
    coverImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80",
    category: "Landscape",
    photoCount: 18,
    curator: "Astrid Lindholm",
    year: "2024"
  },
  {
    id: "album-2",
    title: "Cyberpunk Nights: Tokyo Unveiled",
    subtitle: "High-contrast neon alleyways, reflective puddles, and metropolitan souls",
    coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80",
    category: "Street",
    photoCount: 24,
    curator: "Kenji Sato",
    year: "2024"
  },
  {
    id: "album-3",
    title: "The Silent Cosmos",
    subtitle: "Astrophotography deep exposures from the highest plateaus on Earth",
    coverImage: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&auto=format&fit=crop&q=80",
    category: "Astrophotography",
    photoCount: 15,
    curator: "Dr. Carlos Mendez",
    year: "2024"
  },
  {
    id: "album-4",
    title: "Chroma & Haute Couture",
    subtitle: "Bold palettes and striking studio portraiture for modern editorials",
    coverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop&q=80",
    category: "Portrait",
    photoCount: 20,
    curator: "Chloe Dupont",
    year: "2024"
  }
];

const photographers = [
  {
    id: "p-1",
    name: "Elena Rostova",
    role: "Alpine & Landscape Master",
    bio: "National Geographic contributor specializing in remote mountain expeditions and sub-zero high dynamic range captures.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    location: "Bariloche, Argentina",
    awards: ["Sony World Photography Award 2023", "Outdoor Photographer of the Year"],
    stats: { photos: 142, awards: 8, exhibitions: 14 }
  },
  {
    id: "p-2",
    name: "Kenji Sato",
    role: "Urban & Street Storyteller",
    bio: "Documenting Tokyo's nocturnal evolution through rainy alleys, neon light trails, and candid metropolitan emotions.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    location: "Tokyo, Japan",
    awards: ["LensCulture Street Award 2023", "Tokyo Art Director Club Prize"],
    stats: { photos: 210, awards: 5, exhibitions: 22 }
  },
  {
    id: "p-3",
    name: "Dr. Carlos Mendez",
    role: "Astrophotographer & Astrophysicist",
    bio: "Combining deep astronomical science with state-of-the-art cooled sensors to reveal the hidden tapestry of the cosmos.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80",
    location: "Santiago, Chile",
    awards: ["Astronomy Photographer of the Year 2024 (Royal Observatory)", "APOD 12x Featured"],
    stats: { photos: 89, awards: 12, exhibitions: 9 }
  }
];

const testimonials = [
  {
    id: "t1",
    client: "Vogue Scandinavia",
    comment: "The precision in light and shadow composition transformed our cover editorial into pure visual poetry.",
    rating: 5,
    role: "Creative Director"
  },
  {
    id: "t2",
    client: "National Geographic Expeditions",
    comment: "Unrivaled dedication to capturing the raw, untamed spirit of Patagonia under the harshest weather conditions.",
    rating: 5,
    role: "Senior Photo Editor"
  },
  {
    id: "t3",
    client: "Architectural Digest",
    comment: "Every structural line and curvature is preserved with razor-sharp geometric precision and natural depth.",
    rating: 5,
    role: "Feature Editor"
  }
];

module.exports = {
  initialPhotos,
  albums,
  photographers,
  testimonials
};

