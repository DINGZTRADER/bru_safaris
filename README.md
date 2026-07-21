# Bru-Safaris

Production-oriented Next.js website for a Kigali-based private safari operator.

## Local setup

1. Install Node.js 20.9 or newer and run `npm install`.
2. Copy `.env.example` to `.env.local` and provide verified company values.
3. Run `npm run dev`.
4. Before deployment run `npm run typecheck`, `npm test`, `npm run lint`, and `npm run build`.

## Enquiry delivery

Create a Resend account, verify the sending domain, and set `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, and `ENQUIRY_TO_EMAIL`. The server validates every submission, applies a basic abuse limit and never exposes email credentials to the browser. For high-volume production use, replace the in-memory limiter with a shared durable rate-limit store.

## Vercel deployment

Import the repository into Vercel, add all variables from `.env.example`, then deploy. Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin. Analytics and Speed Insights begin reporting after deployment.

## Required before public launch

- Verified phone, WhatsApp, email, Kigali address and business hours
- Genuine company story, staff profiles, registrations and memberships
- Confirmed tour routes, prices, inclusions, permit terms and accommodation partners
- Real photography with documented usage rights
- Genuine testimonials with permission
- Legal review of privacy, booking, cancellation and refund terms
- Current travel guidance reviewed against authoritative government and park sources
- Production-grade distributed rate limiting if enquiry volume warrants it
