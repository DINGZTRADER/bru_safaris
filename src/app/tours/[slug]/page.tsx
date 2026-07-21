import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { accommodationTiers, tours } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return tours.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = tours.find((candidate) => candidate.slug === slug);
  if (!item) return {};
  return { title: item.title, description: item.summary, alternates: { canonical: `/tours/${item.slug}` }, openGraph: { images: [item.image] } };
}

export default async function TourDetail({ params }: Props) {
  const { slug } = await params;
  const item = tours.find((candidate) => candidate.slug === slug);
  if (!item) notFound();
  return <div className="page">
    <header className="detail-hero"><Image src={item.image} fill priority alt={item.title} sizes="100vw"/><div className="hero-shade"/><div><p className="kicker light">{item.region} · {item.duration}</p><h1>{item.title}</h1><p>{item.summary}</p></div></header>
    <section className="detail">
      <aside><p><span>Journey</span><b>{item.duration}</b></p><p><span>Style</span><b>Private & tailored</b></p><p><span>Accommodation</span><b>Three levels</b></p><Link className="button" href={`/plan?trip=${encodeURIComponent(item.title)}`}>Customize this safari</Link></aside>
      <article><p className="kicker">Your route</p><h2>Day by <em>day.</em></h2><p>This sample route is designed to flow naturally. We adjust dates, pace, activities and stays around your interests and current permit availability.</p>
        <ol className="itinerary">{item.itinerary.map((day) => <li key={day.day}><span>Day {day.day}</span><div><h3>{day.title}</h3><p>{day.description}</p></div></li>)}</ol>
        <h3>Choose your accommodation style</h3><div className="tier-grid">{Object.entries(accommodationTiers).map(([name, description]) => <section key={name}><p className="kicker">{name}</p><p>{description}</p></section>)}</div>
        <div className="include-grid"><section><h3>Included</h3><ul className="feature-list">{item.included.map((entry) => <li key={entry}>✓ {entry}</li>)}</ul></section><section><h3>Not included</h3><ul className="feature-list">{item.excluded.map((entry) => <li key={entry}>— {entry}</li>)}</ul></section></div>
        <div className="custom-note"><p className="kicker">Built around you</p><h3>No two departures need be identical.</h3><p>We can slow the pace, add rest days, combine countries or mix accommodation levels. Your final proposal will show exactly what is confirmed.</p><Link className="text-link" href={`/plan?trip=${encodeURIComponent(item.title)}`}>Request your version →</Link></div>
      </article>
    </section>
  </div>;
}
