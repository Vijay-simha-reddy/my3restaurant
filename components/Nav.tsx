"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import Logo from "./Logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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
          <Link href="/order" className="links-order" onClick={() => setOpen(false)}>Order now</Link>
        </nav>
        <div className="nav-actions">
          <Link href="/order" className="btn btn-sm">Order now</Link>
          <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <span /><span />
          </button>
        </div>
      </header>
    </>
  );
}
