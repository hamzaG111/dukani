import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dukani.ma";
  const now = new Date();

  const staticRoutes = [
    { url: baseUrl,                            priority: 1.0 },
    { url: `${baseUrl}/pricing`,               priority: 0.9 },
    { url: `${baseUrl}/auth/register`,         priority: 0.9 },
    { url: `${baseUrl}/about`,                 priority: 0.8 },
    { url: `${baseUrl}/stores`,                priority: 0.8 },
    { url: `${baseUrl}/blog`,                  priority: 0.8 },
    { url: `${baseUrl}/success-stories`,       priority: 0.8 },
    { url: `${baseUrl}/mobile`,                priority: 0.7 },
    { url: `${baseUrl}/api-docs`,              priority: 0.7 },
    { url: `${baseUrl}/faq`,                   priority: 0.7 },
    { url: `${baseUrl}/partners`,              priority: 0.7 },
    { url: `${baseUrl}/contact`,               priority: 0.7 },
    { url: `${baseUrl}/legal/privacy`,         priority: 0.5 },
    { url: `${baseUrl}/legal/terms`,           priority: 0.5 },
    { url: `${baseUrl}/auth/login`,            priority: 0.6 },
  ];

  return staticRoutes.map((route) => ({
    url: route.url,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));
}
