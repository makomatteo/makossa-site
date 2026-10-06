import VideoBlock from "./VideoBlock";
import SiteNav from "../SiteNav";

// Metti qui l'id del video YouTube di Kiss Me (la parte dopo v=).
const KISS_ME_YT = "djlDPdjlDXc";
const KISS_ME_COVER = "https://f4.bcbits.com/img/a3696766799_10.jpg";
const ALBUM_VINYL = "https://f4.bcbits.com/img/0022982559_10.jpg";
const KISS_ME_LINK = "https://www.youtube.com/watch?v=djlDPdjlDXc";

export const metadata = {
  title: "All you need",
  description: "All the official Makossa links: music, video, social and booking.",
  alternates: { canonical: "/all-you-need" },
};

const LISTEN = [
  {
    label: "SoundCloud",
    href: "https://soundcloud.com/mmakossa",
    color: "#ff5500",
    embed:
      "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/mmakossa&color=%23ff5500&visual=true&show_artwork=true&show_comments=true&show_user=true&show_playcount=true&show_teaser=false&sharing=true&buying=false&download=false&hide_related=true",
    embedHeight: 420,
  },
  { label: "Spotify", href: "https://open.spotify.com/artist/0vjcd2Obtoj3k6h5JXsZ05", color: "#1db954" },
  { label: "Apple Music", href: "https://music.apple.com/artist/makossa-it/1501921205", color: "#fa243c" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/makossa___/",
    color: "#e1306c",
    grid: { imgs: ["/bio-live-1.jpg", "/bio-live-2.jpg", "/bio-live-3.jpg"], line: "@makossa___" },
  },
];

const BOOKING = {
  label: "Atom Art",
  href: "https://www.atom.art/representation/makossa",
  color: "#cfcfcf",
};

type Item = {
  label: string;
  href: string;
  color: string;
  embed?: string;
  embedHeight?: number;
  grid?: { imgs: string[]; line: string };
  i?: number;
};

function Banner({ label, href, color, embed, embedHeight = 120, grid, i = 0 }: Item) {
  return (
    <div className="ayn-block" style={{ ["--brand" as string]: color, ["--i" as string]: i }}>
      <a className="ayn-banner" href={href} target="_blank" rel="noreferrer">
        <span className="ayn-dot" />
        <span className="ayn-label">{label}</span>
        <span className="ayn-arrow" aria-hidden="true">↗</span>
        <span className="ayn-line" />
      </a>

      {grid ? (
        <a className="ayn-grid" href={href} target="_blank" rel="noreferrer">
          <span className="ayn-grid-imgs">
            {grid.imgs.map((src) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img key={src} src={src} alt="" />
            ))}
          </span>
          <span className="ayn-grid-foot">
            <span>{grid.line}</span>
            <span aria-hidden="true">↗</span>
          </span>
        </a>
      ) : null}

      {embed ? (
        <div className="ayn-player" style={{ height: `${embedHeight}px` }}>
          <iframe
            src={embed}
            title={`${label} player`}
            loading="lazy"
            allow="autoplay *; encrypted-media *; clipboard-write; fullscreen *"
            style={{ display: "block", width: "100%", height: "100%", border: 0 }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default function AllYouNeed() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        fontFamily: "var(--font-jost), Arial, sans-serif",
      }}
    >
      <SiteNav />

      <div className="ayn-flash" aria-hidden="true" />

      <div className="ayn-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ayn-logo" src="/logo/makossa-logo-white.svg" alt="Makossa" />

        <h2 className="ayn-title cut" style={{ ["--i" as string]: 0 }}>Latest album</h2>
        <nav className="ayn-list">
          <div className="ayn-block" style={{ ["--brand" as string]: "#ffffff" }}>
            <a className="ayn-banner" href="/20-20">
              <span className="ayn-dot" />
              <span className="ayn-label">20/20</span>
              <span className="ayn-arrow" aria-hidden="true">→</span>
              <span className="ayn-line" />
            </a>

            <a className="ayn-album" href="/20-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ALBUM_VINYL} alt="20/20, vinile 140g nero" />
              <span className="ayn-album-foot">
                <span>140g black vinyl · limited 200 · + poster</span>
                <span aria-hidden="true">→</span>
              </span>
            </a>
          </div>
        </nav>

        <h2 className="ayn-title cut" style={{ marginTop: "72px", ["--i" as string]: 0 }}>Video</h2>
        <VideoBlock
          youtubeId={KISS_ME_YT}
          title="Kiss Me"
          fallbackImg={KISS_ME_COVER}
          fallbackHref={KISS_ME_LINK}
        />

        <h2 className="ayn-title cut" style={{ marginTop: "72px", ["--i" as string]: 0 }}>Listen &amp; follow</h2>
        <nav className="ayn-list">
          {LISTEN.map((l, i) => (
            <Banner key={l.label} {...l} i={i} />
          ))}
        </nav>

        <h2 className="ayn-title cut" style={{ marginTop: "72px", ["--i" as string]: 4 }}>Booking</h2>
        <nav className="ayn-list">
          <Banner {...BOOKING} i={4} />
        </nav>
      </div>

      <style>{`

        /* intro a stacchi secchi, stile titoli di testa */
        @keyframes noe-cut {
          0%   { opacity: 0; transform: translateY(6px) scale(1.04); filter: blur(2px); }
          8%   { opacity: 1; transform: none; filter: none;
                 text-shadow: -3px 0 rgba(255,0,60,0.9), 3px 0 rgba(0,180,255,0.9); }
          12%  { opacity: 0; }
          16%  { opacity: 1; text-shadow: -1px 0 rgba(255,0,60,0.6), 1px 0 rgba(0,180,255,0.6); }
          22%  { opacity: 0.15; }
          28%  { opacity: 1; text-shadow: none; }
          100% { opacity: 1; text-shadow: none; }
        }
        @keyframes noe-flash {
          0%, 100% { opacity: 0; }
          2%  { opacity: 0.85; }
          5%  { opacity: 0; }
          7%  { opacity: 0.4; }
          9%  { opacity: 0; }
        }
        .ayn-flash {
          position: fixed;
          inset: 0;
          background: white;
          pointer-events: none;
          z-index: 90;
          opacity: 0;
          animation: noe-flash 2.4s steps(1, end) 1 both;
        }
        .ayn-logo {
          animation: noe-cut 1.1s steps(1, end) both;
        }
        .ayn-banner, .ayn-title.cut {
          animation: noe-cut 0.9s steps(1, end) both;
          animation-delay: calc(0.45s + var(--i, 0) * 0.16s);
        }
        @media (prefers-reduced-motion: reduce) {
          .ayn-logo, .ayn-banner, .ayn-title.cut, .ayn-flash { animation: none; opacity: 1; }
        }

        .ayn-wrap {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 28px 120px;
        }
        .ayn-logo {
          display: block;
          width: min(340px, 74%);
          height: auto;
          margin: 24px auto 88px;
          opacity: 0.94;
        }
        .ayn-title {
          margin: 0 0 6px;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.32);
        }
        .ayn-list { display: block; }

        .ayn-banner {
          position: relative;
          display: flex;
          align-items: center;
          gap: 20px;
          height: 86px;
          padding: 0 4px;
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          transition: color 0.6s cubic-bezier(.2,.7,.2,1), padding 0.6s cubic-bezier(.2,.7,.2,1);
        }
        .ayn-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--brand);
          opacity: 0.45;
          transform: scale(0.9);
          transition: opacity 0.6s, transform 0.6s cubic-bezier(.2,.7,.2,1), box-shadow 0.6s;
        }
        .ayn-label {
          flex: 1;
          font-size: 19px;
          font-weight: 200;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          transition: letter-spacing 0.6s cubic-bezier(.2,.7,.2,1);
        }
        .ayn-arrow {
          font-size: 12px;
          opacity: 0;
          transform: translate(-8px, 4px);
          transition: opacity 0.6s, transform 0.6s cubic-bezier(.2,.7,.2,1);
        }
        .ayn-line {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: rgba(255,255,255,0.1);
        }
        .ayn-line::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1px;
          background: var(--brand);
          transition: width 0.7s cubic-bezier(.2,.7,.2,1);
        }
        .ayn-banner:hover { color: #fff; padding-left: 14px; }
        .ayn-banner:hover .ayn-label { letter-spacing: 0.36em; }
        .ayn-banner:hover .ayn-dot {
          opacity: 1;
          transform: scale(1.1);
          box-shadow: 0 0 14px 2px var(--brand);
        }
        .ayn-banner:hover .ayn-arrow { opacity: 0.85; transform: none; }
        .ayn-banner:hover .ayn-line::after { width: 100%; }

        .ayn-block + .ayn-block { margin-top: 4px; }
        .ayn-player {
          margin: 14px 0 26px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
          overflow: hidden;
          opacity: 0.88;
          transition: opacity 0.5s, border-color 0.5s;
        }
        .ayn-block:hover .ayn-player { opacity: 1; border-color: rgba(255,255,255,0.22); }

        .ayn-video {
          position: relative;
          display: block;
          width: 100%;
          margin: 14px 0 0;
          padding: 0;
          aspect-ratio: 16 / 9;
          border: 1px solid rgba(255,255,255,0.12);
          background: #000;
          overflow: hidden;
          cursor: pointer;
          color: #fff;
          text-decoration: none;
          font: inherit;
        }
        .ayn-video img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.85) brightness(0.78);
          transform: scale(1.02);
          transition: transform 1.1s cubic-bezier(.2,.7,.2,1), filter 0.7s;
        }
        .ayn-video:hover img { transform: scale(1.06); filter: none; }
        .ayn-video-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55));
        }
        .ayn-video-play {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0; height: 0;
          transform: translate(-40%, -50%);
          border-left: 34px solid #fff;
          border-top: 21px solid transparent;
          border-bottom: 21px solid transparent;
          filter: drop-shadow(0 0 24px rgba(0,0,0,0.65));
          transition: transform 0.6s cubic-bezier(.2,.7,.2,1);
        }
        .ayn-video:hover .ayn-video-play { transform: translate(-40%, -50%) scale(1.12); }
        .ayn-video-cap {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: 20px 22px;
          text-align: left;
          font-size: 13px;
          font-weight: 200;
          letter-spacing: 0.34em;
          text-transform: uppercase;
        }
        .ayn-video.is-live { cursor: default; }
        .ayn-video.is-live iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .ayn-album {
          display: block;
          margin: 14px 0 0;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: border-color 0.5s, color 0.5s;
        }
        .ayn-album img {
          display: block;
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          filter: saturate(0.9) brightness(0.9);
          transition: filter 0.6s;
        }
        .ayn-album-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.26em;
          text-transform: uppercase;
        }
        .ayn-album:hover { border-color: #fff; color: #fff; }
        .ayn-album:hover img { filter: none; }

        .ayn-grid {
          display: block;
          margin: 14px 0 26px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: border-color 0.5s, color 0.5s;
        }
        .ayn-grid-imgs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
        }
        .ayn-grid-imgs img {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          display: block;
          filter: grayscale(1);
          opacity: 0.72;
          transition: opacity 0.6s, filter 0.6s;
        }
        .ayn-grid-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.26em;
          text-transform: uppercase;
        }
        .ayn-grid:hover { border-color: var(--brand); color: #fff; }
        .ayn-grid:hover img { opacity: 1; filter: none; }

        @media (max-width: 600px) {
          .ayn-wrap { padding: 32px 22px 96px; }
          .ayn-logo { margin-bottom: 64px; }
          .ayn-banner { height: 70px; gap: 16px; }
          .ayn-label { font-size: 15px; letter-spacing: 0.24em; }
          .ayn-arrow { opacity: 0.5; transform: none; }
        }
      `}</style>
    </main>
  );
}
