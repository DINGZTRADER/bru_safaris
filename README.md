# bru Safaris

Production-ready safari marketing and enquiry experience built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style primitives, React Hook Form, Zod, Framer Motion, and Lucide.

## Local development

```bash
npm install
npm run dev
```

## Production

```bash
npm run lint
npm run build
```

Push this project to `DINGZTRADER/bru_safaris`, import it into Vercel, and deploy. The current enquiry endpoint validates requests and returns a reference number; connect the marked persistence boundary in `src/app/api/enquiries/route.ts` to Supabase, Prisma, email, or a CRM before accepting live bookings.
