import Image from "next/image";
import emblem from "@/public/images/logo-emblem.jpg";

/** MY3 emblem: the gold flower mark on its navy tile. */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <span className="logo-mark" style={{ width: size, height: size }} aria-hidden="true">
      <Image src={emblem} alt="" fill sizes={`${size * 2}px`} />
    </span>
  );
}

/** Full lockup: emblem + MY3 wordmark (+ optional tagline). */
export default function Logo({ size = 40, tagline = false }: { size?: number; tagline?: boolean }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo-text">
        <span className="logo-word">
          MY<b>3</b>
        </span>
        {tagline && <small>Family Restaurant</small>}
      </span>
    </span>
  );
}
