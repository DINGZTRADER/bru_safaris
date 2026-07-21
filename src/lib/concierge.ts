import type { Tour } from "@/content/site";

export const conciergeCountries = ["Rwanda", "Uganda", "Tanzania"] as const;
export const conciergeInterests = ["Mountain gorillas", "Chimpanzees", "Classic wildlife", "Culture and history", "Photography", "Hiking", "Lake time"] as const;
export const conciergeDurations = ["8–10 days", "10–14 days", "15–18 days", "19–21 days", "Flexible"] as const;
export const conciergeAccommodation = ["Luxury", "Mid-range", "Standard", "Mix levels", "Unsure"] as const;

export type ConciergeProfile = {
  countries: string[];
  interests: string[];
  duration: string;
  accommodation: string;
  adults: number;
  children: number;
  dates: string;
};

export type TourMatch = { tour: Tour; score: number; reasons: string[] };

const interestTerms: Record<string, string[]> = {
  "Mountain gorillas": ["gorilla", "volcanoes", "bwindi", "primate"],
  Chimpanzees: ["chimpanzee", "kibale", "nyungwe", "primate"],
  "Classic wildlife": ["wildlife", "akagera", "savannah", "serengeti", "ngorongoro", "game drive"],
  "Culture and history": ["culture", "cultural", "kigali", "community", "stories"],
  Photography: ["photography", "wildlife", "gorilla", "landscape"],
  Hiking: ["hiking", "forest", "canopy", "volcano", "trek"],
  "Lake time": ["lake", "kivu", "bunyonyi", "great lakes"],
};

function durationDays(value: string) {
  const matches = value.match(/\d+/g)?.map(Number) || [];
  return matches.length ? matches.reduce((sum, item) => sum + item, 0) / matches.length : null;
}

export function recommendTours(profile: ConciergeProfile, tours: Tour[]): TourMatch[] {
  const preferredDays = durationDays(profile.duration);
  return tours.map((tour) => {
    const searchable = [tour.title, tour.region, tour.category, tour.summary, ...tour.highlights].join(" ").toLowerCase();
    let score = tour.featured ? 2 : 0;
    const reasons: string[] = [];
    const countryMatches = profile.countries.filter((country) => searchable.includes(country.toLowerCase()));
    if (countryMatches.length) { score += countryMatches.length * 4; reasons.push(`covers ${countryMatches.join(" and ")}`); }
    const matchedInterests = profile.interests.filter((interest) => (interestTerms[interest] || [interest]).some((term) => searchable.includes(term.toLowerCase())));
    if (matchedInterests.length) { score += matchedInterests.length * 5; reasons.push(`strong for ${matchedInterests.slice(0, 2).join(" and ").toLowerCase()}`); }
    const tripDays = durationDays(tour.duration);
    if (preferredDays && tripDays) {
      const difference = Math.abs(preferredDays - tripDays);
      score += Math.max(0, 5 - difference);
      if (difference <= 2) reasons.push(`fits your ${profile.duration.toLowerCase()} pace`);
    }
    return { tour, score, reasons: reasons.length ? reasons : ["offers a balanced private East Africa experience"] };
  }).sort((a, b) => b.score - a.score || a.tour.title.localeCompare(b.tour.title)).slice(0, 3);
}

export function profileFromText(text: string): Partial<ConciergeProfile> {
  const value = text.toLowerCase();
  const countries = conciergeCountries.filter((country) => value.includes(country.toLowerCase()));
  const interests = conciergeInterests.filter((interest) => (interestTerms[interest] || [interest]).some((term) => value.includes(term)));
  const statedDays = Number(value.match(/(\d{1,2})\s*(?:day|night)/)?.[1] || 0);
  const duration = conciergeDurations.find((option) => {
    const days = durationDays(option); return days && statedDays && Math.abs(days - statedDays) <= 2;
  });
  return { ...(countries.length && { countries: [...countries] }), ...(interests.length && { interests: [...interests] }), ...(duration && { duration }) };
}

export function buildWhatsAppMessage(profile: ConciergeProfile, tour?: Tour) {
  return ["Hello Bru Safaris! I used your website concierge and would like help planning a private safari.", "", `Recommended journey: ${tour?.title || "Please help me choose"}`, `Countries: ${profile.countries.join(", ") || "Flexible"}`, `Interests: ${profile.interests.join(", ") || "Open to recommendations"}`, `Duration: ${profile.duration || "Flexible"}`, `Travel dates: ${profile.dates || "Flexible"}`, `Guests: ${profile.adults} adults, ${profile.children} children`, `Accommodation: ${profile.accommodation || "Unsure"}`, "", "Please advise on availability and the next steps."].join("\n");
}
