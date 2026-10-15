"use client";

import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import WhyOmnis from "@/components/WhyOmnis";
import IngredientsSection from "@/components/IngredientsSection";
import BrandStory from "@/components/BrandStory";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <main>
        <Hero />
        <ProductShowcase />
        <WhyOmnis />
        <IngredientsSection />
        <BrandStory />
        <SocialProof />
        <FAQ />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
