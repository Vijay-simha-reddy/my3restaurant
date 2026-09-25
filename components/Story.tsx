"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { ParallaxImage, Reveal, SplitText } from "./Motion";
import { img } from "@/lib/images";

function Counter({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: [0.2, 0.7, 0.2, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <div ref={ref} className="stat">
      <strong>{n.toLocaleString()}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}

export default function Story() {
  return (
    <section className="section story" id="story">
      <div className="story-grid">
        <div className="story-copy">
          <Reveal><p className="eyebrow">Our story</p></Reveal>
          <SplitText text="From one *sealed pot* to a kitchen full of fire" />
          <Reveal delay={0.1}>
            <p>
              MY3 is a family restaurant that began with a single copper handi and one rule: never rush the dum. Every biryani is sealed
              with dough and left to steam in its own aroma, the way it has been done for generations.
            </p>
            <p>
              Today our chefs still grind masalas each morning, marinate overnight and grill over live coals. No shortcuts, no frozen
              base gravies, just patient cooking and generous plates.
            </p>
          </Reveal>
          <div className="stats">
            <Counter to={100} suffix="%" label="family run" />
            <Counter to={48} suffix="" label="hand-ground masalas" />
            <Counter to={250} suffix="k" label="plates served" />
          </div>
        </div>

        <div className="story-media">
          <ParallaxImage className="m1" src={img.interior} alt="Warm restaurant dining room with wooden chairs" speed={30} sizes="(max-width: 900px) 90vw, 32vw" />
          <ParallaxImage className="m2" src={img.spices} alt="Whole and ground Indian spices laid out on a table" speed={50} sizes="(max-width: 900px) 60vw, 22vw" />
          <ParallaxImage className="m3" src={img.kebabGrill} alt="Chicken tikka skewers cooking over live coals" speed={40} sizes="(max-width: 900px) 60vw, 22vw" />
        </div>
      </div>
    </section>
  );
}
