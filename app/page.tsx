"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function DiscoCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* chain */}
      <div
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y - 27,
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 30,
        }}
      >
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "4px",
              height: "6px",
              border: "1px solid rgba(255,220,220,0.9)",
              borderRadius: "50%",
              marginBottom: "1px",
              transform: i % 2 ? "rotate(25deg)" : "rotate(-25deg)",
              boxShadow: "0 0 4px rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>

      {/* disco ball */}
      <div
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          width: "20px",
          height: "20px",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 40,
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,240,240,1) 0%, rgba(255,160,160,0.9) 20%, rgba(210,50,50,0.9) 45%, rgba(90,0,0,1) 80%)",
          boxShadow:
            "0 0 10px rgba(255,60,60,0.45), 0 0 28px rgba(255,80,80,0.25), inset -3px -3px 5px rgba(0,0,0,0.5), inset 2px 2px 3px rgba(255,255,255,0.25)",
        }}
      >
        {/* mirror grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
            opacity: 0.9,
            animation: "spin 10s linear infinite",
          }}
        />

        {/* highlight */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 15%, rgba(0,0,0,0) 40%)",
          }}
        />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
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
      <DiscoCursor />

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
            <a style={{ color: "white", textDecoration: "none" }}>Show</a>
            <a style={{ color: "white", textDecoration: "none" }}>Booking</a>
          </nav>
        </div>
      </header>

      <div
        style={{
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
        <h1 style={{ margin: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/makossa-logo-white.svg"
            alt="Makossa"
            style={{ display: "block", width: "min(640px, 84vw)", height: "auto" }}
          />
        </h1>
      </div>

      <SongPlayer />
    </main>
  );
}