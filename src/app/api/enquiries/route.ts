import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { enquirySchema, makeReference, type Enquiry } from "@/lib/enquiry";

const attempts = new Map<string, { count: number; reset: number }>();
function formatEnquiry(data: Enquiry, reference: string) { return [`Reference: ${reference}`, `Name: ${data.name}`, `Email: ${data.email}`, `Phone: ${data.phone || "Not provided"}`, `Trip: ${data.trip}`, `Countries: ${data.countries.join(", ")}`, `Dates: ${data.dates || "Flexible"}`, `Duration: ${data.duration}`, `Group: ${data.adults} adults, ${data.children} children`, `Accommodation: ${data.accommodation}`, `Planning priority: ${data.priorities}`, `Interests: ${data.interests.join(", ")}`, `Mobility/accessibility: ${data.mobility || "None shared"}`, `Dietary needs: ${data.dietary || "None shared"}`, "", data.message].join("\n"); }

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"; const now = Date.now(); const entry = attempts.get(ip);
  if (entry && entry.reset > now && entry.count >= 5) return NextResponse.json({ error: "Please wait before trying again." }, { status: 429 });
  attempts.set(ip, { count: entry && entry.reset > now ? entry.count + 1 : 1, reset: now + 60_000 });
  let body: unknown; try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }
  const parsed = enquirySchema.safeParse(body); if (!parsed.success) return NextResponse.json({ error: "Please check the form fields.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  const reference = makeReference(); if (parsed.data.website) return NextResponse.json({ ok: true, reference });
  const { RESEND_API_KEY, ENQUIRY_FROM_EMAIL, ENQUIRY_TO_EMAIL } = process.env;
  if (RESEND_API_KEY && ENQUIRY_FROM_EMAIL && ENQUIRY_TO_EMAIL) { const resend = new Resend(RESEND_API_KEY); const result = await resend.emails.send({ from: ENQUIRY_FROM_EMAIL, to: ENQUIRY_TO_EMAIL, replyTo: parsed.data.email, subject: `Custom safari request ${reference}`, text: formatEnquiry(parsed.data, reference) }); if (result.error) return NextResponse.json({ error: "Enquiry delivery failed." }, { status: 502 }); }
  else if (process.env.NODE_ENV === "production") return NextResponse.json({ error: "Enquiry delivery is not configured." }, { status: 503 });
  return NextResponse.json({ ok: true, reference }, { status: 201 });
}
