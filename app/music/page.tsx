"use client";

import { useState } from "react";
import Link from "next/link";

const BANDCAMP = "https://makossamusica.bandcamp.com";

type Release = {
  type: "album" | "track";
  id: string;
  art: string;
  tracks?: number;
  slug: string;
  title: string;
};

// Ordine come nella pagina /music di Bandcamp
const RELEASES: Release[] = [
  { type: "track", id: "2080111983", art: "a3931414872", slug: "ornella-vanoni-tu-si-na-cosa-grande-m-kossa-edit", title: "Ornella Vanoni - Tu si 'na cosa grande (m@kossa edit)" },
  { type: "track", id: "2178985981", art: "a0897276838", slug: "tenor-savana", title: "Tenor Savana" },
  { type: "track", id: "2961986435", art: "a3696766799", slug: "kiss-me", title: "Kiss me" },
  { type: "track", id: "1107613417", art: "a2408059993", slug: "stefan-de-la-barbulesti-esenta-de-smecherie-makossa-feat-anton-iofus-remix", title: "Stefan De La Barbulesti - Esenta de Smecherie (Makossa feat anton_iofus Remix)" },
  { type: "track", id: "3030052990", art: "a0441739984", slug: "lucio-dalla-caruso-makossa-remix", title: "Lucio Dalla - Caruso (Makossa Remix)" },
  { type: "track", id: "674575728", art: "a2723532151", slug: "ai-papi", title: "Ai Papi" },
  { type: "track", id: "3976968786", art: "a0795120922", slug: "gypsy-woman", title: "Gypsy Woman" },
  { type: "track", id: "563628475", art: "a1211452365", slug: "amuri", title: "Amuri" },
  { type: "track", id: "1120500137", art: "a3039216039", slug: "frank", title: "Frank" },
  { type: "album", id: "3197478491", art: "a1088674671", tracks: 8, slug: "20-20", title: "20/20" },
  { type: "track", id: "1688611572", art: "a3716487111", slug: "renato-carosone-maruzzella-m-kossa-edit", title: "Renato Carosone - Maruzzella (m@kossa edit)" },
  { type: "album", id: "1205068418", art: "a0233861681", tracks: 8, slug: "amazon", title: "AMAZON - Bība, m@kossa, Waiyari" },
  { type: "track", id: "1700482782", art: "a3723431881", slug: "dio-come-ti-amo", title: "Dio come ti amo" },
  { type: "track", id: "207880549", art: "a1540798198", slug: "signora", title: "Signora" },
  { type: "track", id: "1626449843", art: "a2877651527", slug: "salerosa", title: "Salerosa" },
  { type: "track", id: "2588503634", art: "a3114355520", slug: "caterina-caselli-luomo-del-paradiso-m-kossa-edit", title: "Caterina Caselli - L'Uomo del Paradiso (m@kossa edit)" },
];

function embedUrl(r: Release) {
  // Player "standard" di Bandcamp con copertina piccola (artwork=none rompe il player degli album),
  // lista brani solo per gli album.
  const tracklist = r.type === "album" ? "true" : "false";
  return `https://bandcamp.com/EmbeddedPlayer/${r.type}=${r.id}/size=large/bgcol=000000/linkcol=ff4b4b/artwork=small/tracklist=${tracklist}/transparent=true/`;
}

function playerHeight(r: Release) {
  return r.type === "album" ? 120 + (r.tracks ?? 1) * 33 + 22 : 120;
}

function cover(r: Release, size: 2 | 10 | 16 = 10) {
  return `https://f4.bcbits.com/img/${r.art}_${size}.jpg`;
}

export default function Music() {
  const [current, setCurrent] = useState(0);
  const release = RELEASES[current];
  const releaseUrl = `${BANDCAMP}/${release.type}/${release.slug}`;

  const select = (i: number) => {
    setCurrent(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "28px 40px",
          fontSize: "11px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
        }}
      >
        <Link
          href="/"
          style={{
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
          }}
        >
          Back
        </Link>

        <div style={{ color: "rgba(255,255,255,0.45)" }}>Music</div>
      </div>

      <div className="music-wrap">
        {/* banner del profilo Bandcamp */}
        <a className="hero" href={BANDCAMP} target="_blank" rel="noreferrer">
          <picture>
            <source srcSet="https://f4.bcbits.com/img/0047226613_102.avif" type="image/avif" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://f4.bcbits.com/img/0047226613_100.png" alt="Makossa" width={975} height={180} />
          </picture>
        </a>

        {/* uscita selezionata, impaginata come una pagina album di Bandcamp */}
        <section className="release">
          <div className="release-info">
            <h1>{release.title}</h1>
            <div className="by">
              by <a href={BANDCAMP} target="_blank" rel="noreferrer">Makossa</a>
            </div>

            <iframe
              key={release.id}
              title={release.title}
              src={embedUrl(release)}
              seamless
              style={{
                border: 0,
                width: "100%",
                height: `${playerHeight(release)}px`,
                display: "block",
              }}
            />

            <div className="release-actions">
              <a href={releaseUrl} target="_blank" rel="noreferrer">
                {release.type === "album" ? "Buy Digital Album" : "Buy Digital Track"} ↗
              </a>
              <div className="prev-next">
                <button onClick={() => select((current - 1 + RELEASES.length) % RELEASES.length)}>
                  ← Prev
                </button>
                <button onClick={() => select((current + 1) % RELEASES.length)}>Next →</button>
              </div>
            </div>
          </div>

          <a className="release-art" href={releaseUrl} target="_blank" rel="noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover(release, 16)} alt={release.title} />
          </a>
        </section>

        {/* discografia, a griglia come la pagina /music di Bandcamp */}
        <ol className="grid">
          {RELEASES.map((r, i) => (
            <li key={r.id}>
              <button onClick={() => select(i)} className={i === current ? "active" : undefined}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cover(r)} alt="" loading="lazy" />
                <span className="grid-title">{r.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .music-wrap {
          max-width: 975px;
          margin: 0 auto;
          padding: 10px 40px 80px;
        }
        .hero {
          display: block;
          margin-bottom: 48px;
        }
        .hero img {
          display: block;
          width: 100%;
          height: auto;
        }
        .release {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 48px;
          align-items: start;
          padding-bottom: 56px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .release h1 {
          margin: 0 0 6px;
          font-size: 24px;
          font-weight: normal;
          line-height: 1.25;
        }
        .release .by {
          margin-bottom: 24px;
          font-size: 14px;
          color: rgba(255,255,255,0.55);
        }
        .release .by a { color: #ff4b4b; text-decoration: none; }
        .release-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 20px;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        .release-actions a {
          color: #ff4b4b;
          text-decoration: none;
          font-weight: bold;
        }
        .prev-next { display: flex; gap: 24px; }
        .prev-next button {
          background: none;
          border: 0;
          padding: 0;
          color: rgba(255,255,255,0.7);
          font: inherit;
          cursor: pointer;
        }
        .prev-next button:hover { color: white; }
        .release-art img {
          display: block;
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
        }
        .grid {
          list-style: none;
          margin: 0;
          padding: 48px 0 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 36px 24px;
        }
        .grid button {
          display: block;
          width: 100%;
          padding: 0;
          background: none;
          border: 0;
          color: rgba(255,255,255,0.75);
          font: inherit;
          text-align: left;
          cursor: pointer;
        }
        .grid img {
          display: block;
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          margin-bottom: 10px;
          outline: 2px solid transparent;
          outline-offset: 3px;
          transition: opacity 0.2s, outline-color 0.2s;
        }
        .grid button:hover img { opacity: 0.8; }
        .grid button.active img { outline-color: #ff4b4b; }
        .grid button.active .grid-title { color: #ff4b4b; }
        .grid-title {
          display: block;
          font-size: 13px;
          font-weight: bold;
          line-height: 1.35;
        }
        @media (max-width: 800px) {
          .music-wrap { padding: 0 16px 60px; }
          .hero { margin: 0 -16px 28px; }
          .release {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .release-art { order: -1; }
          .grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px 16px;
          }
        }
      `}</style>
    </main>
  );
}
