import { BookingForm } from "@/components/booking-form";
import { Card } from "@/components/ui/card";
import { Check, Phone } from "lucide-react";

export const metadata = { title: "Plan your safari", description: "Tell bru Safaris what your ideal Rwanda journey looks like." };
export default function PlanPage() {
  return <main className="min-h-screen bg-jungle pb-20 pt-36"><div className="container-page grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><div className="text-white"><p className="eyebrow text-gold">Your private journey</p><h1 className="display mt-3 text-5xl md:text-6xl">Let’s make<br />Rwanda yours.</h1><p className="mt-6 max-w-md text-sm leading-7 text-white/65">Share the beginnings of an idea. A local travel designer will shape it into a personal, no-obligation proposal within 48 hours.</p><ul className="mt-9 space-y-4 text-sm text-white/75">{["Tailored entirely around you", "Permits checked before we quote", "Clear, itemised pricing", "One expert from first call to farewell"].map(x => <li className="flex gap-3" key={x}><Check className="size-5 text-gold" />{x}</li>)}</ul><a href="tel:+250798978710" className="mt-10 inline-flex items-center gap-3 border-t border-white/15 pt-7 text-sm"><span className="flex size-10 items-center justify-center rounded-full bg-white/10"><Phone className="size-4 text-gold" /></span><span><small className="block text-white/50">Prefer to talk?</small>+250 798 978 710</span></a></div><Card className="border-0 p-6 md:p-10"><BookingForm /></Card></div></main>;
}
