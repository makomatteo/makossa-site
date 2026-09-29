import { Jost } from "next/font/google";
import "./globals.css";

// stesso carattere del logo, usato da menu e pagine interne
const jost = Jost({ subsets: ["latin"], weight: ["200", "300", "400"], variable: "--font-jost" });

export const metadata = {
  title: "Makossa",
  description: "Makossa website",
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
