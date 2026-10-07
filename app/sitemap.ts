import type { MetadataRoute } from "next";

const SITE = "https://www.makossa.site";

// foto ufficiali: dichiarate nella sitemap cosi Google Immagini le associa all'artista
const PHOTOS: Record<string, string[]> = {
  "": ["/og.jpg", "/home-poster.jpg"],
  "/bio": ["/makossa-sole.webp", "/bio-live-1.jpg", "/bio-live-2.jpg", "/bio-live-3.jpg"],
  "/music": ["/makossa-campo-hd.jpg"],
  "/all-you-need": ["/bio-live-1.jpg", "/bio-live-2.jpg", "/bio-live-3.jpg"],
};

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/bio", "/music", "/all-you-need", "/shows", "/20-20"].map((p) => ({
    url: `${SITE}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
    images: (PHOTOS[p] ?? []).map((src) => `${SITE}${src}`),
  }));
}
