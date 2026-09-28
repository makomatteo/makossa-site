import Link from "next/link";

export default function Bio() {
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
              src="/makossa-campo.jpg"
              alt="Makossa"
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

            <p
              style={{
                marginTop: "22px",
                marginBottom: "30px",
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              DJ · Producer · Downtempo Voyager
            </p>

            <div
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.78)",
              }}
            >
              <p style={{ marginTop: 0, marginBottom: "18px" }}>
                Makossa is an Italian DJ and producer shaping sonic landscapes
                through more than two decades of musical exploration and
                cultural wandering.
              </p>

              <p style={{ marginTop: 0, marginBottom: "18px" }}>
                Drawing from global rhythms, Mediterranean sensibilities, and a
                deep curiosity for sound, his productions weave tribal
                textures, oriental influences, and hypnotic electronic
                structures.
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

      {/* foto live, sfalsate come in un editoriale */}
      <section className="bio-gallery">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bio-live-1.jpg" alt="Makossa live, palco notturno con laser e fuochi" loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bio-live-2.jpg" alt="Makossa alla consolle durante un set" loading="lazy" />
      </section>

      <style>{`
        .bio-gallery {
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px 40px 120px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 40px;
          align-items: start;
        }
        .bio-gallery img {
          display: block;
          width: 100%;
          aspect-ratio: 3 / 2;
          object-fit: cover;
        }
        .bio-gallery img:nth-child(2) { margin-top: 120px; }
        @media (max-width: 800px) {
          .bio-gallery {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 24px 16px 60px;
          }
          .bio-gallery img:nth-child(2) { margin-top: 0; }
          .bio-hero { height: auto !important; padding: 0 16px 24px !important; }
          .bio-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .bio-portrait { width: 100% !important; max-width: 100% !important; max-height: none !important; }
        }
      `}</style>
    </main>
  );
}