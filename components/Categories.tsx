"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { categories, dishes } from "@/lib/data";
import { Reveal, SplitText } from "./Motion";

export default function Categories() {
  const [active, setActive] = useState(0);

  return (
    <section className="section cats-section" id="categories">
      <div className="head">
        <div>
          <Reveal><p className="eyebrow">Explore the menu</p></Reveal>
          <SplitText text="Seven ways to *feast*" />
        </div>
        <Reveal delay={0.15}>
          <p className="head-note">Hover or tap a category. From sealed-pot biryani to a cold mango lassi, every course has its own story.</p>
        </Reveal>
      </div>

      <Reveal y={50}>
        <div className="cats">
          {categories.map((c, i) => {
            const count = dishes.filter((d) => d.cats.includes(c.id)).length;
            return (
              <button
                key={c.id}
                className={`cat${active === i ? " active" : ""}`}
                style={{ "--c": c.color } as CSSProperties}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
              >
                <Image src={c.image} alt="" fill sizes="(max-width: 900px) 75vw, 40vw" placeholder="blur" loading="lazy" />
                <span className="cat-shade" />
                <span className="cat-num">0{i + 1}</span>
                <span className="cat-name">{c.name}</span>
                <span className="cat-info">
                  <b>{c.name}</b>
                  <small>{c.blurb}</small>
                  <em>{count} dishes →</em>
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
