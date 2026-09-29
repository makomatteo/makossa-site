import { Jost } from "next/font/google";
import "./globals.css";

// stesso carattere del logo, usato da menu e pagine interne
const jost = Jost({ subsets: ["latin"], weight: ["200", "300", "400"], variable: "--font-jost" });

export const metadata = {
  metadataBase: new URL("https://www.makossa.site"),
  title: "Makossa",
  description:
    "Makossa, Italian DJ and producer based in Milan. World music textures into hypnotic electronica.",
  openGraph: {
    type: "website",
    siteName: "Makossa",
    title: "Makossa",
    description:
      "Italian DJ and producer based in Milan. World music textures into hypnotic electronica.",
    url: "https://www.makossa.site",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Makossa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Makossa",
    description:
      "Italian DJ and producer based in Milan. World music textures into hypnotic electronica.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jost.variable}>
      <body style={{ margin: 0, background: "black" }}>{children}</body>
    </html>
  );
}
