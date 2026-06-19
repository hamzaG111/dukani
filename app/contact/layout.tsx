import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">{children}</div>
      <Footer />
    </div>
  );
}
