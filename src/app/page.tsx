"use client";

import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import EnergyCurve from "@/components/EnergyCurve";
import IngredientsSection from "@/components/IngredientsSection";
import WhyOmnis from "@/components/WhyOmnis";
import HowItWorks from "@/components/sections/HowItWorks";
import BrandStory from "@/components/BrandStory";
import SocialProof from "@/components/SocialProof";
import BundleSection from "@/components/BundleSection";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

/**
 * Story order (Landing Page Masterclass, module 5):
 * Hero → Problem → (the difference) → Solution → Benefits → How it works → Proof → Offer → Objections/FAQ → Final CTA.
 * Every order CTA points to ORDER_HREF (src/config/site.ts).
 */
export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <main>
        <Hero />
        <ProblemSection />
        <EnergyCurve />
        <IngredientsSection />
        <WhyOmnis />
        <HowItWorks />
        {/* <LifestyleSection /> — hidden until the lifestyle photos are relabelled (wrong dosages on the AI labels). See marketing/image-edit-plan.md */}
        <BrandStory />
        <SocialProof />
        <BundleSection />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
