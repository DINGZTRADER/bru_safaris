"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Compass, MessageCircle, Send, Sparkles, X } from "lucide-react";

type Focus = "gorillas" | "chimpanzees" | "big-five" | "rwanda";
type Style = "Luxury" | "Mid-range" | "A thoughtful mix";
type Timing = "In the next 3 months" | "In 3–6 months" | "More than 6 months away";
type Group = "1–2 travellers" | "3–4 travellers" | "5+ travellers";

const options: Record<Focus, { label: string; short: string; recommendation: string; detail: string; href: string }> = {
  gorillas: { label: "Mountain gorillas", short: "gorilla trekking", recommendation: "The Silverback Passage", detail: "A four-day Volcanoes National Park journey centred on a private gorilla encounter.", href: "/safaris/volcanoes-gorilla-trek" },
  chimpanzees: { label: "Chimpanzees & rainforest", short: "chimpanzee tracking", recommendation: "Canopy & Chimpanzees", detail: "A five-day Nyungwe Forest retreat with tracking, tea country and Lake Kivu.", href: "/safaris/nyungwe-primate-retreat" },
  "big-five": { label: "Big Five game drives", short: "Big Five game drives", recommendation: "Savannah Afterglow", detail: "A three-day Akagera escape with private drives and a Lake Ihema boat safari.", href: "/safaris/akagera-big-five" },
  rwanda: { label: "A little of everything", short: "a Rwanda highlights journey", recommendation: "A tailored Rwanda circuit", detail: "We will combine rainforest, savannah and volcanoes around the pace that suits you.", href: "/plan" },
};

const whatsappBase = "https://wa.me/250798978710?text=";

export function SafariConcierge() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [focus, setFocus] = useState<Focus | null>(null);
  const [style, setStyle] = useState<Style | null>(null);
  const [timing, setTiming] = useState<Timing | null>(null);
  const [group, setGroup] = useState<Group | null>(null);

  const selection = focus ? options[focus] : null;
  const whatsappHref = useMemo(() => {
    const message = [
      "Hello bru Safaris, I used the Safari Concierge and would like to plan a journey.",
      `My main interest: ${selection?.short ?? "Rwanda safari"}.`,
      `Suggested starting point: ${selection?.recommendation ?? "a tailored Rwanda circuit"}.`,
      `Travel timing: ${timing ?? "not decided yet"}.`,
      `Group: ${group ?? "not decided yet"}.`,
      `Preferred style: ${style ?? "not decided yet"}.`,
      "Please help me design the next step.",
    ].join("\n");
    return `${whatsappBase}${encodeURIComponent(message)}`;
  }, [group, selection, style, timing]);

  function close() {
    setOpen(false);
    setStep(1);
  }

  function chooseFocus(value: Focus) {
    setFocus(value);
    setStep(2);
  }

  function chooseStyle(value: Style) {
    setStyle(value);
    setStep(3);
  }

  function chooseLogistics(nextTiming: Timing, nextGroup: Group) {
    setTiming(nextTiming);
    setGroup(nextGroup);
    setStep(4);
  }

  return <div className="fixed bottom-5 right-5 z-50 flex items-end gap-3">
    <a href="https://wa.me/250798978710?text=Hello%20bru%20Safaris%2C%20I%27d%20like%20to%20plan%20a%20Rwanda%20safari." target="_blank" rel="noreferrer" aria-label="Chat with bru Safaris on WhatsApp" className="flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105">
      <MessageCircle className="size-5" />
    </a>
    {open && <section id="safari-concierge" aria-label="Safari Concierge" className="absolute bottom-16 right-0 w-[min(calc(100vw-2rem),25rem)] overflow-hidden rounded-[1.75rem] border border-white/20 bg-[#f7f5ef] text-foreground shadow-2xl">
      <div className="relative overflow-hidden bg-jungle px-5 pb-5 pt-6 text-white"><div className="noise absolute inset-0" /><div className="relative flex items-start justify-between gap-4"><div><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-gold"><Sparkles className="size-3.5" />Safari Concierge</p><h2 className="display mt-2 text-2xl">Let’s find your Rwanda.</h2><p className="mt-1 text-xs leading-5 text-white/65">A thoughtful starting point, then a real local expert.</p></div><button type="button" onClick={close} aria-label="Close Safari Concierge" className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"><X className="size-5" /></button></div></div>
      <div className="p-5">
        <div className="mb-5 flex gap-1.5" aria-label={`Step ${step} of 4`}>{[1, 2, 3, 4].map((item) => <span key={item} className={`h-1 flex-1 rounded-full ${item <= step ? "bg-gold" : "bg-muted"}`} />)}</div>
        {step === 1 && <div><p className="text-sm font-semibold">What pulls you to Rwanda?</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Choose the experience you would plan the journey around.</p><div className="mt-4 grid gap-2">{(Object.entries(options) as [Focus, typeof options[Focus]][]).map(([key, item]) => <button type="button" key={key} onClick={() => chooseFocus(key)} className="group flex items-center justify-between rounded-2xl border bg-white px-4 py-3.5 text-left transition hover:border-gold hover:bg-gold/10"><span className="text-sm font-semibold">{item.label}</span><ArrowRight className="size-4 text-gold transition group-hover:translate-x-1" /></button>)}</div></div>}
        {step === 2 && <div><button type="button" onClick={() => setStep(1)} className="mb-4 flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3.5" />Change experience</button><p className="text-sm font-semibold">How would you like to travel?</p><p className="mt-1 text-xs leading-5 text-muted-foreground">We can personalise every route, whichever level of comfort you choose.</p><div className="mt-4 grid gap-2">{(["Luxury", "Mid-range", "A thoughtful mix"] as Style[]).map((item) => <button type="button" key={item} onClick={() => chooseStyle(item)} className="rounded-2xl border bg-white px-4 py-3.5 text-left text-sm font-semibold transition hover:border-gold hover:bg-gold/10">{item}</button>)}</div></div>}
        {step === 3 && <LogisticsStep onBack={() => setStep(2)} onChoose={chooseLogistics} />}
        {step === 4 && selection && <div><div className="flex size-10 items-center justify-center rounded-full bg-jungle text-gold"><Check className="size-5" /></div><p className="mt-4 text-xs font-bold uppercase tracking-[.15em] text-gold">Your starting point</p><h3 className="display mt-1 text-3xl">{selection.recommendation}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{selection.detail}</p><div className="mt-5 rounded-2xl bg-muted p-4 text-xs leading-5"><p className="font-semibold text-foreground">Your brief</p><p className="mt-1 text-muted-foreground">{timing} · {group} · {style}</p></div><a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01]"><Send className="size-4" />Send this to a local expert</a><Link href={selection.href} onClick={close} className="mt-3 flex h-11 items-center justify-center gap-2 rounded-full border text-sm font-semibold transition hover:bg-muted">Explore this journey <ArrowRight className="size-4" /></Link><button type="button" onClick={() => { setStep(1); setFocus(null); setStyle(null); setTiming(null); setGroup(null); }} className="mx-auto mt-4 block text-xs font-semibold text-muted-foreground hover:text-foreground">Start over</button></div>}
      </div>
    </section>}
    <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="safari-concierge" className="flex h-14 items-center gap-2 rounded-full bg-jungle px-5 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.02] hover:bg-primary"><Compass className="size-4 text-gold" />Safari Concierge</button>
  </div>;
}

function LogisticsStep({ onBack, onChoose }: { onBack: () => void; onChoose: (timing: Timing, group: Group) => void }) {
  const [timing, setTiming] = useState<Timing | null>(null);
  const [group, setGroup] = useState<Group | null>(null);
  const canContinue = timing !== null && group !== null;
  return <div><button type="button" onClick={onBack} className="mb-4 flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3.5" />Change travel style</button><p className="text-sm font-semibold">A little practical detail.</p><div className="mt-4"><p className="text-xs font-semibold text-muted-foreground">When would you like to travel?</p><div className="mt-2 grid gap-2">{(["In the next 3 months", "In 3–6 months", "More than 6 months away"] as Timing[]).map((item) => <Choice key={item} active={timing === item} onClick={() => setTiming(item)}>{item}</Choice>)}</div></div><div className="mt-4"><p className="text-xs font-semibold text-muted-foreground">How many travellers?</p><div className="mt-2 grid grid-cols-3 gap-2">{(["1–2 travellers", "3–4 travellers", "5+ travellers"] as Group[]).map((item) => <Choice key={item} active={group === item} onClick={() => setGroup(item)} compact>{item.replace(" travellers", "")}</Choice>)}</div></div><button type="button" disabled={!canContinue} onClick={() => { if (timing && group) onChoose(timing, group); }} className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-jungle text-sm font-semibold text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40">See my starting point <ArrowRight className="size-4 text-gold" /></button></div>;
}

function Choice({ active, onClick, compact = false, children }: { active: boolean; onClick: () => void; compact?: boolean; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} className={`rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition ${compact ? "text-center" : ""} ${active ? "border-jungle bg-jungle text-white" : "bg-white hover:border-gold hover:bg-gold/10"}`}>{children}</button>;
}
