import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

const phone = "+250 798 978 710";

export function Footer() {
  return <footer className="bg-jungle text-white"><div className="container-page grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]"><div><Link href="/" aria-label="bru Safaris home"><Image src="/logo-small.png" alt="bru Safaris" width={72} height={72} className="size-[72px] rounded-full bg-[#f7f5ef] object-contain p-1" /></Link><p className="mt-4 max-w-sm text-sm leading-7 text-white/65">Private journeys through Rwanda and East Africa, designed with local knowledge, quiet luxury, and a lighter footprint.</p></div><div><p className="eyebrow text-gold">Contact</p><div className="mt-5 space-y-3 text-sm text-white/75"><a className="flex gap-3 hover:text-white" href="tel:+250798978710"><Phone className="size-4 text-gold" />{phone}</a><a className="flex gap-3 hover:text-white" href="mailto:hello@brusafaris.com"><Mail className="size-4 text-gold" />hello@brusafaris.com</a><p className="flex gap-3"><MapPin className="size-4 text-gold" />Kigali, Rwanda</p></div></div><div><p className="eyebrow text-gold">Discover</p><div className="mt-5 grid gap-3 text-sm text-white/75"><Link href="/#journeys">Safari journeys</Link><Link href="/plan">Plan your safari</Link><Link href="/#faq">Travel guide</Link><a href="#"><Instagram className="inline size-4" /> Instagram</a></div></div></div><div className="border-t border-white/10"><div className="container-page flex flex-col gap-2 py-6 text-xs text-white/45 sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} bru Safaris. Travel beautifully.</p><p>Rwanda · Uganda · East Africa</p></div></div></footer>;
}
