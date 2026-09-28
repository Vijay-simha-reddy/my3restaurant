"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "./Logo";
import { img } from "@/lib/images";
import { OPENING_AT } from "@/lib/data";

const MAPS = "https://www.google.com/maps/search/?api=1&query=MY3+Family+Restaurant+Gajwel";

function msLeft() {
  return Math.max(0, new Date(OPENING_AT).getTime() - Date.now());
}

function useCountdown() {
  const [ms, setMs] = useState(msLeft);
  useEffect(() => {
    const t = setInterval(() => setMs(msLeft()), 1000);
    return () => clearInterval(t);
  }, []);
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Pre-launch page shown until MY3 opens. `app/page.tsx` swaps this out for the full site once OPENING_AT passes. */
export default function ComingSoon() {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <main className="soon">
      <div className="soon-bg" aria-hidden="true">
        <Image src={img.diningHall} alt="" fill priority sizes="100vw" placeholder="blur" />
        <span className="soon-shade" />
      </div>

      <div className="soon-in">
        <Logo size={52} tagline />

        <p className="eyebrow light"><span className="pulse" /> Opening in Gajwel</p>
        <h1>The ovens are lit.<br />Doors open Oct 14, 2026.</h1>
        <p className="soon-time">Grand opening at 9:00 am</p>

        <div className="soon-count" aria-live="polite">
          <div><strong suppressHydrationWarning>{days}</strong><span>days</span></div>
          <div><strong suppressHydrationWarning>{pad(hours)}</strong><span>hrs</span></div>
          <div><strong suppressHydrationWarning>{pad(minutes)}</strong><span>min</span></div>
          <div><strong suppressHydrationWarning>{pad(seconds)}</strong><span>sec</span></div>
        </div>

        <div className="soon-actions">
          <a className="btn" href="tel:+919010001484">Call +919010001484</a>
          <a className="btn btn-ghost" href={MAPS} target="_blank" rel="noopener noreferrer">Get directions ↗</a>
        </div>
        <p className="soon-addr">Beside St. Joseph&apos;s School, Pregnapur Road, Gajwel</p>
      </div>
    </main>
  );
}
