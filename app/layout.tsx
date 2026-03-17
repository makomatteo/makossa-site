import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Makossa",
  description: "Makossa website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "black", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
