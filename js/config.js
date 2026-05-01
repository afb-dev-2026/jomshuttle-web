/* ============================================================
   FILE: js/config.js
   PURPOSE: Central configuration file. 
   SECURITY POSTURE: 
   - This file is PUBLIC. Do not store private API keys here.
   - The EmailJS Public Key is safe to expose ONLY IF domain 
     whitelisting is configured in the EmailJS dashboard.
   ============================================================ */

const CONFIG = {

  /* ----------------------------------------------------------
     BUSINESS DETAILS
  ---------------------------------------------------------- */
  business: {
    name:       "JomShuttle",
    tagline:    "Book now and let us drive you there!",
    subtagline: "Malaysia's Most Trusted Shuttle Service",
    phone:      "60136788869",          
    phoneDisplay: "+60 13-678 8869",    
    email:      "my.hnf.store@gmail.com",
    hours:      "24 hours/day · 7 days/week",
    country:    "Malaysia",
  },

  /* ----------------------------------------------------------
     SECURITY DEPLOYMENT CHECKLIST
     Before going live, ensure these are configured in EmailJS:
  ---------------------------------------------------------- */
  security: {
    domainWhitelisting: "MUST BE ENABLED IN EMAILJS DASHBOARD",
    rateLimiting: "MUST BE CONFIGURED IN EMAILJS DASHBOARD"
  },

  /* ----------------------------------------------------------
     EMAILJS SETTINGS
     These IDs are public identifiers. 
  ---------------------------------------------------------- */
  emailJS: {
    emailServiceID:  "YOUR_SERVICE_ID",    
    emailTemplateID: "YOUR_TEMPLATE_ID",   
    emailPublicKey:  "YOUR_PUBLIC_KEY",    
  },

  /* ----------------------------------------------------------
     NOTIFICATION EMAILS
  ---------------------------------------------------------- */
  notificationEmails: [
    "my.hnf.store@gmail.com",   
    "fahmie1997@yahoo.com",     
  ],

  /* ----------------------------------------------------------
     WHATSAPP NUMBERS
  ---------------------------------------------------------- */
  whatsapp: {
    primary: "60136788869",      
  },

  /* ----------------------------------------------------------
     HERO SECTION TEXT
  ---------------------------------------------------------- */
  hero: {
    badge:    "⭐ Malaysia's Most Trusted Shuttle Service",
    headline: "Book Now & Let Us",
    highlight:"Drive You There!",
    subtext:  "Comfortable, reliable & affordable shuttle service across Malaysia — airport transfers & interstate journeys. Just relax while we handle the driving. Available 24/7!",
    stats: [
      { num: "24/7",  label: "Available"  },
      { num: "13+",   label: "States"     },
      { num: "100%",  label: "Trusted"    },
    ],
  },

  /* ----------------------------------------------------------
     WHY CHOOSE US — FEATURES SECTION
  ---------------------------------------------------------- */
  features: [
    { icon:"👨‍✈️", title:"Experienced Drivers",    desc:"All our drivers are highly experienced & professional. You are in safe hands throughout your journey." },
    { icon:"🚐",   title:"Well-Maintained Fleet",  desc:"All vehicles are in good or excellent condition — regularly serviced for your safety & comfort." },
    { icon:"🕐",   title:"24/7 Available",          desc:"We operate 24 hours a day, 7 days a week — including public holidays. Book anytime!" },
    { icon:"💰",   title:"Affordable Rates",        desc:"Transparent, competitive pricing with no hidden charges. Great value for your money." },
    { icon:"📲",   title:"Easy WhatsApp Booking",   desc:"Simply click and book via WhatsApp — fast response from our dedicated sales team." },
    { icon:"🇲🇾",  title:"Nationwide Coverage",     desc:"We cover all major states across Peninsular Malaysia plus international destinations." },
  ],

  /* ----------------------------------------------------------
     HOW IT WORKS — STEPS SECTION
  ---------------------------------------------------------- */
  steps: [
    { num:"1", title:"Pick Destination",  desc:"Select your state or route from our full coverage list across Malaysia" },
    { num:"2", title:"Fill Booking Form", desc:"Enter your pickup point, date, time & number of passengers" },
    { num:"3", title:"Send via WhatsApp", desc:"Your details are sent to our team — we reply fast!" },
    { num:"4", title:"Sit Back & Enjoy!", desc:"Our experienced driver picks you up safely & on time. Relax!" },
  ],

  /* ----------------------------------------------------------
     DESTINATIONS LIST
  ---------------------------------------------------------- */
  destinations: [
    { icon:"🏙️", name:"Kuala Lumpur",    type:"Airport & City",  waKey:"KualaLumpur",    page:"kl"    },
    { icon:"🌆", name:"Selangor",         type:"Airport & City",  waKey:"Selangor",       page:null    },
    { icon:"🏔️", name:"Pahang",           type:"Interstate",      waKey:"Pahang",         page:null    },
    { icon:"🌳", name:"Negeri Sembilan",  type:"Interstate",      waKey:"NegeriSembilan", page:null    },
    { icon:"⛏️", name:"Perak",            type:"Interstate",      waKey:"Perak",          page:null    },
    { icon:"🏛️", name:"Melaka",           type:"Interstate",      waKey:"Melaka",         page:null    },
    { icon:"🌉", name:"Johor",            type:"Interstate",      waKey:"Johor",          page:null    },
    { icon:"🍜", name:"Penang",           type:"Interstate",      waKey:"Penang",         page:null    },
    { icon:"🌾", name:"Kedah",            type:"Interstate",      waKey:"Kedah",          page:null    },
    { icon:"🌿", name:"Perlis",           type:"Interstate",      waKey:"Perlis",         page:null    },
    { icon:"🎨", name:"Kelantan",         type:"Interstate",      waKey:"Kelantan",       page:null    },
    { icon:"🏖️", name:"Terengganu",       type:"Interstate",      waKey:"Terengganu",     page:null    },
  ],

  /* ----------------------------------------------------------
     AIRPORT TRANSFER ROUTES
  ---------------------------------------------------------- */
  airportRoutes: [
    {
      title:    "Large Van — KLIA/KLIA2 ↔ KL City",
      price:    "RM250",
      waKey:    "KLIA-KL-L-RM250",
      capacity: [
        "👥 7–13 pax (with luggage)",
        "👥 7–17 pax (no luggage)",
      ],
    },
    {
      title:    "Small Van — KLIA/KLIA2 ↔ KL City",
      price:    "RM200",
      waKey:    "KLIA-KL-S-RM200",
      capacity: [
        "👥 4–6 pax (with luggage)",
        "👥 4–10 pax (no luggage)",
      ],
    },
  ],

  /* ----------------------------------------------------------
     TOUR PACKAGES
  ---------------------------------------------------------- */
  tourPackages: [
    {
      id:         "hatyai",
      emoji:      "🇹🇭",
      badge:      "🔥 Hot Deal",
      badgeColor: "#FF6B00",
      title:      "Hatyai (Thailand) Tour",
      duration:   "4 Days 2 Nights",
      groupType:  "Sharing Group",
      extras:     ["🏨 Hotel Included", "🛡️ Tour Guide & Insurance"],
      desc:       "KL → Hatyai/Songkla → KL. Floating market, shopping malls, Songkhla sightseeing & more!",
      price:      "RM580",
      priceLabel: "per pax · Transport & Hotel",
      waKey:      "HatyaiSongkla",
      bgFrom:     "#003580",
      bgTo:       "#009FE3",
      detailPage: true,
      includes: [
        "🏨 Hotel Included",
        "🛡️ Tour Guide",
        "🔒 Insurance",
        "👥 Sharing Group",
      ],
      notes: "Jika perlukan tarikh lain — Minimum tempahan 10 orang (Private Group). Pakej termasuk Tour Guide & Insuran.",
      itinerary: [
        { day: "🌙 Hari Pertama (Day 1)", items: ["🕙 10:00 malam — Bertolak dari lokasi pick-up di KL Sentral", "🍽️ Singgah untuk sarapan di Bukit Kayu Hitam sebelum imigresen"] },
        { day: "☀️ Hari Kedua (Day 2)", items: ["🌅 6:00 pagi — Urusan imigresen di sempadan", "🌄 Lawatan ke Hatyai Municipal Park (view bandar Hatyai)", "🏨 Check-in hotel (Rehat & bersiap)", "🛍️ Shopping di Central Festival Mall", "🚤 Lawatan ke Floating Market Khlong Hae", "🛒 Asean Night Bazaar & Asean Plaza", "🛺 Balik hotel dengan tuk-tuk (van terakhir 8:30 malam)"] },
        { day: "🌊 Hari Ketiga (Day 3) — Songkhla", items: ["🍽️ 8:00 pagi — Sarapan di Dimsum Zaina", "🕌 Melawat Masjid Besar Songkhla", "☕ Singgah di Cafe Amazon, Mungkhang Singhanakorn", "⛴️ Naik feri bersama van ke Songkhla", "🍛 Makan tengah hari di Dimsum Chabura Songkhla", "🧜‍♀️ Melawat Samila Beach (Patung Ikan Duyung)", "🏔️ Tan Kuan Hill (Bukit Bendera)", "🐘 Chang Puak Camp / 📸 Seaverse Cafe", "🛍️ Free & Easy di Lee Garden Plaza", "🛺 Balik hotel dengan tuk-tuk (van terakhir 8:30 malam)"] },
        { day: "🏠 Hari Keempat (Day 4) — Pulang", items: ["🍽️ 8:00 pagi — Sarapan di Roti De Forest", "🛒 Shopping di Kim Yong Market (Pasar Gajus)", "🍗 Makan tengah hari di Kaitod Decha Airport", "🛍️ Shopping di Nora Plaza & Kaysorn Outlet", "🥘 Petang: Makan malam steamboat di Hatyai", "🚐 Bertolak ke sempadan sebelum jam 5:00 petang", "🕛 ETA tiba di KL Sentral selepas tengah malam"] },
      ],
    },
    {
      id:         "terengganu",
      emoji:      "🏖️",
      badge:      "🌊 Beach Tour",
      badgeColor: "#00897B",
      title:      "Kuala Terengganu Tour",
      duration:   "4 Days 3 Nights",
      groupType:  "Private 12–13 Pax",
      extras:     ["🏝️ Pulau Redang", "🤿 Snorkeling"],
      desc:       "KL → Kuala Terengganu → KL. Crystal Mosque, Drawbridge, Pulau Redang snorkeling & local delicacies!",
      price:      "RM5,880",
      priceLabel: "per group (12 pax) · +RM490/extra pax",
      waKey:      "KualaTerengganu",
      bgFrom:     "#00897B",
      bgTo:       "#009FE3",
      detailPage: true,
      includes: [
        "👥 12–13 Pax Private",
        "🏝️ Pulau Redang",
        "🤿 Snorkeling",
        "🏨 Homestay",
      ],
      notes: "Kadar private tour: RM5,880 untuk 12 pax. Maksimum 13 pax (tambah RM490 per pax extra).",
      itinerary: [
        { day: "🌙 Hari Pertama (Day 1)", items: ["🕙 9:00 malam — Bertolak dari Kuala Lumpur ke Kuala Terengganu (6–7 jam)"] },
        { day: "☀️ Hari Kedua (Day 2) — Kuala Terengganu", items: ["🌅 4:00–5:00 pagi — Tiba di Kuala Terengganu", "🍚 8:00 pagi — Sarapan Nasi Dagang Atas Tol", "🏙️ 9:00 pagi — Pusing sekitar bandar Kuala Terengganu", "🕌 12:00 tengah hari — Masjid Kristal", "🍽️ 2:00 petang — Makan tengah hari di restoran tempatan", "🦑 3:30 petang — Beli keropok lekor & produk tempatan", "🌅 5:00 petang — Aktiviti santai di Pantai Batu Buruk", "🌉 6:00 petang — Melawat Drawbridge Kuala Terengganu", "🏠 9:00 malam — Rehat di homestay"] },
        { day: "🏝️ Hari Ketiga (Day 3) — Pulau Redang", items: ["🌅 6:00 pagi — Bangun awal, sarapan ringkas", "🚐 6:30 pagi — Bertolak ke Jeti Merang (30–40 minit)", "📋 7:30 pagi — Pendaftaran trip day trip Pulau Redang", "🤿 8:00 pagi–4:00 petang — Day trip ke Pulau Redang (Snorkeling, pantai, makan tengah hari)", "🚤 5:00 petang — Tiba semula di jeti, pulang ke homestay"] },
        { day: "🏠 Hari Keempat (Day 4) — Pulang ke KL", items: ["🍳 8:00 pagi — Sarapan & kemas barang", "🏨 9:30 pagi — Check-out homestay", "🛍️ 10:00–12:00 — Pasar Payang + Muzium Negeri Terengganu (optional)", "🍽️ 12:30 tengah hari — Makan tengah hari", "🚐 2:00 petang — Bertolak pulang ke Kuala Lumpur", "🏙️ 10:00–11:00 malam — Dijangka tiba di Kuala Lumpur"] },
      ],
    },
  ], 
};
