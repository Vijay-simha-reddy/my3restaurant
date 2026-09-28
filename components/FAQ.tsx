import { Reveal, SplitText } from "./Motion";
import { faqs } from "@/lib/faq";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FAQ() {
  return (
    <section className="section faq" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="head">
        <div>
          <Reveal><p className="eyebrow">Good to know</p></Reveal>
          <SplitText text="Questions, *answered*" />
        </div>
      </div>
      <Reveal y={40}>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
