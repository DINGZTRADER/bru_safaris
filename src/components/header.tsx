"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [{ href: "/#journeys", label: "Journeys" }, { href: "/#map", label: "Explore Rwanda" }, { href: "/#why-bru", label: "Why bru" }, { href: "/#faq", label: "Travel guide" }];
const phone = "+250 798 978 710";
const phoneHref = "tel:+250798978710";

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="absolute inset-x-0 top-0 z-40 text-white"><div className="container-page flex h-24 items-center justify-between border-b border-white/20"><Link href="/" aria-label="bru Safaris home" className="flex items-center"><Image src="/logo.png" alt="bru Safaris" width={60} height={60} priority className="size-14 rounded-full bg-[#f7f5ef] object-contain p-1" /></Link><nav className="hidden items-center gap-7 text-sm lg:flex">{nav.map(x => <Link className="transition hover:text-gold" href={x.href} key={x.href}>{x.label}</Link>)}</nav><div className="hidden items-center gap-4 lg:flex"><a href={phoneHref} className="flex items-center gap-2 text-sm"><Phone className="size-4 text-gold" />{phone}</a><Button asChild variant="gold" size="sm"><Link href="/plan">Plan my safari</Link></Button></div><button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button></div>{open && <nav className="mx-4 rounded-2xl bg-jungle p-5 shadow-xl lg:hidden">{nav.map(x => <Link onClick={() => setOpen(false)} className="block border-b border-white/10 py-3" href={x.href} key={x.href}>{x.label}</Link>)}<a className="block py-3 text-gold" href={phoneHref}>{phone}</a></nav>}</header>;
}
