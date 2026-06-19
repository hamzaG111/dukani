import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "دُكّاني — مساعدك التجاري الذكي",
  description: "أول نظام تجاري ذكي مصمم للتاجر العربي. حوّل كل محادثة إلى فرصة بيع بقوة الذكاء الاصطناعي.",
  keywords: "دكاني, chatbot عربي, مساعد تجاري, ذكاء اصطناعي, تجارة إلكترونية",
  openGraph: {
    title: "دُكّاني — مساعدك التجاري الذكي",
    description: "حوّل كل محادثة إلى فرصة بيع",
    locale: "ar_MA",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
