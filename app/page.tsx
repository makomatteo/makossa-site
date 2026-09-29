"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function GinTonicCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="gt-cursor"
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        pointerEvents: "none",
        zIndex: 60,
      }}
    >
      {/* la punta della cannuccia sta esattamente sul puntatore */}
      <svg width="52" height="72" viewBox="0 0 52 72" fill="none" aria-hidden="true">
        <defs>
          <clipPath id="gt-glass">
            <path d="M15 26 H37 L34.5 63 Q34.3 66 31.5 66 H20.5 Q17.7 66 17.5 63 Z" />
          </clipPath>
        </defs>

        {/* cannuccia */}
        <line x1="2" y1="2" x2="27" y2="40" stroke="#ff4b4b" strokeWidth="3.2" strokeLinecap="round" />
        <line x1="2" y1="2" x2="27" y2="40" stroke="rgba(255,255,255,0.55)" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="3 5" />

        {/* liquido */}
        <g clipPath="url(#gt-glass)">
          <rect x="14" y="31" width="24" height="36" fill="rgba(186,228,242,0.38)" />
          <circle cx="22" cy="55" r="1.5" className="gt-b1" fill="rgba(255,255,255,0.85)" />
          <circle cx="28" cy="58" r="1.1" className="gt-b2" fill="rgba(255,255,255,0.75)" />
          <circle cx="25" cy="61" r="0.9" className="gt-b3" fill="rgba(255,255,255,0.7)" />
          {/* ghiaccio */}
          <rect x="19" y="34" width="9" height="9" rx="1.5" transform="rotate(-14 23.5 38.5)" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" />
          <rect x="26" y="43" width="8" height="8" rx="1.5" transform="rotate(20 30 47)" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        </g>

        {/* lime sul bordo */}
        <path d="M37 26 a6 6 0 0 1 -6 6 v-6 z" fill="rgba(160,214,90,0.9)" />
        <path d="M37 26 a6 6 0 0 1 -6 6" stroke="rgba(230,255,190,0.9)" strokeWidth="0.9" fill="none" />

        {/* bicchiere */}
        <path
          d="M15 26 H37 L34.5 63 Q34.3 66 31.5 66 H20.5 Q17.7 66 17.5 63 Z"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
          fill="rgba(255,255,255,0.05)"
        />
        <line x1="15" y1="26" x2="37" y2="26" stroke="rgba(255,255,255,0.95)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>

      <style>{`
        .gt-cursor svg { filter: drop-shadow(0 4px 10px rgba(0,0,0,0.55)); }
        @keyframes gt-bubble {
          0% { transform: translateY(0); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(-22px); opacity: 0; }
        }
        .gt-b1 { animation: gt-bubble 2.4s linear infinite; }
        .gt-b2 { animation: gt-bubble 3.1s linear infinite 0.6s; }
        .gt-b3 { animation: gt-bubble 2.7s linear infinite 1.2s; }
        @media (prefers-reduced-motion: reduce) {
          .gt-b1, .gt-b2, .gt-b3 { animation: none; }
        }
      `}</style>
    </div>
  );
}

function SongPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.7;

    // I browser bloccano l'autoplay con audio: se viene bloccato,
    // la canzone parte alla prima interazione con la pagina.
    const start = () => {
      audio.play().catch(() => {});
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
    audio.play().catch(() => {
      window.addEventListener("pointerdown", start);
      window.addEventListener("keydown", start);
    });

    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  const changeVolume = (v: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = v;
    audio.muted = v === 0;
    setVolume(v);
    setMuted(v === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    audio.muted = next;
    if (!next && audio.volume === 0) {
      audio.volume = 0.7;
      setVolume(0.7);
    }
    setMuted(next);
  };

  const btn: React.CSSProperties = {
    background: "none",
    border: 0,
    padding: 0,
    color: "white",
    font: "inherit",
    letterSpacing: "inherit",
    textTransform: "inherit",
    cursor: "none",
  };

  return (
    <div
      // evita che i click sui controlli facciano partire la riproduzione due volte
      onPointerDown={(e) => e.stopPropagation()}
      className="song-player"
      style={{
        position: "absolute",
        right: "40px",
        bottom: "16px",
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        gap: "18px",
        padding: "12px 18px",
        background: "rgba(0,0,0,0.45)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(8px)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        fontSize: "10px",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
      }}
    >
      <audio
        ref={audioRef}
        src="/salerosa.m4a"
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <button onClick={toggle} style={{ ...btn, width: "44px", textAlign: "left" }} aria-label={playing ? "Pausa" : "Play"}>
        {playing ? "❚❚" : "▶"}
      </button>

      <span className="song-title" style={{ color: "rgba(255,255,255,0.75)", whiteSpace: "nowrap" }}>
        Salerosa
      </span>

      <button onClick={toggleMute} style={{ ...btn, width: "42px" }} aria-label={muted ? "Attiva audio" : "Disattiva audio"}>
        {muted ? "Off" : "On"}
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={muted ? 0 : volume}
        onChange={(e) => changeVolume(Number(e.target.value))}
        aria-label="Volume"
        style={{ width: "90px", accentColor: "#ff4b4b", cursor: "none" }}
      />

      <style>{`
        @media (max-width: 700px) {
          .song-player { left: 16px; right: 16px !important; justify-content: space-between; }
          .song-title { display: none; }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  return (
    <main
      style={{
        height: "100vh",
        background: "black",
        overflow: "hidden",
        cursor: "none",
        position: "relative",
      }}
    >
      <GinTonicCursor />

      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/pizzine-video.mov" type="video/mp4" />
      </video>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
        }}
      />

      <header
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "32px 40px",
          }}
        >
          <nav
            style={{
              display: "flex",
              gap: "30px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontSize: "12px",
            }}
          >
            <Link href="/bio" style={{ color: "white", textDecoration: "none" }}>
              Bio
            </Link>
            <Link href="/music" style={{ color: "white", textDecoration: "none" }}>
              Music
            </Link>
            <Link href="/all-you-need" style={{ color: "white", textDecoration: "none" }}>
              All you need
            </Link>
            <a
              href="https://www.atom.art/representation/makossa"
              target="_blank"
              rel="noreferrer"
              style={{ color: "white", textDecoration: "none" }}
            >
              Booking
            </a>
          </nav>
        </div>
      </header>

      <div
        className="home-mark"
        style={{
          ["--ghost-img" as string]: "url(/logo/makossa-logo-white.svg)",
          position: "absolute",
          top: "50%",
          left: "50%",
          // centra la parola MAKOSSA, non l'intero logo: l'"IT" in esponente
          // occupa il 6.9% della larghezza e resta fuori dal centro
          transform: "translate(-46.56%, -50%)",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1 style={{ margin: 0 }} className="home-title">
          <svg
            viewBox="54 -10 7745 720"
            role="img"
            aria-label="Makossa"
            style={{ display: "block", width: "min(640px, 84vw)", height: "auto", fill: "#000" }}
          >
            <path d="M152.3 84.3 412.1 606.7 671.9 84.3 737.3 700H770L692.1 -20.9L412.1 540.5L132.1 -20.9L54.1 700H86.8Z" />
            <path d="M1458.3 446.2H1809.2L1800.4 415.7H1467.1ZM1632.8 54.8 1784.6 428.7 1787.7 436.7 1893.2 700H1929.5L1632.8 -20.9L1336.1 700H1372.4L1479.2 434.9L1482.3 426.8Z" />
            <path d="M2525.5 0V700H2558.2V0ZM2859.4 0 2549.2 328.6 2873.7 700H2916.5L2590 328L2901.5 0Z" />
            <path className="home-moon" d="M3763.8 -9.1A360.0 360.0 0 1 1 3763.8 709.1A360.0 360.0 0 0 0 3763.8 -9.1Z" />
            <path d="M4725.3 505 4697.6 520.6Q4710 570.8 4737 613.8Q4763.9 656.8 4808.2 682.7Q4852.4 708.6 4915.1 708.6Q4959.2 708.6 4994.9 694.9Q5030.6 681.3 5056.1 656.7Q5081.7 632.1 5095.6 598.3Q5109.6 564.5 5109.6 524.1Q5109.6 479 5094.4 446.2Q5079.1 413.5 5054 390.1Q5029 366.6 4998.3 350.6Q4967.7 334.6 4937.5 323.2Q4885 303.6 4845.3 280.7Q4805.5 257.8 4783.5 226.6Q4761.4 195.4 4761.4 150.1Q4761.4 92.1 4799.8 57.9Q4838.1 23.7 4902.9 23.7Q4951.7 23.7 4984.8 41.8Q5017.9 59.9 5038.6 87Q5059.3 114.1 5069.5 141.5L5098.7 126.4Q5087.3 95.1 5062.3 64Q5037.2 33 4998.2 12.2Q4959.3 -8.6 4904.4 -8.6Q4853.2 -8.6 4813.2 11.4Q4773.2 31.3 4750.4 67.8Q4727.5 104.2 4727.5 153.3Q4727.5 195.7 4743.9 226.9Q4760.3 258.1 4787.5 280.6Q4814.8 303.1 4847.8 319.8Q4880.9 336.4 4913.9 348.9Q4953.9 363.6 4991.2 385Q5028.5 406.4 5052.2 440.1Q5076 473.7 5076 527.1Q5076 592 5033.9 634.7Q4991.8 677.3 4916 677.3Q4858.4 677.3 4820.1 653.3Q4781.8 629.3 4759.2 589.9Q4736.6 550.5 4725.3 505Z" />
            <path d="M5731.3 505 5703.6 520.6Q5716 570.8 5743 613.8Q5769.9 656.8 5814.2 682.7Q5858.4 708.6 5921.1 708.6Q5965.2 708.6 6000.9 694.9Q6036.6 681.3 6062.1 656.7Q6087.7 632.1 6101.6 598.3Q6115.6 564.5 6115.6 524.1Q6115.6 479 6100.4 446.2Q6085.1 413.5 6060 390.1Q6035 366.6 6004.3 350.6Q5973.7 334.6 5943.5 323.2Q5891 303.6 5851.3 280.7Q5811.5 257.8 5789.5 226.6Q5767.4 195.4 5767.4 150.1Q5767.4 92.1 5805.8 57.9Q5844.1 23.7 5908.9 23.7Q5957.7 23.7 5990.8 41.8Q6023.9 59.9 6044.6 87Q6065.3 114.1 6075.5 141.5L6104.7 126.4Q6093.3 95.1 6068.3 64Q6043.2 33 6004.2 12.2Q5965.3 -8.6 5910.4 -8.6Q5859.2 -8.6 5819.2 11.4Q5779.2 31.3 5756.4 67.8Q5733.5 104.2 5733.5 153.3Q5733.5 195.7 5749.9 226.9Q5766.3 258.1 5793.5 280.6Q5820.8 303.1 5853.8 319.8Q5886.9 336.4 5919.9 348.9Q5959.9 363.6 5997.2 385Q6034.5 406.4 6058.2 440.1Q6082 473.7 6082 527.1Q6082 592 6039.9 634.7Q5997.8 677.3 5922 677.3Q5864.4 677.3 5826.1 653.3Q5787.8 629.3 5765.2 589.9Q5742.6 550.5 5731.3 505Z" />
            <path d="M6795.3 446.2H7146.2L7137.4 415.7H6804.1ZM6969.8 54.8 7121.6 428.7 7124.7 436.7 7230.2 700H7266.5L6969.8 -20.9L6673.1 700H6709.4L6816.2 434.9L6819.3 426.8Z" />
            <path d="M7518 0V183.4H7532.4V0Z" />
            <path d="M7688.6 13.7H7736.8V183.4H7751.3V13.7H7799.5V0H7688.6Z" />
          </svg>
        </h1>

        <style>{`
          /* intro a stacchi secchi sulla scritta MAKOSSA */
          @keyframes makossa-cut {
            0%   { opacity: 0; transform: scale(1.14); filter: blur(6px); }
            6%   { opacity: 1; transform: scale(1.06); filter: blur(0); }
            10%  { opacity: 0; }
            16%  { opacity: 1; transform: scale(1.03) translateX(-4px); }
            20%  { opacity: 0; }
            26%  { opacity: 1; transform: scale(1.01) translateX(3px); }
            32%  { opacity: 0.1; }
            40%  { opacity: 1; transform: none; }
            100% { opacity: 1; transform: none; }
          }
          @keyframes makossa-ghost {
            0%, 34% { opacity: 0; }
            40% { opacity: 0.55; transform: translateX(-10px); }
            60% { opacity: 0.25; transform: translateX(-3px); }
            100% { opacity: 0; transform: none; }
          }
          .home-title {
            position: relative;
            animation: makossa-cut 2.6s steps(1, end) both;
          }
          /* scritta nera piena, nessun alone dietro */
          /* la luna gira lentamente, un giro ogni tanto */
          @keyframes moon-spin {
            0%, 62% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .home-moon {
            transform-box: view-box;
            transform-origin: 3763.8px 350px;
            animation: moon-spin 46s cubic-bezier(.45,0,.55,1) infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .home-moon { animation: none; }
          }
          .home-title::before,
          .home-title::after {
            content: "";
            position: absolute;
            inset: 0;
            background: var(--ghost-img);
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            pointer-events: none;
            mix-blend-mode: screen;
          }
          .home-title::before {
            background-color: rgba(255,0,60,0.6);
            -webkit-mask-image: var(--ghost-img);
            mask-image: var(--ghost-img);
            -webkit-mask-size: contain;
            mask-size: contain;
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
            -webkit-mask-position: center;
            mask-position: center;
            background-image: none;
            animation: makossa-ghost 2.6s ease-out both;
          }
          .home-title::after {
            background-color: rgba(0,180,255,0.6);
            -webkit-mask-image: var(--ghost-img);
            mask-image: var(--ghost-img);
            -webkit-mask-size: contain;
            mask-size: contain;
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
            -webkit-mask-position: center;
            mask-position: center;
            background-image: none;
            animation: makossa-ghost 2.6s ease-out both reverse;
          }
          @media (prefers-reduced-motion: reduce) {
            .home-title, .home-title::before, .home-title::after {
              animation: none;
              opacity: 1;
            }
            .home-title::before, .home-title::after { display: none; }
          }
        `}</style>
      </div>

      <SongPlayer />
    </main>
  );
}