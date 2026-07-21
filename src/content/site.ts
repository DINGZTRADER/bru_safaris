export const site = {
  name: "Bru-Safaris",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.brusafaris.com",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "brusafarisoffisiol@gmail.com",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+250798978710",
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "Kicukiro, Kigali, Rwanda",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+250798978710",
};

export const businessHours = [
  { days: "Monday–Friday", hours: "8:00 AM–7:00 PM" },
  { days: "Saturday", hours: "12:00 noon–8:00 PM" },
  { days: "Sunday", hours: "Closed" },
];

export const socialProfiles = [
  { network: "Facebook", label: "Bru Safaris" },
  { network: "Instagram", label: "Bru Safaris" },
  { network: "TikTok", label: "Bru Safaris" },
];

export const founder = {
  name: "Igihozo Teta Brune",
  role: "Founder & Managing Director",
  biography: "Igihozo Teta Brune founded Bru Safaris to welcome travellers into the landscapes and experiences of Rwanda and Uganda. Her focus is simple: thoughtful journeys, attentive care and memories that stay with guests long after they return home.",
};

export type AccommodationTier = "Luxury" | "Mid-range" | "Standard";
export type TourDay = { day: number; title: string; description: string };
export type Tour = {
  slug: string; title: string; region: string; duration: string; category: string;
  summary: string; image: string; highlights: string[]; itinerary: TourDay[];
  included: string[]; excluded: string[]; featured?: boolean;
};

const images = {
  gorilla: "/images/rwanda-hero.png",
  savannah: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1800&q=88",
  forest: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1800&q=88",
  lake: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=88",
  elephant: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1800&q=88",
  plains: "https://images.unsplash.com/photo-1535338454770-8be927b5a00b?auto=format&fit=crop&w=1800&q=88",
};

const included = ["Private 4x4 vehicle and professional English-speaking guide", "Accommodation and meals shown in the confirmed itinerary", "Park entry fees and scheduled activities", "Airport transfers and bottled drinking water"];
const excluded = ["International flights and visas", "Gorilla and chimpanzee permits unless confirmed in writing", "Travel insurance, gratuities and personal purchases", "Optional activities and premium drinks"];
const makeItinerary = (stops: string[]): TourDay[] => stops.map((title, index) => ({ day: index + 1, title, description: `${title} at a thoughtful private pace, with time for local context, photography and unhurried moments.` }));
const tour = (input: Omit<Tour, "itinerary" | "included" | "excluded"> & { stops: string[] }): Tour => ({ ...input, itinerary: makeItinerary(input.stops), included, excluded });

export const accommodationTiers: Record<AccommodationTier, string> = {
  Luxury: "Exceptional lodges, elevated service, distinctive settings and the most seamless routing available.",
  "Mid-range": "Characterful, well-run lodges balancing comfort, location and excellent overall value.",
  Standard: "Clean, welcoming stays selected for authenticity, dependable service and smart use of budget.",
};

export const tours: Tour[] = [
  tour({ slug: "rwanda-gorilla-golden-monkey", title: "Rwanda Gorilla & Golden Monkey Journey", region: "Kigali · Volcanoes", duration: "8 days", category: "Primates", summary: "Two remarkable primate encounters, volcanic landscapes and meaningful Rwandan culture in one focused private journey.", image: images.gorilla, highlights: ["Mountain gorilla trek", "Golden monkey tracking", "Kigali culture", "Volcanic foothills"], stops: ["Arrive in Kigali", "Kigali stories and cuisine", "To Volcanoes National Park", "Mountain gorilla trekking", "Conservation and community", "Golden monkey tracking", "Return through rural Rwanda", "Departure from Kigali"], featured: true }),
  tour({ slug: "rwanda-wildlife-gorillas-lake-kivu", title: "Rwanda Wildlife, Gorillas & Lake Kivu", region: "Akagera · Volcanoes · Kivu", duration: "10 days", category: "Classic", summary: "Rwanda’s signature contrast: savannah wildlife, mountain gorillas and restorative time beside Lake Kivu.", image: images.savannah, highlights: ["Akagera game drives", "Mountain gorillas", "Lake Kivu", "Private guiding"], stops: ["Welcome to Kigali", "To Akagera", "Northern Akagera game drive", "Lake Ihema and southern plains", "Across Rwanda to Volcanoes", "Gorilla trekking", "Volcanoes at leisure", "To Lake Kivu", "Lake Kivu retreat", "Return to Kigali"], featured: true }),
  tour({ slug: "complete-rwanda-discovery", title: "Complete Rwanda Discovery", region: "All three national parks", duration: "12 days", category: "Discovery", summary: "A richly paced circuit through Akagera, Volcanoes, Nyungwe and Lake Kivu for the fullest Rwanda experience.", image: images.forest, highlights: ["Three national parks", "Gorillas and chimpanzees", "Big game", "Lake Kivu"], stops: ["Arrive Kigali", "Kigali heritage", "To Akagera", "Akagera safari", "To Volcanoes", "Gorilla trekking", "Golden monkeys or cultural day", "Lake Kivu", "Congo Nile landscapes", "Nyungwe forest", "Chimpanzee tracking", "Return to Kigali"], featured: true }),
  tour({ slug: "rwanda-grand-circuit", title: "Rwanda Grand Circuit", region: "Rwanda, unhurried", duration: "14 days", category: "Slow travel", summary: "A two-week private circuit with deeper wildlife time, forest walks, community encounters and relaxed lake days.", image: images.lake, highlights: ["Unhurried pacing", "All national parks", "Two Lake Kivu nights", "Cultural encounters"], stops: ["Arrive Kigali", "Kigali in depth", "To Akagera", "Southern Akagera", "Northern Akagera", "To Volcanoes", "Gorilla trekking", "Golden monkeys", "To Lake Kivu", "Lake Kivu at leisure", "Congo Nile route", "Nyungwe primates", "Canopy and tea", "Return to Kigali"] }),
  tour({ slug: "rwanda-uganda-primate-expedition", title: "Rwanda–Uganda Primate Expedition", region: "Volcanoes · Bwindi · Kibale", duration: "12 days", category: "Primates", summary: "A specialist journey linking the Albertine Rift’s celebrated gorilla and chimpanzee habitats.", image: images.gorilla, highlights: ["Two gorilla regions", "Kibale chimpanzees", "Golden monkeys", "Albertine Rift"], stops: ["Arrive Kigali", "Kigali and Volcanoes", "Golden monkeys", "Rwanda gorilla trek", "Cross to Bwindi", "Bwindi gorilla trek", "Community and forest", "To Queen Elizabeth", "Kazinga Channel", "To Kibale", "Chimpanzee tracking", "Depart Entebbe"] }),
  tour({ slug: "rwanda-uganda-wildlife-journey", title: "Rwanda–Uganda Wildlife Journey", region: "Akagera · Bwindi · Queen Elizabeth", duration: "15 days", category: "Wildlife", summary: "Primate forests and classic savannahs combined with border-to-border private guiding.", image: images.elephant, highlights: ["Akagera wildlife", "Bwindi gorillas", "Queen Elizabeth safari", "Lake Bunyonyi"], stops: ["Arrive Kigali", "Kigali", "To Akagera", "Akagera safari", "Boat safari", "To Volcanoes", "Gorilla trekking", "To Lake Bunyonyi", "Lake Bunyonyi", "Bwindi forest", "Gorilla trekking", "To Queen Elizabeth", "Game drives", "Kazinga Channel", "Depart Entebbe"] }),
  tour({ slug: "great-lakes-gorilla-savannah", title: "Great Lakes Gorilla & Savannah Safari", region: "Rwanda · Uganda", duration: "16 days", category: "Grand journey", summary: "A scenic Great Lakes route pairing intimate primate encounters with expansive wildlife country.", image: images.plains, highlights: ["Rwanda and Uganda", "Gorillas", "Savannah wildlife", "Great Lakes scenery"], stops: ["Arrive Kigali", "Kigali stories", "Akagera", "Akagera safari", "To Volcanoes", "Gorilla trekking", "Lake Kivu", "Cross to Uganda", "Lake Bunyonyi", "Bwindi", "Gorilla trek", "Queen Elizabeth", "Kazinga Channel", "Kibale", "Chimpanzees", "Depart Entebbe"] }),
  tour({ slug: "rwanda-uganda-tanzania-expedition", title: "Rwanda, Uganda & Tanzania Expedition", region: "The northern safari circuit", duration: "18 days", category: "Expedition", summary: "Three countries, rare primates and Tanzania’s legendary plains in one carefully connected expedition.", image: images.elephant, highlights: ["Three countries", "Gorillas and chimpanzees", "Serengeti", "Ngorongoro"], stops: ["Arrive Kigali", "Kigali", "Volcanoes", "Gorilla trekking", "Cross to Uganda", "Bwindi", "Queen Elizabeth", "Kazinga Channel", "Kibale", "Chimpanzees", "Fly to Tanzania", "Arusha", "Tarangire", "Ngorongoro", "Central Serengeti", "Serengeti safari", "Serengeti at leisure", "Departure"] }),
  tour({ slug: "east-africa-grand-safari", title: "East Africa Grand Safari", region: "Rwanda · Uganda · Tanzania", duration: "21 days", category: "Flagship", summary: "Our most complete private safari: exceptional primates, deep cultural context and the great East African wildlife landscapes.", image: images.plains, highlights: ["Flagship 21-day route", "Gorillas and chimpanzees", "Serengeti and Ngorongoro", "Private throughout"], stops: ["Arrive Kigali", "Kigali in depth", "Akagera", "Akagera safari", "Volcanoes", "Gorilla trekking", "Lake Kivu", "To Uganda", "Bwindi", "Gorilla trekking", "Queen Elizabeth", "Kazinga Channel", "Kibale", "Chimpanzees", "Fly to Tanzania", "Tarangire", "Ngorongoro", "Serengeti south", "Serengeti central", "Final safari day", "Departure"] }),
];

export const destinations = [
  { slug: "volcanoes-national-park", name: "Volcanoes National Park", eyebrow: "Rare encounters", text: "Misty bamboo forest, volcanic peaks and the gateway to mountain gorilla trekking.", image: images.gorilla },
  { slug: "akagera-national-park", name: "Akagera National Park", eyebrow: "Wild horizons", text: "Savannah, woodland and lakes supporting Rwanda’s richest classic safari experience.", image: images.savannah },
  { slug: "nyungwe-national-park", name: "Nyungwe National Park", eyebrow: "Ancient rainforest", text: "Primate encounters, birdlife and forest trails in one of Africa’s oldest rainforests.", image: images.forest },
];
