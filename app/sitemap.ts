import type { MetadataRoute } from "next";
import { publishedCases } from "@/content/cases";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: site.url }, ...publishedCases.map((item) => ({ url: `${site.url}/projetos/${item.slug}` }))]; }
