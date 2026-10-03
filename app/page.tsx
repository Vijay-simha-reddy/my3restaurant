import Categories from "@/components/Categories";
import ComingSoon from "@/components/ComingSoon";
import Finale from "@/components/Finale";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Offer from "@/components/Offer";
import Popular from "@/components/Popular";
import Reviews from "@/components/Reviews";
import Signature from "@/components/Signature";
import Story from "@/components/Story";
import WhatsAppButton from "@/components/WhatsAppButton";
import { isOpenNow } from "@/lib/data";

// Checked per request (not baked in at build time) so the site flips to the full menu on its own once MY3 opens.
export const dynamic = "force-dynamic";

export default function Home() {
  const isOpen = isOpenNow();

  return (
    <>
      <WhatsAppButton />
      {isOpen ? (
        <>
          <Intro />
          <Nav />
          <main>
            <Hero />
            <Marquee />
            <Popular />
            <Categories />
            <Signature />
            <Story />
            <Offer />
            <Reviews />
            <Finale />
          </main>
        </>
      ) : (
        <ComingSoon />
      )}
    </>
  );
}
