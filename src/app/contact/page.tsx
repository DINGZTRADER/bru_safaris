import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Contact" };
export default function ContactPage() {
  const contacts = [{ icon: Phone, title: "Call us", copy: "+250 798 978 710", href: "tel:+250798978710" }, { icon: MessageCircle, title: "WhatsApp", copy: "Message our safari team", href: "https://wa.me/250798978710" }, { icon: Mail, title: "Email", copy: "hello@brusafaris.com", href: "mailto:hello@brusafaris.com" }];
  return <main className="min-h-[75vh] bg-jungle pb-24 pt-40 text-white"><div className="container-page"><p className="eyebrow text-gold">Talk to a local expert</p><h1 className="display mt-3 max-w-3xl text-5xl md:text-7xl">The best journeys begin with a conversation.</h1><div className="mt-14 grid gap-5 md:grid-cols-3">{contacts.map(({ icon: Icon, title, copy, href }) => <a href={href} className="rounded-3xl border border-white/15 p-6 transition hover:bg-white/10" key={title}><Icon className="size-5 text-gold" /><p className="mt-6 text-xs uppercase tracking-widest text-white/50">{title}</p><p className="mt-2 font-semibold">{copy}</p></a>)}</div><p className="mt-8 flex items-center gap-2 text-sm text-white/60"><MapPin className="size-4 text-gold" />Kigali, Rwanda · Available 24/7 for guests travelling with us</p><Button asChild variant="gold" className="mt-10"><Link href="/plan">Start planning</Link></Button></div></main>;
}
