"use client";

import { Fragment, useRef, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const ease = [0.2, 0.7, 0.2, 1] as const;

/** Fade + rise into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Masked word-by-word headline reveal. Wrap a word in *asterisks* for the italic accent. */
export function SplitText({
  text,
  as = "h2",
  className,
  delay = 0,
  immediate = false,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  // Observe the heading itself: the words sit clipped inside their masks, so they never count as visible.
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const show = immediate || inView;
  const words = text.split(" ");
  const plain = text.replace(/\*/g, "");
  const children = words.map((w, i) => (
    <Fragment key={i}>
      <span className="mask" aria-hidden="true">
        <motion.span
          className={`word${w.startsWith("*") ? " accent" : ""}`}
          initial={{ y: "115%" }}
          animate={{ y: show ? 0 : "115%" }}
          transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}
        >
          {w.replace(/\*/g, "")}
        </motion.span>
      </span>
      {i < words.length - 1 ? " " : ""}
    </Fragment>
  ));
  if (as === "h1") return <h1 ref={ref} className={className} aria-label={plain}>{children}</h1>;
  if (as === "h3") return <h3 ref={ref} className={className} aria-label={plain}>{children}</h3>;
  return <h2 ref={ref} className={className} aria-label={plain}>{children}</h2>;
}

/** Image that drifts against the scroll inside its frame. */
export function ParallaxImage({
  src,
  alt,
  speed = 40,
  className = "",
  sizes = "(max-width: 900px) 100vw, 50vw",
  priority = false,
}: {
  src: StaticImageData;
  alt: string;
  speed?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  return (
    <div ref={ref} className={`pimg ${className}`}>
      <motion.div className="pimg-in" style={{ y }}>
        <Image src={src} alt={alt} fill sizes={sizes} placeholder="blur" priority={priority} />
      </motion.div>
    </div>
  );
}
