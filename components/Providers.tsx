"use client";

import type { ReactNode } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { ReactLenis } from "lenis/react";

export default function Providers({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const body = <MotionConfig reducedMotion="user">{children}</MotionConfig>;

  if (reduced) return body;
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, anchors: true }}>
      {body}
    </ReactLenis>
  );
}
