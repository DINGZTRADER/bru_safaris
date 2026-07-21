import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { founder } from "@/content/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Bru Safaris",
  description: "Meet Igihozo Teta Brune, founder of Bru Safaris, a Kigali-based company designing private journeys through Rwanda and Uganda.",
  alternates: { canonical: "/about" },
};

const storyImages = [
  { src: "/images/cultural-dancer-rwanda.png", alt: "Young Rwandan cultural dancer performing in traditional dress", featured: true },
  { src: "/images/inyambo-cattle-rwanda.png", alt: "Traditional Inyambo cattle in Rwanda" },
  { src: "/images/kigali-cultural-centre.png", alt: "Kigali cultural centre and landscaped grounds" },
  { src: "/images/kigali-hospitality.png", alt: "Welcoming hospitality space in Kigali", wide: true },
];

export default function About() {
  return <div className="page">
    <header className="page-hero"><p className="kicker">Our story</p><h1>Local insight.<br/><em>Personal journeys.</em></h1><p>Bru Safaris is a Kigali-based travel company creating considered private experiences across Rwanda and Uganda.</p></header>
    <section className="intro section"><div><p className="kicker">Meet the founder</p><h2>{founder.name}<br/><em>{founder.role}</em></h2></div><div className="intro-copy"><p>{founder.biography}</p><p>Every journey starts with listening: where you want to go, how you want to feel and what will make the experience truly yours.</p><Link className="button" href="/plan">Start a conversation →</Link></div></section>
    <section className={styles.gallery} aria-label="Rwandan culture and hospitality">{storyImages.map((image) => <figure className={image.featured ? styles.main : image.wide ? styles.wide : undefined} key={image.src}><Image src={image.src} fill alt={image.alt} sizes={image.featured ? "(max-width: 800px) 100vw, 50vw" : "(max-width: 800px) 100vw, 25vw"}/></figure>)}</section>
  </div>;
}
