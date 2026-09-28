import { reviews } from "@/lib/data";
import { Reveal, SplitText } from "./Motion";

function Card({ r }: { r: (typeof reviews)[number] }) {
  return (
    <figure className="review">
      <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
      <blockquote>{r.text}</blockquote>
      <figcaption>
        <span className="avatar" aria-hidden="true">{r.name[0]}</span>
        <span><b>{r.name}</b><small>{r.place}</small></span>
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="section head reviews-head">
        <div>
          <Reveal><p className="eyebrow">Guest experience</p></Reveal>
          <SplitText text="Loved at *every* table" />
        </div>
        <Reveal delay={0.15}>
          <div className="score">
            <strong>4.9</strong>
            <span><i>★★★★★</i>from 2,400+ happy guests</span>
          </div>
        </Reveal>
      </div>
      <div className="review-rail" aria-label="Guest reviews">
        <div className="review-track">
          {[...reviews, ...reviews].map((r, i) => (
            <Card key={i} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
