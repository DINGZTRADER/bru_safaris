import { z } from "zod";

const optionalText = (max: number) => z.string().trim().max(max).optional().default("");
export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: optionalText(40),
  trip: z.string().trim().min(2).max(160),
  countries: z.array(z.enum(["Rwanda", "Uganda", "Tanzania"])).min(1).max(3),
  dates: optionalText(100),
  duration: z.string().trim().min(1).max(40),
  adults: z.coerce.number().int().min(1).max(30),
  children: z.coerce.number().int().min(0).max(20),
  accommodation: z.enum(["Luxury", "Mid-range", "Standard", "Mix levels", "Unsure"]),
  priorities: z.enum(["Exceptional stays", "Balanced experience", "Maximize value", "Help me decide"]),
  interests: z.array(z.string().trim().min(2).max(60)).min(1).max(12),
  mobility: optionalText(1000),
  dietary: optionalText(1000),
  message: z.string().trim().min(10).max(3000),
  consent: z.literal(true),
  website: z.string().max(0).optional().default(""),
});

export type Enquiry = z.infer<typeof enquirySchema>;
export function makeReference() { return `BRU-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`; }
