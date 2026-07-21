import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { site, socialProfiles } from "@/content/site";

export function Footer() {
  const whatsappUrl = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;
  return <footer>
    <div className="footer-lead"><div><p className="kicker">Your East Africa story starts here</p><h2>Ready to travel<br/><em>deeper?</em></h2></div><Link className="circle-link" href="/plan">Plan your<br/>safari →</Link></div>
    <div className="footer-grid">
      <div><Link className="footer-brand" href="/" aria-label="Bru Safaris home"><Image src="/images/bru-safaris-logo-clear.png" alt="Bru Safaris" width={144} height={144}/></Link><p>Private journeys, thoughtfully designed by a team on the ground in Kicukiro, Kigali.</p></div>
      <div><b>Explore</b><Link href="/tours">Safaris</Link><Link href="/destinations">Destinations</Link><Link href="/blog">Journal</Link></div>
      <div><b>Plan</b><Link href="/plan">Custom itinerary</Link><Link href="/about">Our story</Link><Link href="/contact">Contact</Link></div>
      <div><b>Connect</b><a href={`mailto:${site.email}`}><Mail size={15}/> {site.email}</a><a href={`tel:${site.phone}`}><Phone size={15}/> {site.phone}</a><a href={whatsappUrl}><MessageCircle size={15}/> WhatsApp</a><p className="footer-socials">{socialProfiles.map(({ network }) => network).join(" · ")}</p></div>
    </div>
    <div className="legal"><span>© {new Date().getFullYear()} Bru Safaris</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span><span>{site.address}</span></div>
  </footer>;
}
