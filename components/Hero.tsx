"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { SplitText } from "./Motion";
import { img } from "@/lib/images";
import { LogoMark } from "./Logo";

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const cfg = { stiffness: 110, damping: 18 };
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), cfg);
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), cfg);
  const fx1 = useSpring(useTransform(mx, [-0.5, 0.5], [-26, 26]), cfg);
  const fy1 = useSpring(useTransform(my, [-0.5, 0.5], [-18, 18]), cfg);
  const fx2 = useSpring(useTransform(mx, [-0.5, 0.5], [30, -30]), cfg);
  const fy2 = useSpring(useTransform(my, [-0.5, 0.5], [22, -22]), cfg);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}>
          <span className="pulse" /> Family restaurant · Dum-cooked daily
        </motion.p>
        <SplitText as="h1" text="Real food. Real *spice.* Made to be *shared.*" immediate delay={1.05} />
        <motion.p className="lede" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }}>
          Sealed-pot biryani, tandoor-fired kebabs and slow curries, cooked from scratch with hand-ground masalas and delivered piping hot.
        </motion.p>
        <motion.div className="cta" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.65, duration: 0.8 }}>
          <a href="#menu" className="btn">Order your favourites <span className="arrow">→</span></a>
          <a href="#signature" className="btn btn-ghost">Explore signature dishes</a>
        </motion.div>
        <motion.ul className="hero-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9, duration: 0.8 }}>
          <li><strong>4.9★</strong><span>2,400+ reviews</span></li>
          <li><strong>30 min</strong><span>average delivery</span></li>
          <li><strong>100%</strong><span>fresh, no frozen</span></li>
        </motion.ul>
      </div>

      <div className="hero-stage" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="sun" aria-hidden="true" />
        <motion.div className="arch-wrap" style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }} initial={{ opacity: 0, y: 60, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.1, duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}>
          <div className="arch">
            <Image src={img.biryaniPlate} alt="Hyderabadi chicken dum biryani with mint and fried onions" fill priority sizes="(max-width: 900px) 80vw, 40vw" placeholder="blur" />
          </div>
        </motion.div>

        <motion.div className="float f1" style={{ x: fx1, y: fy1 }} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, duration: 0.9, type: "spring" }}>
          <div className="bob"><Image src={img.paneer} alt="Paneer butter masala in a copper kadai" fill sizes="220px" placeholder="blur" /></div>
        </motion.div>
        <motion.div className="float f2" style={{ x: fx2, y: fy2 }} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.7, duration: 0.9, type: "spring" }}>
          <div className="bob bob2"><Image src={img.samosaClose} alt="Crispy samosas with chutney" fill sizes="160px" placeholder="blur" /></div>
        </motion.div>

        <motion.div className="badge-card" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2, duration: 0.8 }}>
          <span className="stars">★★★★★</span>
          <b>Hyderabadi Dum Biryani</b>
          <small>Most ordered this week</small>
        </motion.div>

        <div className="spin-badge" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <defs><path id="c" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
            <text textLength="272" lengthAdjust="spacing"><textPath href="#c">• FAMILY RESTAURANT • DUM-COOKED </textPath></text>
          </svg>
          <LogoMark size={52} />
        </div>
      </div>
    </section>
  );
}
