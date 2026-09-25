"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ParallaxImage, Reveal, SplitText } from "./Motion";
import { img } from "@/lib/images";

export default function Offer() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText("MY3");
    } catch {
      /* clipboard unavailable, the code is still visible */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="section offer-wrap" id="order">
      <motion.div
        className="offer"
        initial={{ opacity: 0, scale: 0.96, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className="offer-copy">
          <p className="eyebrow light">Weekend special</p>
          <SplitText text="The *MY3 Feast* for four" />
          <p>
            One family-size biryani, two curries, butter naan, raita and four mango lassis. Order Friday to Sunday and save
            ₹500 on the whole spread.
          </p>
          <div className="offer-price"><s>₹1,999</s><strong>₹1,499</strong></div>
          <div className="offer-actions">
            <a href="#menu" className="btn btn-dark">Order the feast <span className="arrow">→</span></a>
            <button className="code" onClick={copy} aria-label="Copy offer code MY3">
              <span>{copied ? "Copied!" : "MY3"}</span>
              <small>extra 20% off first order</small>
            </button>
          </div>
        </div>
        <div className="offer-media">
          <ParallaxImage src={img.curries} alt="A feast of curries and steamed rice served in steel kadais" speed={26} sizes="(max-width: 900px) 90vw, 40vw" />
        </div>
      </motion.div>
      <Reveal><p className="fine">Offer valid on delivery and dine-in. Sample offer for demonstration.</p></Reveal>
    </section>
  );
}
