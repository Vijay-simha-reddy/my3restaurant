"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { dishes } from "@/lib/data";
import { Reveal, SplitText } from "./Motion";
import { useCart } from "./Providers";

const Ring = dynamic(() => import("./SignatureRing"), { ssr: false, loading: () => null });

const list = dishes.filter((d) => d.signature);
const AUTO_MS = 2000; // auto-rotate: next dish every 2 seconds
const AUTO_PAUSE_MS = 4000; // pause after a drag / click so it doesn't fight the visitor, then carry on
const ringUrls = list.map((d) => `/images/ring/${d.id}.jpg`);

export default function Signature() {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const pausedUntil = useRef(0); // autoplay waits until this timestamp after the visitor interacts
  const pause = useCallback(() => {
    pausedUntil.current = Date.now() + AUTO_PAUSE_MS;
  }, []);
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "1400px" });
  const live = useInView(ref, { margin: "100px" });
  const reduced = useReducedMotion();
  const { add } = useCart();
  const dish = list[active];

  // Warm the cache while the browser is idle so the 3D ring has its photos (~430 KB) and code before it scrolls into view.
  useEffect(() => {
    const warm = () => {
      void import("./SignatureRing");
      ringUrls.forEach((u) => {
        const im = new window.Image();
        im.src = u;
      });
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(warm);
    else setTimeout(warm, 1200);
  }, []);

  useEffect(() => {
    if (!live || reduced) return;
    const t = setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      setActive((a) => (a + 1) % list.length);
    }, AUTO_MS);
    return () => clearInterval(t);
  }, [live, reduced]);

  const go = (i: number) => {
    pause();
    setActive(((i % list.length) + list.length) % list.length);
  };

  return (
    <section className="signature" id="signature" ref={ref}>
      <div className="section sig-inner">
        <div className="sig-copy">
          <Reveal><p className="eyebrow">Signature food</p></Reveal>
          <SplitText text="Spin the table. *Pick* your plate." />

          <div className="sig-detail" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <span className="sig-tag">{dish.tag} · ★ {dish.rating.toFixed(1)}</span>
                <h3>{dish.name}</h3>
                <p>{dish.desc}</p>
                <div className="sig-buy">
                  <span className="price">₹{dish.price}</span>
                  <button className="btn" onClick={() => add(dish.name)}>Add to order <span className="arrow">+</span></button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="sig-nav">
            <button onClick={() => go(active - 1)} aria-label="Previous dish">←</button>
            <div className="dots">
              {list.map((d, i) => (
                <button key={d.id} className={i === active ? "on" : ""} onClick={() => go(i)} aria-label={d.name} />
              ))}
            </div>
            <button onClick={() => go(active + 1)} aria-label="Next dish">→</button>
          </div>
        </div>

        <div className="sig-stage">
          <div className="sig-glow" aria-hidden="true" />
          {/* Shown until the first 3D photo is ready, so the stage is never empty on slow connections */}
          <div className={`ring-fallback${ready ? " hide" : ""}`} aria-hidden="true">
            <div className="rf-card" key={dish.id}>
              <Image src={dish.image} alt="" fill sizes="300px" placeholder="blur" priority />
            </div>
          </div>
          {seen && (
            <Ring
              urls={ringUrls}
              active={active}
              onChange={setActive}
              onInteract={pause}
              onReady={onReady}
              running={live}
            />
          )}
        </div>
      </div>
    </section>
  );
}
