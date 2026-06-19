import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/onboarding/", "/auth/"],
    },
    sitemap: "https://dukani.ma/sitemap.xml",
  };
}
