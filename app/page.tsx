import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustBar from "@/components/landing/TrustBar";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TrustBar />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
