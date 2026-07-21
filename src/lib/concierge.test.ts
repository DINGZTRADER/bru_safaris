import { describe, expect, it } from "vitest";
import { buildWhatsAppMessage, profileFromText, recommendTours, type ConciergeProfile } from "./concierge";
import { tours } from "@/content/site";

const profile: ConciergeProfile = { countries: ["Rwanda"], interests: ["Mountain gorillas", "Lake time"], duration: "10–14 days", accommodation: "Mid-range", adults: 2, children: 0, dates: "September 2027" };

describe("safari concierge", () => {
  it("ranks a relevant Rwanda journey first", () => expect(recommendTours(profile, tours)[0].tour.title).toMatch(/Rwanda/));
  it("extracts intent from free text", () => expect(profileFromText("12 days in Rwanda with gorillas and chimpanzees")).toMatchObject({ countries: ["Rwanda"], duration: "10–14 days" }));
  it("creates a structured WhatsApp handoff", () => expect(buildWhatsAppMessage(profile, tours[0])).toContain("2 adults, 0 children"));
});
