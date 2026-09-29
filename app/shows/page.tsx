import SiteNav from "../SiteNav";

export const metadata = { title: "Shows · Makossa" };

const BOOKING = "https://www.atom.art/representation/makossa";

// ------------------------------------------------------------------
// DATE: aggiungi una riga per ogni show. Formato data: "AAAA-MM-GG".
// Le date passate finiscono da sole in "Past", le future in alto.
// tickets e note sono facoltativi.
//
// Esempio:
// { date: "2026-11-14", city: "Milano", country: "IT", venue: "House of Ronin", event: "Microclubbing", tickets: "https://..." },
// ------------------------------------------------------------------
type Show = {
  date: string;
  city: string;
  country: string;
  venue: string;
  event?: string;
  tickets?: string;
  note?: string;
};

const SHOWS: Show[] = [];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { day: String(d).padStart(2, "0"), month: MONTHS[m - 1], year: String(y) };
}

function Row({ s, past }: { s: Show; past?: boolean }) {
  const p = parts(s.date);
  return (
    <li className={past ? "show is-past" : "show"}>
      <div className="show-date">
        <span className="show-day">{p.day}</span>
        <span className="show-my">
          {p.month} {p.year}
        </span>
      </div>
      <div className="show-place">
        <span className="show-city">
          {s.city}, {s.country}
        </span>
        <span className="show-venue">
          {s.venue}
          {s.event ? ` / ${s.event}` : ""}
          {s.note ? ` / ${s.note}` : ""}
        </span>
      </div>
      <div className="show-cta">
        {!past && s.tickets ? (
          <a href={s.tickets} target="_blank" rel="noreferrer">
            Tickets
          </a>
        ) : null}
      </div>
    </li>
  );
}

export default function Shows() {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = SHOWS.filter((s) => s.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = SHOWS.filter((s) => s.date < today).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="shows-page">
      <SiteNav />

      <section className="shows-wrap">
        <h1 className="shows-title">Shows</h1>

        {upcoming.length > 0 ? (
          <ul className="shows-list">
            {upcoming.map((s) => (
              <Row key={s.date + s.venue} s={s} />
            ))}
          </ul>
        ) : (
          <div className="shows-empty">
            <p>New dates coming soon.</p>
            <a href={BOOKING} target="_blank" rel="noreferrer">
              Booking
            </a>
          </div>
        )}

        {past.length > 0 ? (
          <>
            <h2 className="shows-sub">Past</h2>
            <ul className="shows-list">
              {past.map((s) => (
                <Row key={s.date + s.venue} s={s} past />
              ))}
            </ul>
          </>
        ) : null}
      </section>

      <style>{`
        .shows-page {
          min-height: 100vh;
          background: black;
          color: white;
          font-family: var(--font-jost), Arial, sans-serif;
        }
        .shows-wrap {
          max-width: 960px;
          margin: 0 auto;
          padding: 12vh 40px 120px;
          box-sizing: border-box;
        }
        .shows-title, .shows-sub {
          margin: 0 0 56px;
          font-weight: 200;
          font-size: 13px;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
        }
        .shows-sub { margin-top: 96px; color: rgba(255,255,255,0.5); }

        .shows-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid rgba(255,255,255,0.14); }
        .show {
          display: grid;
          grid-template-columns: 150px 1fr auto;
          align-items: center;
          gap: 32px;
          padding: 26px 0;
          border-bottom: 1px solid rgba(255,255,255,0.14);
        }
        .show-date { display: flex; align-items: baseline; gap: 12px; }
        .show-day { font-size: 34px; font-weight: 200; line-height: 1; }
        .show-my, .show-venue, .show-cta a {
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
        }
        .show-place { display: flex; flex-direction: column; gap: 8px; }
        .show-city { font-size: 18px; font-weight: 300; letter-spacing: 0.06em; }
        .show-cta a {
          color: white;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.4);
          padding: 10px 18px;
          transition: background 0.3s, color 0.3s;
        }
        .show-cta a:hover { background: white; color: black; }
        .show.is-past { opacity: 0.45; }

        .shows-empty {
          border-top: 1px solid rgba(255,255,255,0.14);
          border-bottom: 1px solid rgba(255,255,255,0.14);
          padding: 64px 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 28px;
        }
        .shows-empty p {
          margin: 0;
          font-size: 18px;
          font-weight: 300;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.78);
        }
        .shows-empty a {
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          padding-bottom: 4px;
          transition: color 0.4s, border-color 0.4s;
        }
        .shows-empty a:hover { color: white; border-color: white; }

        @media (max-width: 760px) {
          .shows-wrap { padding: 8vh 20px 80px; }
          .show { grid-template-columns: 1fr; gap: 12px; padding: 22px 0; }
          .show-cta a { display: inline-block; margin-top: 6px; }
        }
      `}</style>
    </main>
  );
}
