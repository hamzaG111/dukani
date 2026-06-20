import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { GamificationProvider } from "@/contexts/GamificationContext";
import AchievementToast from "@/components/ui/AchievementToast";

export const metadata: Metadata = {
  title: {
    default: "دُكّاني — مساعدك التجاري الذكي بالدارجة",
    template: "%s | دُكّاني",
  },
  description: "أول نظام تجاري ذكي مصمم للتاجر العربي. يرد بالدارجة المغربية 24/7 ويبيع بدلاً عنك. إعداد في 5 دقائق، بدون خبرة تقنية.",
  keywords: ["دكاني", "chatbot عربي", "مساعد تجاري ذكي", "ذكاء اصطناعي مغربي", "تجارة إلكترونية", "واتساب بوت", "دارجة", "chatbot maroc"],
  authors: [{ name: "دُكّاني" }],
  creator: "دُكّاني",
  metadataBase: new URL("https://dukani.ma"),
  alternates: {
    canonical: "/",
    languages: { "ar": "/", "fr": "/fr", "en": "/en" },
  },
  openGraph: {
    title: "دُكّاني — مساعدك التجاري الذكي",
    description: "يرد على عملائك بالدارجة ويبيع 24/7. 2000+ تاجر مغربي يثق بدُكّاني.",
    locale: "ar_MA",
    type: "website",
    siteName: "دُكّاني",
  },
  twitter: {
    card: "summary_large_image",
    title: "دُكّاني — مساعدك التجاري الذكي",
    description: "يرد على عملائك بالدارجة ويبيع 24/7",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-cairo antialiased">
        <LanguageProvider>
          <GamificationProvider>
            {children}
            <AchievementToast />
          </GamificationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
