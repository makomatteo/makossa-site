import Link from "next/link";

export default function Bio() {
  return (
    <main
      style={{
        height: "100vh",
        overflow: "hidden",
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
              style={{
                maxWidth: "560px",
                maxHeight: "760px",
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
    </main>
  );
}