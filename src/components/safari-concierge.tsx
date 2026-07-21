"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, MessageCircle, RotateCcw, Send, Sparkles, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { site, tours } from "@/content/site";
import { buildWhatsAppMessage, conciergeAccommodation, conciergeCountries, conciergeDurations, conciergeInterests, profileFromText, recommendTours, type ConciergeProfile } from "@/lib/concierge";
import styles from "./safari-concierge.module.css";

type Step = "welcome" | "countries" | "interests" | "duration" | "stay" | "group" | "results";
type Session = { step: Step; profile: ConciergeProfile };

const initialProfile: ConciergeProfile = { countries: ["Rwanda"], interests: [], duration: "10–14 days", accommodation: "Unsure", adults: 2, children: 0, dates: "" };
const initialSession: Session = { step: "welcome", profile: initialProfile };
const storageKey = "bru-safari-concierge-v1";
const steps: Step[] = ["welcome", "countries", "interests", "duration", "stay", "group", "results"];

function Choice({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return <button className={`${styles.choice} ${active ? styles.active : ""}`} type="button" aria-pressed={active} onClick={onClick}>{active && <Check size={14}/>} {children}</button>;
}

export function SafariConcierge() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<Session>(initialSession);
  const [query, setQuery] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const currentTour = tours.find((tour) => pathname === `/tours/${tour.slug}`);
  const matches = useMemo(() => recommendTours(session.profile, tours), [session.profile]);
  const stepIndex = steps.indexOf(session.step);

  useEffect(() => {
    try { const saved = localStorage.getItem(storageKey); if (saved) setSession(JSON.parse(saved) as Session); } catch { localStorage.removeItem(storageKey); }
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem(storageKey, JSON.stringify(session)); }, [hydrated, session]);
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);

  function updateProfile(update: Partial<ConciergeProfile>) { setSession((current) => ({ ...current, profile: { ...current.profile, ...update } })); }
  function toggle(field: "countries" | "interests", value: string) { const values = session.profile[field]; updateProfile({ [field]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value] }); }
  function go(step: Step) { setSession((current) => ({ ...current, step })); }
  function next() { go(steps[Math.min(stepIndex + 1, steps.length - 1)]); }
  function back() { go(steps[Math.max(stepIndex - 1, 0)]); }
  function reset() { setSession(initialSession); setQuery(""); localStorage.removeItem(storageKey); }
  function handleQuery(event: FormEvent) { event.preventDefault(); if (!query.trim()) return; updateProfile(profileFromText(query)); go("countries"); }
  function whatsapp(tour = matches[0]?.tour) { const message = buildWhatsAppMessage(session.profile, tour); window.open(`https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer"); }
  function book(tour = matches[0]?.tour) { const params = new URLSearchParams({ trip: tour?.title || "Custom East Africa safari", countries: session.profile.countries.join(","), interests: session.profile.interests.join(","), duration: session.profile.duration, accommodation: session.profile.accommodation, adults: String(session.profile.adults), children: String(session.profile.children), dates: session.profile.dates, message: `The Bru Safaris concierge recommended ${tour?.title || "a custom journey"}. My priorities are ${session.profile.interests.join(", ") || "open to recommendations"}.` }); setOpen(false); router.push(`/plan?${params}`); }

  return <div className={styles.root}>
    {!open && <button className={styles.launcher} type="button" onClick={() => setOpen(true)} aria-label="Open Bru Safari Concierge"><span className={styles.logoWrap}><Image src="/images/bru-safaris-logo-clear.png" alt="" width={54} height={54}/><i/></span><span><b>Safari concierge</b><small>Plan with a local expert</small></span><Sparkles size={18}/></button>}
    {open && <section className={styles.panel} role="dialog" aria-label="Bru Safari Concierge" aria-modal="false">
      <header className={styles.header}><div className={styles.identity}><Image src="/images/bru-safaris-logo-clear.png" alt="" width={48} height={48}/><span><b>Bru Safari Concierge</b><small><i/> WhatsApp handoff ready</small></span></div><div className={styles.headerActions}><button type="button" onClick={reset} aria-label="Start over"><RotateCcw/></button><button type="button" onClick={() => setOpen(false)} aria-label="Close concierge"><X/></button></div></header>
      <div className={styles.progress} aria-label={`Step ${stepIndex + 1} of ${steps.length}`}><span style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}/></div>
      <div className={styles.body} aria-live="polite">
        {currentTour && <p className={styles.context}>You’re viewing <b>{currentTour.title}</b>. I can compare it with every Bru Safaris journey.</p>}
        {session.step === "welcome" && <><div className={styles.message}><Sparkles size={16}/><div><b>Muraho! I’m your personal safari guide.</b><p>Tell me what you imagine, or build your journey with a few quick choices. I’ll recommend the strongest matches from our verified itineraries.</p></div></div><form className={styles.ask} onSubmit={handleQuery}><label htmlFor="concierge-idea">Describe your ideal safari</label><div><input id="concierge-idea" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. 12 days in Rwanda with gorillas and wildlife"/><button type="submit" aria-label="Use this travel idea"><Send/></button></div></form><div className={styles.quick}><button type="button" onClick={() => { updateProfile({ interests: ["Mountain gorillas"] }); go("countries"); }}>Gorilla trekking</button><button type="button" onClick={() => { updateProfile({ interests: ["Classic wildlife"] }); go("countries"); }}>Wildlife safari</button><button type="button" onClick={() => go("countries")}>Build my journey</button><button type="button" onClick={() => whatsapp(currentTour)}>Talk on WhatsApp</button></div></>}
        {session.step === "countries" && <StepShell title="Where would you like to explore?" copy="Choose one or combine countries. Rwanda is selected as the natural starting point."><div className={styles.choices}>{conciergeCountries.map((item) => <Choice key={item} active={session.profile.countries.includes(item)} onClick={() => toggle("countries", item)}>{item}</Choice>)}</div></StepShell>}
        {session.step === "interests" && <StepShell title="What would make the journey unforgettable?" copy="Select everything that matters. I’ll weight the recommendations around your priorities."><div className={styles.choices}>{conciergeInterests.map((item) => <Choice key={item} active={session.profile.interests.includes(item)} onClick={() => toggle("interests", item)}>{item}</Choice>)}</div></StepShell>}
        {session.step === "duration" && <StepShell title="How much time feels right?" copy="Good routing matters more than squeezing in another stop."><div className={styles.choices}>{conciergeDurations.map((item) => <Choice key={item} active={session.profile.duration === item} onClick={() => updateProfile({ duration: item })}>{item}</Choice>)}</div><label className={styles.field}>Travel month or dates<input value={session.profile.dates} onChange={(event) => updateProfile({ dates: event.target.value })} placeholder="September 2027 or flexible"/></label></StepShell>}
        {session.step === "stay" && <StepShell title="What style of stay suits you?" copy="We can keep one level throughout or mix exceptional lodges with smart-value stays."><div className={styles.choices}>{conciergeAccommodation.map((item) => <Choice key={item} active={session.profile.accommodation === item} onClick={() => updateProfile({ accommodation: item })}>{item}</Choice>)}</div></StepShell>}
        {session.step === "group" && <StepShell title="Who is travelling?" copy="This helps us shape vehicle space, rooming and the pace of active days."><div className={styles.group}><NumberField label="Adults" value={session.profile.adults} min={1} onChange={(adults) => updateProfile({ adults })}/><NumberField label="Children" value={session.profile.children} min={0} onChange={(children) => updateProfile({ children })}/></div><p className={styles.privacy}>Your choices stay in this browser until you submit the booking form or start WhatsApp.</p></StepShell>}
        {session.step === "results" && <><div className={styles.message}><Sparkles size={16}/><div><b>Your best safari matches are ready.</b><p>I compared your priorities with all nine verified Bru Safaris journeys. Availability and final prices are confirmed personally.</p></div></div><div className={styles.results}>{matches.map(({ tour, reasons }, index) => <article className={styles.result} key={tour.slug}><div className={styles.rank}>0{index + 1}</div><div><small>{tour.region} · {tour.duration}</small><h3>{tour.title}</h3><p>Recommended because it {reasons.join(", ")}.</p><div><Link href={`/tours/${tour.slug}`} onClick={() => setOpen(false)}>View journey</Link><button type="button" onClick={() => book(tour)}>Book this safari</button></div></div></article>)}</div><button className={styles.whatsapp} type="button" onClick={() => whatsapp()}><MessageCircle/> Send my plan to WhatsApp</button></>}
      </div>
      {session.step !== "welcome" && session.step !== "results" && <footer className={styles.controls}><button type="button" onClick={back}><ArrowLeft/> Back</button><button type="button" onClick={next} disabled={(session.step === "countries" && !session.profile.countries.length) || (session.step === "interests" && !session.profile.interests.length)}>Continue <ArrowRight/></button></footer>}
    </section>}
  </div>;
}

function StepShell({ title, copy, children }: { title: string; copy: string; children: React.ReactNode }) { return <div className={styles.step}><span className={styles.eyebrow}>Your private journey</span><h2>{title}</h2><p>{copy}</p>{children}</div>; }
function NumberField({ label, value, min, onChange }: { label: string; value: number; min: number; onChange: (value: number) => void }) { return <label><span>{label}</span><div><button type="button" onClick={() => onChange(Math.max(min, value - 1))} aria-label={`Remove one ${label.toLowerCase()}`}>−</button><b>{value}</b><button type="button" onClick={() => onChange(Math.min(30, value + 1))} aria-label={`Add one ${label.toLowerCase()}`}>+</button></div></label>; }
