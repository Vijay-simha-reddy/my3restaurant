import { marqueeItems } from "@/lib/data";

export default function Marquee() {
  const row = (
    <ul aria-hidden="true">
      {marqueeItems.map((m) => (
        <li key={m}>
          {m} <i>✦</i>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" role="presentation">
      <div className="track">
        {row}
        {row}
      </div>
    </div>
  );
}
