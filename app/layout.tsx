import { Jost } from "next/font/google";
import "./globals.css";
import SiteFooter, { PROFILES } from "./SiteFooter";

// stesso carattere del logo, usato da menu e pagine interne
const jost = Jost({ subsets: ["latin"], weight: ["200", "300", "400"], variable: "--font-jost" });

const SITE = "https://www.makossa.site";
const DESCRIPTION =
  "Italian DJ and producer based in Milan. World music textures into hypnotic electronica.";

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Makossa (IT) | DJ & Producer, Milan",
    template: "%s | Makossa (IT)",
  },
  description: `Makossa, ${DESCRIPTION}`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Makossa",
    title: "Makossa",
    description: DESCRIPTION,
    url: SITE,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Makossa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Makossa",
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
};

export const viewport = { themeColor: "#000000" };

// dati strutturati: dicono a Google chi e Makossa e quali sono i profili ufficiali
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "@id": `${SITE}/#artist`,
  name: "Makossa",
  alternateName: "Makossa (IT)",
  url: SITE,
  image: `${SITE}/og.jpg`,
  logo: `${SITE}/icon-512.png`,
  description: DESCRIPTION,
  genre: ["Organic House", "Melodic Techno", "Downtempo", "House"],
  foundingLocation: { "@type": "Place", name: "Milan, Italy" },
  sameAs: [
    ...PROFILES.map((p) => p.href),
    "https://www.atom.art/representation/makossa",
    "https://www.wikidata.org/wiki/Q141658510",
    "https://musicbrainz.org/artist/5c7c7a1e-4762-4e0d-b84e-b892e2299008",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jost.variable}>
      <body style={{ margin: 0, background: "black" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
