import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "دُكّاني — مساعدك التجاري الذكي",
    short_name: "دُكّاني",
    description: "أول نظام تجاري ذكي للتاجر العربي",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#C9A84C",
    orientation: "portrait",
    lang: "ar",
    dir: "rtl",
    categories: ["business", "productivity", "shopping"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
    shortcuts: [
      { name: "المحادثات", short_name: "محادثات", url: "/dashboard/conversations", description: "عرض المحادثات الجديدة" },
      { name: "المنتجات", short_name: "منتجات", url: "/dashboard/products", description: "إدارة المنتجات" },
    ],
  };
}
