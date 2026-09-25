"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useCart } from "./Providers";
import Logo from "./Logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, bump } = useCart();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = [
    ["Menu", "#menu"],
    ["Categories", "#categories"],
    ["Signature", "#signature"],
    ["Story", "#story"],
    ["Reviews", "#reviews"],
  ];

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <header className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="#top" className="brand" aria-label="MY3 home">
          <Logo />
        </a>
        <nav className={`links${open ? " open" : ""}`} aria-label="Primary">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <a href="#order" className="cart" aria-label={`Your order, ${count} items`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 7h12l-1 12H7L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            <motion.span key={bump} className="cart-count" initial={{ scale: bump ? 1.6 : 1 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 15 }}>
              {count}
            </motion.span>
          </a>
          <a href="#order" className="btn btn-sm">Order now</a>
          <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <span /><span />
          </button>
        </div>
      </header>
    </>
  );
}
