"use client";

import { Suspense, useCallback, useEffect, useRef, type KeyboardEvent, type RefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image as PhotoPlane } from "@react-three/drei";

const R = 3.4;
const RAD_PER_PX = 0.008; // ~110px of drag per dish

function Photo({ url, onLoaded }: { url: string; onLoaded: () => void }) {
  // Only mounts once the texture has finished loading (PhotoPlane suspends until then).
  useEffect(() => onLoaded(), [onLoaded]);
  return <PhotoPlane url={url} scale={[1.9, 2.5]} radius={0.12} transparent toneMapped={false} />;
}

function Card({ url, i, n, rot, onLoaded }: { url: string; i: number; n: number; rot: RefObject<number>; onLoaded: () => void }) {
  const ref = useRef<THREE.Group>(null);
  const a = (i / n) * Math.PI * 2;
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const f = (Math.cos(a + rot.current) + 1) / 2; // 1 when facing the camera
    g.scale.setScalar(0.74 + 0.36 * f * f);
  });
  return (
    <group ref={ref} position={[Math.sin(a) * R, 0, Math.cos(a) * R]} rotation={[0, a, 0]}>
      {/* each photo has its own boundary so it appears as soon as it is ready */}
      <Suspense fallback={null}>
        <Photo url={url} onLoaded={onLoaded} />
      </Suspense>
    </group>
  );
}

function Ring({
  urls,
  target,
  drag,
  dragging,
  onLoaded,
}: {
  urls: string[];
  target: RefObject<number>;
  drag: RefObject<number>;
  dragging: RefObject<boolean>;
  onLoaded: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const rot = useRef(0);
  const { viewport } = useThree();
  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    // follow the finger tightly while dragging, glide when settling
    rot.current = THREE.MathUtils.damp(rot.current, target.current + drag.current, dragging.current ? 22 : 5, dt);
    g.rotation.y = rot.current;
    g.scale.setScalar(THREE.MathUtils.clamp(viewport.width / 7.5, 0.78, 1));
  });
  return (
    <group ref={group}>
      {urls.map((u, i) => (
        <Card key={u} url={u} i={i} n={urls.length} rot={rot} onLoaded={onLoaded} />
      ))}
    </group>
  );
}

export default function SignatureRing({
  urls,
  active,
  onChange,
  running,
  onInteract,
  onReady,
}: {
  urls: string[];
  active: number;
  onChange: (i: number) => void;
  running: boolean;
  onInteract: () => void;
  onReady: () => void;
}) {
  const n = urls.length;
  const step = (Math.PI * 2) / n;
  const target = useRef(0);
  const drag = useRef(0);
  const dragging = useRef(false);
  const index = useRef(0);
  const gesture = useRef<{ x: number; startX: number; t: number; v: number } | null>(null);
  const readyOnce = useRef(false);

  const handleLoaded = useCallback(() => {
    if (readyOnce.current) return;
    readyOnce.current = true;
    onReady();
  }, [onReady]);

  // external selection (thumbnails / autoplay): rotate the short way round
  useEffect(() => {
    if (active === index.current) return;
    let delta = active - index.current;
    if (delta > n / 2) delta -= n;
    if (delta < -n / 2) delta += n;
    target.current -= delta * step;
    index.current = active;
  }, [active, n, step]);

  const settle = (raw: number) => {
    target.current = -raw * step;
    drag.current = 0;
    const next = ((raw % n) + n) % n;
    index.current = next;
    onChange(next);
  };

  const release = () => {
    const g = gesture.current;
    if (!g) return;
    gesture.current = null;
    dragging.current = false;
    const totalPx = g.x - g.startX;
    const start = Math.round(-target.current / step);
    // project the flick forward a little so quick swipes carry on to the next dish
    const boost = THREE.MathUtils.clamp(g.v * 90 * RAD_PER_PX, -step, step); // at most one extra dish
    const projected = drag.current + boost;
    let raw = Math.round(-(target.current + projected) / step);
    if (raw === start && Math.abs(totalPx) > 24) raw = start + (totalPx < 0 ? 1 : -1);
    settle(raw);
    onInteract(); // restart the auto-rotate pause from the moment the finger lifts
  };

  const nudge = (dir: number) => {
    onInteract();
    settle(Math.round(-target.current / step) + dir);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      nudge(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nudge(1);
    }
  };

  return (
    <div
      className="ring"
      tabIndex={0}
      role="group"
      aria-label="Signature dishes. Drag, or use the left and right arrow keys."
      onKeyDown={onKeyDown}
      onPointerDown={(e) => {
        gesture.current = { x: e.clientX, startX: e.clientX, t: performance.now(), v: 0 };
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        onInteract();
      }}
      onPointerMove={(e) => {
        const g = gesture.current;
        if (!g) return;
        const now = performance.now();
        const dx = e.clientX - g.x;
        g.v = 0.7 * g.v + 0.3 * (dx / Math.max(now - g.t, 1)); // px per ms, smoothed
        g.t = now;
        g.x = e.clientX;
        drag.current += dx * RAD_PER_PX;
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onLostPointerCapture={release}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.4, 12], fov: 30 }}
        frameloop={running ? "always" : "never"}
        gl={{ alpha: true, antialias: true }}
      >
        <Ring urls={urls} target={target} drag={drag} dragging={dragging} onLoaded={handleLoaded} />
      </Canvas>
    </div>
  );
}
