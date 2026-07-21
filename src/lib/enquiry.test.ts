import { describe, expect, it } from "vitest";
import { enquirySchema } from "./enquiry";

const valid = { name: "Amina Doe", email: "amina@example.com", phone: "", trip: "Rwanda safari", countries: ["Rwanda"], dates: "Flexible", duration: "10–14 days", adults: 2, children: 0, accommodation: "Mid-range", priorities: "Balanced experience", interests: ["Gorillas", "Wildlife"], mobility: "", dietary: "", message: "We would love a relaxed wildlife journey.", consent: true, website: "" };
describe("enquirySchema", () => {
  it("accepts a complete itinerary request", () => expect(enquirySchema.safeParse(valid).success).toBe(true));
  it("rejects invalid contact and group details", () => expect(enquirySchema.safeParse({ ...valid, email: "bad", adults: 0 }).success).toBe(false));
  it("requires a country and interest", () => expect(enquirySchema.safeParse({ ...valid, countries: [], interests: [] }).success).toBe(false));
  it("rejects a populated honeypot", () => expect(enquirySchema.safeParse({ ...valid, website: "spam" }).success).toBe(false));
});
