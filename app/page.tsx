"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function DiscoCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);

    const flashTimer = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 120);
    }, 2600);

    return () => {
      window.removeEventListener("mousemove", move);
      clearInterval(flashTimer);
    };
  }, []);

  return (
    <>
      {/* spotlight */}
      <div
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y + 10,
          width: "320px",
          height: "520px",
          transform: "translate(-50%,0)",
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.18), rgba(255,60,60,0.08), rgba(0,0,0,0))",
          filter: "blur(26px)",
          mixBlendMode: "screen",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* ambient glow */}
      <div
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          width: "420px",
          height: "420px",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,80,80,0.18) 0%, rgba(255,80,80,0.08) 35%, rgba(0,0,0,0) 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 9,
        }}
      />

      {/* flash */}
      {flash && (
        <div
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y,
            width: "520px",
            height: "520px",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,100,100,0.35) 25%, rgba(0,0,0,0) 70%)",
            filter: "blur(30px)",
            pointerEvents: "none",
            zIndex: 20,
          }}
        />
      )}

      {/* chain */}
      <div
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y - 140,
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 30,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "8px",
              height: "12px",
              border: "1.5px solid rgba(255,220,220,0.9)",
              borderRadius: "50%",
              marginBottom: "2px",
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
          width: "96px",
          height: "96px",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 40,
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,240,240,1) 0%, rgba(255,160,160,0.9) 20%, rgba(210,50,50,0.9) 45%, rgba(90,0,0,1) 80%)",
          boxShadow:
            "0 0 40px rgba(255,60,60,0.35), 0 0 120px rgba(255,80,80,0.25), inset -12px -14px 18px rgba(0,0,0,0.5), inset 8px 8px 14px rgba(255,255,255,0.25)",
        }}
      >
        {/* mirror grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "6px 6px",
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
            <a style={{ color: "white", textDecoration: "none" }}>Music</a>
            <a style={{ color: "white", textDecoration: "none" }}>Show</a>
            <a style={{ color: "white", textDecoration: "none" }}>Booking</a>
          </nav>
        </div>
      </header>

      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            letterSpacing: "0.35em",
            margin: 0,
          }}
        >
          MAKOSSA
        </h1>
      </div>
    </main>
  );
}
