"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { ReactLenis } from "lenis/react";

type CartCtx = { count: number; bump: number; add: (name: string) => void };
const Cart = createContext<CartCtx>({ count: 0, bump: 0, add: () => {} });
export const useCart = () => useContext(Cart);

export default function Providers({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [bump, setBump] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const add = useCallback((name: string) => {
    setCount((c) => c + 1);
    setBump((b) => b + 1);
    setToast(name);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const body = (
    <MotionConfig reducedMotion="user">
      <Cart.Provider value={{ count, bump, add }}>
        {children}
        <div className="toast-zone" aria-live="polite">
          <AnimatePresence>
            {toast && (
              <motion.div
                key={toast}
                className="toast"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                <span className="dot" /> {toast} added to your order
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Cart.Provider>
    </MotionConfig>
  );

  if (reduced) return body;
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, anchors: true }}>
      {body}
    </ReactLenis>
  );
}
