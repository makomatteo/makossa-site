import type { MetadataRoute } from "next";

const SITE = "https://www.makossa.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/bio", "/music", "/all-you-need", "/shows", "/20-20"].map((p) => ({
    url: `${SITE}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
