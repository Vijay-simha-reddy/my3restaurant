import Categories from "@/components/Categories";
import FAQ from "@/components/FAQ";
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

export default function Home() {
  return (
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
        <FAQ />
        <Finale />
      </main>
    </>
  );
}
