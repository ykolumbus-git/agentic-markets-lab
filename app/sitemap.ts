import type { MetadataRoute } from "next";
import { siteUrl, themes } from "./content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/research", "/people", "/about", "/join"];
  const researchRoutes = themes.map((theme) => `/research/${theme.slug}`);

  return [...routes, ...researchRoutes].map((route) => ({
    url: `${siteUrl}${route}/`,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route === "/join" ? 0.9 : 0.7,
  }));
}
