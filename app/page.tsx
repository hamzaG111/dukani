import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LiveTicker from "@/components/landing/LiveTicker";
import TrustBar from "@/components/landing/TrustBar";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import RoiCalculator from "@/components/landing/RoiCalculator";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import ComparisonTable from "@/components/landing/ComparisonTable";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <LiveTicker />
      <TrustBar />
      <Problem />
      <Solution />
      <RoiCalculator />
      <HowItWorks />
      <Features />
      <ComparisonTable />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
