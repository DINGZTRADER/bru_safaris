"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [["Safaris", "/tours"], ["Destinations", "/destinations"], ["Journal", "/blog"], ["About", "/about"]];
export function Header() { const [open, setOpen] = useState(false); return <header className="header"><Link className="brand" href="/" aria-label="Bru Safaris home"><Image className="brand-logo" src="/images/bru-safaris-logo-clear.png" alt="Bru Safaris" width={88} height={88} priority/></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([name, href]) => <Link key={href} href={href}>{name}</Link>)}<Link className="button small" href="/plan">Design my safari <span>↗</span></Link></nav><button className="menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>{open && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(([name, href]) => <Link onClick={() => setOpen(false)} key={href} href={href}>{name}</Link>)}<Link onClick={() => setOpen(false)} href="/plan">Design my safari</Link></nav>}</header>; }
