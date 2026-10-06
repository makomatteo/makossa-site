// profili ufficiali: usati dal footer e dai dati strutturati (sameAs) in layout.tsx
export const PROFILES = [
  { label: "Instagram", href: "https://www.instagram.com/makossa___/" },
  { label: "SoundCloud", href: "https://soundcloud.com/makossa-it" },
  { label: "Spotify", href: "https://open.spotify.com/artist/0vjcd2Obtoj3k6h5JXsZ05" },
  { label: "Apple Music", href: "https://music.apple.com/artist/makossa-it/1501921205" },
  { label: "Bandcamp", href: "https://makossamusica.bandcamp.com" },
  { label: "Facebook", href: "https://www.facebook.com/mmakossa" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav aria-label="Profiles">
        {PROFILES.map((p) => (
          <a key={p.label} href={p.href} target="_blank" rel="me noreferrer">
            {p.label}
          </a>
        ))}
      </nav>

      <style>{`
        .site-footer {
          background: #000;
          padding: 36px 24px 40px;
          font-family: var(--font-jost), Arial, sans-serif;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          scroll-snap-align: end;
        }
        .site-footer nav {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px 28px;
        }
        .site-footer a {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.4s;
        }
        .site-footer a:hover { color: #fff; }
      `}</style>
    </footer>
  );
}
