import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { tours } from "@/content/site";

export const metadata: Metadata = {
  title: "Private Rwanda & East Africa Safaris",
  description: "Explore substantial private safaris across Rwanda, Uganda and Tanzania, with luxury, mid-range and standard accommodation options.",
  alternates: { canonical: "/tours" },
};

export default function Tours() {
  return <div className="page">
    <header className="page-hero">
      <p className="kicker">Choose your starting point</p>
      <h1>Journeys with<br/><em>room to feel.</em></h1>
      <p>Eight to twenty-one days, privately guided and tailored in luxury, mid-range or standard style. Every itinerary is a foundation, never a fixed departure.</p>
    </header>
    <div className="catalog">{tours.map((item) =>
      <Link href={`/tours/${item.slug}`} className="catalog-card" key={item.slug}>
        <div><Image src={item.image} fill alt={item.title} sizes="(max-width: 800px) 100vw, 48vw"/></div>
        <article><p className="kicker">{item.region} · {item.duration}</p><h2>{item.title}</h2><p>{item.summary}</p><ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><span className="text-link">Explore the itinerary →</span></article>
      </Link>)}</div>
  </div>;
}
