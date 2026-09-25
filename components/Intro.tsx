"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import logo from "@/public/images/logo-full.jpg";

/** Short curtain reveal on first load showing the full logo. Never blocks input. */
export default function Intro() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1100);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro"
          aria-hidden="true"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="intro-logo"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <Image src={logo} alt="" priority sizes="(max-width: 600px) 90vw, 600px" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
