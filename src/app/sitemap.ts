import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { destinations, site, tours } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap { const paths = ["", "/tours", "/destinations", "/plan", "/about", "/contact", "/blog", "/privacy", "/terms", ...tours.map(({ slug }) => `/tours/${slug}`), ...destinations.map(({ slug }) => `/destinations/${slug}`), ...posts.map(({ slug }) => `/blog/${slug}`)]; return paths.map((path) => ({ url: `${site.url}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : 0.7 })); }
