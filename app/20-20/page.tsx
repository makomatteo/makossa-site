import SiteNav from "../SiteNav";

export const metadata = {
  title: "20/20",
  alternates: { canonical: "/20-20" },
  description: "20/20, album di Makossa uscito il 26 gennaio 2021. Ascolto integrale e acquisto su Bandcamp.",
};

const TRACKS = [
  "Infinitum",
  "Retroland",
  "Alba feat. Marco Mezzavilla",
  "Materiale",
  "Sognando",
  "Tribalismo",
  "1983",
  "Preludio",
];

const BANDCAMP = "https://makossamusica.bandcamp.com/album/20-20";
const COVER = "https://f4.bcbits.com/img/a1088674671_10.jpg";
const PLAYER =
  "https://bandcamp.com/EmbeddedPlayer/album=3197478491/size=large/bgcol=000000/linkcol=ffffff/tracklist=true/transparent=true/";
const VIDEO = "/pizzine-video.mov";

export default function Album2020() {
  return (
    <main className="alb">
      <SiteNav />

      <div className="alb-wrap">
        <section className="alb-hero">
          <div className="alb-art">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={COVER} alt="20/20, copertina dell'album" />
            <a className="alb-video-btn" href="#video">
              <span className="alb-tri" aria-hidden="true" />
              Play video
            </a>
          </div>

          <div className="alb-info">
            <h1>20/20</h1>
            <p className="alb-by">by Makossa</p>
            <p className="alb-meta">Released 26 January 2021 · 8 tracks</p>
            <p className="alb-note">From Tuscany, a hypnotic electronic record to immerse yourself in.</p>
            <a className="alb-cta" href={BANDCAMP} target="_blank" rel="noreferrer">
              <span>Buy digital album</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <ol className="alb-list">
          {TRACKS.map((t, i) => (
            <li key={t}>
              <span className="alb-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="alb-name">{t}</span>
            </li>
          ))}
        </ol>

        <div className="alb-player">
          <iframe
            src={PLAYER}
            title="20/20 su Bandcamp"
            loading="lazy"
            seamless
            style={{ display: "block", width: "100%", height: "100%", border: 0 }}
          />
        </div>

        <p className="alb-credit">
          All rights reserved. Listen and support on{" "}
          <a href={BANDCAMP} target="_blank" rel="noreferrer">
            Bandcamp
          </a>
          .
        </p>
      </div>

      <div className="alb-modal" id="video">
        <a className="alb-modal-bg" href="#" aria-label="Chiudi il video" />
        <div className="alb-modal-box">
          <a className="alb-close" href="#" aria-label="Chiudi">×</a>
          <video controls playsInline preload="none" poster={COVER}>
            <source src={VIDEO} />
          </video>
        </div>
      </div>

      <style>{`
        .alb {
          min-height: 100vh;
          background: #000;
          color: #fff;
          font-family: var(--font-jost), Arial, sans-serif;
        }
        .alb-top {
          display: flex;
          justify-content: space-between;
          padding: 28px 40px;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        .alb-top a { color: rgba(255,255,255,0.7); text-decoration: none; }
        .alb-top a:hover { color: #fff; }
        .alb-top span { color: rgba(255,255,255,0.45); }

        .alb-wrap { max-width: 900px; margin: 0 auto; padding: 32px 24px 120px; }

        .alb-hero {
          display: grid;
          grid-template-columns: minmax(0, 420px) minmax(0, 1fr);
          gap: 44px;
          align-items: start;
        }
        .alb-art { position: relative; }
        .alb-art img {
          display: block;
          width: 100%;
          height: auto;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .alb-video-btn {
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(6px);
          color: #fff;
          text-decoration: none;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          transition: background 0.4s, letter-spacing 0.4s;
        }
        .alb-video-btn:hover { background: rgba(0,0,0,0.9); letter-spacing: 0.4em; }
        .alb-tri {
          width: 0; height: 0;
          border-left: 9px solid #fff;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
        }

        .alb-info h1 {
          margin: 0;
          font-size: clamp(48px, 9vw, 92px);
          font-weight: 200;
          line-height: 0.92;
          letter-spacing: 0.01em;
        }
        .alb-by {
          margin: 14px 0 0;
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
        }
        .alb-meta {
          margin: 10px 0 0;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.42);
        }
        .alb-note {
          margin: 24px 0 0;
          max-width: 42ch;
          font-size: 15px;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255,255,255,0.74);
        }
        .alb-cta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          margin-top: 30px;
          padding: 16px 22px;
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.88);
          text-decoration: none;
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          transition: border-color 0.5s, color 0.5s, letter-spacing 0.5s;
        }
        .alb-cta:hover { border-color: #fff; color: #fff; letter-spacing: 0.36em; }

        .alb-list { list-style: none; margin: 60px 0 0; padding: 0; }
        .alb-list li {
          display: flex;
          align-items: baseline;
          gap: 20px;
          padding: 15px 2px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.75);
          transition: color 0.5s, padding 0.5s cubic-bezier(.2,.7,.2,1);
        }
        .alb-list li:hover { color: #fff; padding-left: 12px; }
        .alb-num { width: 28px; font-size: 10px; letter-spacing: 0.15em; color: rgba(255,255,255,0.4); }
        .alb-name { font-size: 15px; font-weight: 200; letter-spacing: 0.22em; text-transform: uppercase; }

        .alb-player {
          height: 620px;
          margin-top: 56px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.02);
          overflow: hidden;
        }
        .alb-credit {
          margin: 28px 0 0;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }
        .alb-credit a { color: rgba(255,255,255,0.6); }

        /* video in overlay, aperto dal link #video */
        .alb-modal {
          position: fixed;
          inset: 0;
          z-index: 80;
          display: none;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .alb-modal:target { display: flex; }
        .alb-modal-bg { position: absolute; inset: 0; background: rgba(0,0,0,0.92); }
        .alb-modal-box { position: relative; width: min(960px, 100%); }
        .alb-modal-box video { width: 100%; height: auto; display: block; background: #000; }
        .alb-close {
          position: absolute;
          top: -38px;
          right: 0;
          font-size: 24px;
          line-height: 1;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
        }
        .alb-close:hover { color: #fff; }

        @media (max-width: 760px) {
          .alb-top { padding: 22px 20px; }
          .alb-wrap { padding: 24px 20px 96px; }
          .alb-hero { grid-template-columns: 1fr; gap: 28px; }
          .alb-player { height: 540px; }
          .alb-name { font-size: 14px; letter-spacing: 0.18em; }
        }
      `}</style>
    </main>
  );
}
