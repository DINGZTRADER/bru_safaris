import type { Metadata } from "next";
import Link from "next/link";
import { founder } from "@/content/site";

export const metadata: Metadata = { title: "About Bru Safaris", description: "Meet Igihozo Teta Brune, founder of Bru Safaris, a Kigali-based company designing private journeys through Rwanda and Uganda.", alternates: { canonical: "/about" } };
export default function About() { return <div className="page"><header className="page-hero"><p className="kicker">Our story</p><h1>Local insight.<br/><em>Personal journeys.</em></h1><p>Bru Safaris is a Kigali-based travel company creating considered private experiences across Rwanda and Uganda.</p></header><section className="intro section"><div><p className="kicker">Meet the founder</p><h2>{founder.name}<br/><em>{founder.role}</em></h2></div><div className="intro-copy"><p>{founder.biography}</p><p>Every journey starts with listening: where you want to go, how you want to feel and what will make the experience truly yours.</p><Link className="button" href="/plan">Start a conversation →</Link></div></section></div>; }
