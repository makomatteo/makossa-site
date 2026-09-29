"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Bio", href: "/bio" },
  { label: "Music", href: "/music" },
  { label: "All you need", href: "/all-you-need" },
  { label: "Shows", href: "/shows" },
  { label: "Booking", href: "https://www.atom.art/representation/makossa", external: true },
];

export default function SiteNav() {
  const path = usePathname();

  const item = (l: (typeof LINKS)[number]) =>
    l.external ? (
      <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
        {l.label}
      </a>
    ) : (
      <Link key={l.label} href={l.href} className={path === l.href ? "is-current" : undefined}>
        {l.label}
      </Link>
    );

  return (
    <div className="nav">
      <Link className="nav-home" href="/" aria-label="Home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/makossa-logo-white.svg" alt="Makossa" />
      </Link>

      <nav className="nav-links">{LINKS.map(item)}</nav>

      <details className="nav-drop">
        <summary>Menu</summary>
        <div className="nav-drop-list">
          <Link href="/">Home</Link>
          {LINKS.map(item)}
        </div>
      </details>

      <style>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 70;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 20px 40px;
          background: linear-gradient(180deg, rgba(0,0,0,0.85), rgba(0,0,0,0));
          font-family: var(--font-jost), Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        .nav-home img { display: block; width: 116px; height: auto; opacity: 0.9; }
        .nav-home:hover img { opacity: 1; }

        .nav-links { display: flex; gap: 28px; }
        .nav a, .nav-drop-list a {
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          transition: color 0.4s;
        }
        .nav a:hover, .nav-drop-list a:hover { color: #fff; }
        .nav a.is-current { color: #fff; }

        .nav-drop { display: none; position: relative; }
        .nav-drop summary {
          list-style: none;
          cursor: pointer;
          color: rgba(255,255,255,0.8);
        }
        .nav-drop summary::-webkit-details-marker { display: none; }
        .nav-drop summary::after { content: " ↓"; }
        .nav-drop[open] summary::after { content: " ↑"; }
        .nav-drop-list {
          position: absolute;
          right: 0;
          top: 26px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 20px 22px;
          min-width: 180px;
          background: rgba(0,0,0,0.94);
          border: 1px solid rgba(255,255,255,0.14);
        }

        @media (max-width: 760px) {
          .nav { padding: 16px 20px; }
          .nav-home img { width: 96px; }
          .nav-links { display: none; }
          .nav-drop { display: block; }
        }
      `}</style>
    </div>
  );
}
