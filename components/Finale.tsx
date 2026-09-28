import Image from "next/image";
import { Reveal, SplitText } from "./Motion";
import { img } from "@/lib/images";
import Logo from "./Logo";

const MAPS = "https://www.google.com/maps/search/?api=1&query=MY3+Family+Restaurant+Gajwel";

export default function Finale() {
  return (
    <>
      <section className="section finale" id="visit">
        <div className="cta-photos" aria-hidden="true">
          <div className="cp a"><Image src={img.biryaniPot} alt="" fill sizes="220px" placeholder="blur" loading="lazy" /></div>
          <div className="cp b"><Image src={img.butterChicken} alt="" fill sizes="220px" placeholder="blur" loading="lazy" /></div>
          <div className="cp c"><Image src={img.lassi} alt="" fill sizes="220px" placeholder="blur" loading="lazy" /></div>
          <div className="cp d"><Image src={img.mithai} alt="" fill sizes="220px" placeholder="blur" loading="lazy" /></div>
        </div>
        <Reveal><p className="eyebrow">Ready when you are</p></Reveal>
        <SplitText as="h2" text="Hungry *yet?*" className="cta-title" />
        <Reveal delay={0.15}>
          <p className="cta-text">Order in two taps, or book a table and let us take care of the rest.</p>
          <div className="cta">
            <a href="#menu" className="btn">Order online <span className="arrow">→</span></a>
            <a href="tel:+919010001484" className="btn btn-ghost">Reserve a table</a>
          </div>
          <a className="place" href={MAPS} target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
            Beside St. Joseph&apos;s School, Pregnapur Road, Gajwel
          </a>
        </Reveal>
      </section>

      <footer className="footer">
        <div className="foot-grid">
          <div>
            <a href="#top" className="brand" aria-label="MY3 home"><Logo size={44} tagline /></a>
            <p>A family restaurant in Gajwel. Sealed-pot biryani, live-grill kebabs and slow curries.</p>
          </div>
          <div>
            <h4>Visit</h4>
            <p>Beside St. Joseph&apos;s School,<br />Pregnapur Road, Gajwel<br />Open daily 11:30 am – 12 am</p><p><a className="dir" href={MAPS} target="_blank" rel="noopener noreferrer">Get directions ↗</a></p>
          </div>
          <div>
            <h4>Contact</h4>
            <p><a className="dir" href="tel:+919010001484">+91 90100 01484</a><br /><a className="dir" href="tel:+917842793473">+91 78427 93473</a><br />Call to order or reserve a table</p>
          </div>
          <div>
            <h4>Explore</h4>
            <p><a href="#menu">Menu</a> · <a href="#categories">Categories</a><br /><a href="#story">Our story</a> · <a href="#reviews">Reviews</a></p>
          </div>
        </div>
        <div className="foot-base">
          <span>© {new Date().getFullYear()} MY3. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
