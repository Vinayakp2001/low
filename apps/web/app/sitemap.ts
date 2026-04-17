import { MetadataRoute } from "next";
import { getAllServiceSlugs, getAllTeamSlugs, getAllPostSlugs } from "@/lib/sanity/queries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rsathelawfirm.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [serviceSlugs, teamSlugs, postSlugs] = await Promise.all([
    getAllServiceSlugs().catch(() => []),
    getAllTeamSlugs().catch(() => []),
    getAllPostSlugs().catch(() => []),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/insights`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/consultation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((s) => ({
    url: `${SITE_URL}/services/${s.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const teamRoutes: MetadataRoute.Sitemap = teamSlugs.map((s) => ({
    url: `${SITE_URL}/team/${s.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = postSlugs.map((s) => ({
    url: `${SITE_URL}/insights/${s.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...teamRoutes, ...postRoutes];
}
