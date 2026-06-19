import Navbar from "@/components/landing/Navbar";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دُكّاني — الأسعار",
  description: "خطط مرنة تناسب كل تاجر. ابدأ مجاناً واترقِّ عندما تكون جاهزاً.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <Pricing />
      </div>
      <Footer />
    </main>
  );
}
