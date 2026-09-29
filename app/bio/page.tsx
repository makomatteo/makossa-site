import Link from "next/link";

export default function Bio() {
  return (
    <main
      className="bio-page"
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="bio-header"
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

        <div style={{ color: "rgba(255,255,255,0.45)" }}>Bio</div>
      </div>

      <div
        className="bio-hero"
        style={{
          height: "calc(100vh - 84px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 40px 40px",
          boxSizing: "border-box",
        }}
      >
        <div
          className="bio-grid"
          style={{
            width: "100%",
            maxWidth: "1200px",
            display: "grid",
            gridTemplateColumns: "520px 1fr",
            gap: "120px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/makossa-sole.webp"
              alt="Makossa controluce al tramonto"
              className="bio-portrait"
              style={{
                maxWidth: "560px",
                maxHeight: "min(760px, calc(100vh - 140px))",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          <div style={{ maxWidth: "560px" }}>
            <h1 style={{ margin: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo/makossa-logo-white.svg"
                alt="Makossa"
                style={{ display: "block", width: "min(420px, 100%)", height: "auto" }}
              />
            </h1>

            <div
              style={{
                marginTop: "34px",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.78)",
              }}
            >
              <p style={{ marginTop: 0, marginBottom: "18px" }}>
                Makossa is an Italian DJ and producer based in Milan. Shaping
                unique sonic worlds through more than two decades of musical
                exploration and cultural discovery.
              </p>

              <p style={{ marginTop: 0, marginBottom: "18px" }}>
                Drawing from Mediterranean sensibilities and a deep search for
                future sound, his productions carry world music textures into
                hypnotic electronica, held together with quiet authority.
              </p>

              <p style={{ marginTop: 0, marginBottom: "18px" }}>
                Among the early voices of downtempo, his sets move fluidly
                between organic house, deep electronica, and disco-infused
                grooves, from intimate listening sessions to open-air
                gatherings and festivals such as Burning Man.
              </p>

              <p style={{ marginTop: 0 }}>
                Co-founder of Hupupa, co-organizer of M&amp;M Microclubbing in
                Milan, and resident DJ at The Wilde, Makossa continues to
                evolve a musical language where global influences meet Italian
                mastery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* foto a tutto schermo, una per pagina */}
      {[
        { src: "/bio-live-1.jpg", w: 2000, h: 1333, alt: "Makossa live, palco notturno con laser e fuochi" },
        { src: "/bio-live-2.jpg", w: 2000, h: 1333, alt: "Makossa alla consolle durante un set" },
        { src: "/bio-live-3.jpg", w: 1280, h: 1600, alt: "Makossa in consolle, controluce blu tra il fumo" },
      ].map((photo) => (
        <section key={photo.src} className="bio-slide">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.src} width={photo.w} height={photo.h} alt={photo.alt} />
        </section>
      ))}

      <style>{`
        html:has(.bio-page) { scroll-snap-type: y proximity; }
        .bio-header { scroll-snap-align: start; }
        .bio-slide {
          height: 100vh;
          height: 100svh;
          scroll-snap-align: start;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bio-slide img {
          display: block;
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
        }
        @media (max-width: 800px) {
          .bio-hero { height: auto !important; padding: 0 16px 24px !important; }
          .bio-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .bio-portrait { width: 100% !important; max-width: 100% !important; max-height: none !important; }
        }
      `}</style>
    </main>
  );
}