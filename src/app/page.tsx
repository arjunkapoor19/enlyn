"use client";

import dynamic from "next/dynamic";

// Keep your existing 3D logic — UNTOUCHED
const Scene = dynamic(() => import("../components/Scene"), { ssr: false });

export default function Home() {
  return (
    <main
      className="main-wrapper relative text-[#1a1a1a] overflow-x-hidden"
      style={{
        background: "linear-gradient(160deg, #f8f6f1 0%, #ede9e0 40%, #e8e2d5 100%)",
        fontFamily: "'Cormorant Garamond', 'Didot', 'Bodoni MT', 'Playfair Display', Georgia, serif",
      }}
    >
      {/* ─── GRAIN TEXTURE OVERLAY ─── */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ─── AMBIENT LIGHT ORBS ─── */}
      <div
        className="fixed pointer-events-none z-[1]"
        style={{
          top: "-10vh",
          left: "60%",
          width: "70vw",
          height: "70vw",
          background: "radial-gradient(ellipse, rgba(196,214,210,0.25) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />
      <div
        className="fixed pointer-events-none z-[1]"
        style={{
          bottom: "10vh",
          left: "-10vw",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(ellipse, rgba(210,200,185,0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
      />

      {/* ─── 3D CANVAS LAYER — ABSOLUTELY UNTOUCHED ─── */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        <Scene />
      </div>

      {/* ─── macOS DOCK STYLE HEADER ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

        .dock-nav {
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.55);
          box-shadow:
            0 2px 0px rgba(255,255,255,0.8) inset,
            0 -1px 0px rgba(0,0,0,0.04) inset,
            0 8px 32px rgba(0,0,0,0.08),
            0 2px 8px rgba(0,0,0,0.06);
        }

        .dock-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding: 8px 16px 10px;
          border-radius: 14px;
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }

        .dock-item:hover {
          background: rgba(255,255,255,0.5);
          transform: translateY(-4px) scale(1.06);
        }

        .dock-item::after {
          content: '';
          position: absolute;
          bottom: 4px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(0,0,0,0.25);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .dock-item:hover::after {
          opacity: 1;
        }

        .dock-divider {
          width: 1px;
          height: 32px;
          background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.1), transparent);
          margin: 0 4px;
        }

        .hero-word {
          background: linear-gradient(170deg, #0a0a0a 30%, #5a5a5a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-card {
          background: rgba(255,255,255,0.3);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.5);
          border-top: 1px solid rgba(255,255,255,0.8);
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
        }

        .luxury-divider {
          width: 48px;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(0,0,0,0.3), transparent);
        }

        .section-card {
          background: rgba(255,255,255,0.22);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 8px 48px rgba(0,0,0,0.06), 0 2px 0 rgba(255,255,255,0.7) inset;
        }

        .cta-ring {
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.08);
          animation: ringPulse 3s ease-in-out infinite;
        }
        .cta-ring-2 {
          inset: -24px;
          animation-delay: 0.8s;
          border-color: rgba(0,0,0,0.05);
        }
        .cta-ring-3 {
          inset: -38px;
          animation-delay: 1.6s;
          border-color: rgba(0,0,0,0.03);
        }

        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.04); opacity: 0.5; }
        }

        .cta-btn {
          background: linear-gradient(145deg, #0e0e0e 0%, #2a2a2a 100%);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.08) inset,
            0 16px 48px rgba(0,0,0,0.3),
            0 4px 12px rgba(0,0,0,0.2);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .cta-btn:hover {
          transform: scale(0.96);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.1) inset,
            0 8px 24px rgba(0,0,0,0.25);
        }

        .footer-bar {
          border-top: 1px solid rgba(0,0,0,0.07);
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(12px);
        }
      `}</style>

      {/* ─── PREMIUM macOS DOCK HEADER ─── */}
      <header className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div
          className="dock-nav flex items-center gap-1 px-4 py-3 rounded-[22px]"
          style={{ fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif" }}
        >
          {/* Brand mark */}
          <div className="dock-item">
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(145deg, #0a0a0a, #2a2a2a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              <span style={{ color: "#f0ece4", fontSize: 12, fontWeight: 700, letterSpacing: "0.05em" }}>E</span>
            </div>
            <span style={{ fontSize: 9, color: "rgba(0,0,0,0.45)", letterSpacing: "0.03em", fontWeight: 500 }}>Enlyn</span>
          </div>

          <div className="dock-divider" />

          {/* Nav items */}
          {[
            { label: "Source", icon: "◈" },
            { label: "Science", icon: "◎" },
            { label: "Philosophy", icon: "◇" },
          ].map((item) => (
            <a key={item.label} href="#" className="dock-item" style={{ textDecoration: "none" }}>
              <span style={{ fontSize: 18, lineHeight: 1, opacity: 0.6, color: "#1a1a1a" }}>{item.icon}</span>
              <span style={{ fontSize: 9, color: "rgba(0,0,0,0.45)", letterSpacing: "0.03em", fontWeight: 500 }}>{item.label}</span>
            </a>
          ))}


        </div>
        {/* Dock reflection */}
        <div
          style={{
            position: "absolute",
            bottom: -8,
            left: "10%",
            right: "10%",
            height: 8,
            background: "rgba(0,0,0,0.06)",
            borderRadius: "0 0 50% 50%",
            filter: "blur(6px)",
          }}
        />
      </header>

      {/* ─── CONTENT LAYER ─── */}
      <div className="relative z-10 w-full">

        {/* ══════════════════════════════
            SECTION 1 — HERO
        ══════════════════════════════ */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6" style={{ position: "relative" }}>
          
          {/* Text content sits above mountains */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="luxury-divider" />
            <span
              style={{
                fontSize: 9,
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                opacity: 0.4,
                fontFamily: "-apple-system, 'SF Pro Text', sans-serif",
                fontWeight: 500,
              }}
            >
              Purely Sourced · Responsibly Bottled
            </span>
            <div className="luxury-divider" />
          </div>

          {/* Hero wordmark */}
          <h1
            className="hero-word"
            style={{
              fontSize: "clamp(96px, 20vw, 280px)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 0.82,
              marginBottom: "2.5rem",
              fontFamily: "'Cormorant Garamond', 'Didot', 'Bodoni MT', Georgia, serif",
              fontStyle: "italic",
            }}
          >
            Enlyn
          </h1>

          {/* Stats row — unified pill */}
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              background: "rgba(255,255,255,0.28)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)",
              borderTop: "1px solid rgba(255,255,255,0.85)",
              borderRadius: 20,
              boxShadow: "0 4px 32px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.9) inset",
              overflow: "hidden",
              marginTop: "1.5rem",
            }}
          >
            {[
              { value: "7.8", label: "PH BALANCE" },
              { value: "∞", label: "ELECTROLYTES" },
              { value: "0.0", label: "SODIUM" },
            ].map((stat, i) => (
              <div key={stat.label} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && (
                  <div style={{ width: 1, alignSelf: "stretch", background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.09), transparent)", margin: "0" }} />
                )}
                <div
                  style={{
                    padding: "18px 40px",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                      color: "#0a0a0a",
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      lineHeight: 1,
                      marginBottom: 6,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: 7.5,
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      opacity: 0.38,
                      fontFamily: "-apple-system, 'SF Pro Text', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          </div>{/* end text wrapper */}

          {/* Mountain illustration — full bleed, behind text */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <svg
              viewBox="0 0 1440 900"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "100%", display: "block" }}
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Fade mask: transparent at edges, opaque in center */}
                <linearGradient id="edgeFade" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="18%" stopColor="white" stopOpacity="0" />
                  <stop offset="82%" stopColor="white" stopOpacity="0" />
                  <stop offset="100%" stopColor="white" stopOpacity="1" />
                </linearGradient>
                <mask id="mountainMask">
                  <rect width="1440" height="900" fill="white" />
                  <rect width="1440" height="900" fill="url(#edgeFade)" />
                </mask>

                {/* Vertical fade: fades out at very top and bottom */}
                <linearGradient id="vFade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="25%" stopColor="white" stopOpacity="0" />
                  <stop offset="70%" stopColor="white" stopOpacity="0" />
                  <stop offset="100%" stopColor="white" stopOpacity="1" />
                </linearGradient>
                <mask id="vMask">
                  <rect width="1440" height="900" fill="white" />
                  <rect width="1440" height="900" fill="url(#vFade)" />
                </mask>
              </defs>

              <g mask="url(#mountainMask)">
                <g mask="url(#vMask)">

                  {/* Ridge 1 — far background, barely visible, slowest drift */}
                  <polyline
                    style={{ animation: "ridgeDrift1 9s ease-in-out infinite" }}
                    points="0,900 120,680 220,720 340,620 440,660 560,540 660,580 760,480 860,520 960,430 1060,470 1160,540 1260,600 1360,660 1440,700 1440,900"
                    fill="none"
                    stroke="rgba(10,10,10,0.055)"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />

                  {/* Ridge 2 — mid range */}
                  <polyline
                    style={{ animation: "ridgeDrift2 11s ease-in-out infinite" }}
                    points="0,900 80,760 180,740 280,680 380,710 480,610 580,640 680,540 780,570 880,490 960,520 1060,580 1160,620 1260,670 1360,710 1440,740 1440,900"
                    fill="none"
                    stroke="rgba(10,10,10,0.09)"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />

                  {/* Ridge 3 — mid-foreground */}
                  <polyline
                    style={{ animation: "ridgeDrift3 13s ease-in-out infinite" }}
                    points="0,900 100,820 200,790 300,730 400,760 500,660 600,700 700,590 800,630 880,560 960,600 1060,650 1160,690 1260,730 1360,770 1440,790 1440,900"
                    fill="none"
                    stroke="rgba(10,10,10,0.13)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />

                  {/* Ridge 4 — foreground, most visible */}
                  <polyline
                    style={{ animation: "ridgeDrift1 15s ease-in-out infinite reverse" }}
                    points="0,900 60,870 160,850 260,810 360,830 460,760 560,790 660,710 740,740 820,680 900,710 980,750 1080,790 1180,820 1280,840 1440,860 1440,900"
                    fill="none"
                    stroke="rgba(10,10,10,0.17)"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {/* Snow cap accents on sharpest peaks of ridge 3 */}
                  {[
                    [880, 560, 895, 575, 910, 562],
                    [700, 590, 715, 606, 730, 592],
                    [500, 660, 514, 676, 528, 663],
                  ].map(([x1, y1, xm, ym, x2, y2], i) => (
                    <polyline
                      key={i}
                      points={`${x1},${y1} ${xm},${ym} ${x2},${y2}`}
                      fill="none"
                      stroke="rgba(10,10,10,0.12)"
                      strokeWidth="1"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      style={{ animation: `ridgeDrift3 13s ease-in-out infinite` }}
                    />
                  ))}

                </g>
              </g>
            </svg>
          </div>

          {/* Scroll hint */}
          <div
            style={{
              position: "absolute",
              bottom: "10vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              opacity: 0.3,
            }}
          >
            <span style={{ fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", fontFamily: "sans-serif" }}>Scroll</span>
            <div
              style={{
                width: 1,
                height: 48,
                background: "linear-gradient(to bottom, #0a0a0a, transparent)",
                animation: "scrollDrop 2s ease-in-out infinite",
              }}
            />
          </div>
          <style>{`
            @keyframes ridgeDrift1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes ridgeDrift2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes ridgeDrift3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-22px); }
        }

        @keyframes scrollDrop {
              0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
              40% { transform: scaleY(1); transform-origin: top; opacity: 1; }
              60% { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
              100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
            }
          `}</style>
        </section>

        {/* ══════════════════════════════
            SECTION 2 — PRODUCT ANCHOR
        ══════════════════════════════ */}
        <section className="flex items-center justify-start px-[8%] py-32">
          <div className="max-w-xl">
            
            {/* Overline */}
            <div className="flex items-center gap-3 mb-8">
              <div style={{ width: 28, height: 1, background: "rgba(0,0,0,0.25)" }} />
              <span
                style={{
                  fontSize: 8,
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  opacity: 0.45,
                  fontFamily: "sans-serif",
                  fontWeight: 600,
                }}
              >
                The Enlyn Promise
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(40px, 6.5vw, 96px)",
                fontWeight: 300,
                letterSpacing: "-0.025em",
                lineHeight: 1.0,
                marginBottom: "3rem",
                fontFamily: "'Cormorant Garamond', 'Didot', Georgia, serif",
                color: "#0a0a0a",
              }}
            >
              Hydration{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>Refined</em>
              <br />
              for the{" "}
              <span
                style={{
                  WebkitTextStroke: "1px rgba(10,10,10,0.4)",
                  color: "transparent",
                }}
              >
                Modern Body.
              </span>
            </h2>

            {/* Feature rows — stacked, left-aligned, separated by hairlines */}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", marginTop: 8 }}>
              {[
                {
                  title: "The Source",
                  body: "Untouched glacial aquifers at 3,200m — a mineral balance found nowhere else on earth.",
                  num: "01",
                },
                {
                  title: "Design",
                  body: "100% infinitely recyclable glass. Ergonomic form. Beauty that leaves no trace.",
                  num: "02",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 32,
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  {/* Number */}
                  <span
                    style={{
                      fontSize: 9,
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      opacity: 0.2,
                      flexShrink: 0,
                      width: 20,
                    }}
                  >
                    {card.num}
                  </span>

                  {/* Title */}
                  <h4
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      opacity: 0.4,
                      fontFamily: "sans-serif",
                      flexShrink: 0,
                      width: 100,
                      margin: 0,
                    }}
                  >
                    {card.title}
                  </h4>

                  {/* Body */}
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.6,
                      opacity: 0.55,
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 400,
                      margin: 0,
                    }}
                  >
                    {card.body}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════
            SECTION 3 — CTA
        ══════════════════════════════ */}
        <section className="flex flex-col items-center justify-center px-6 py-32 text-center">
          <h3
            style={{
              fontSize: "clamp(52px, 10vw, 152px)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              marginBottom: "4rem",
              fontFamily: "'Cormorant Garamond', 'Didot', Georgia, serif",
              fontStyle: "italic",
              color: "#0a0a0a",
            }}
          >
            Taste the
            <br />
            <span style={{ fontStyle: "normal", fontWeight: 200 }}>Untamed.</span>
          </h3>

          {/* Premium circular CTA */}
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <div className="cta-ring" style={{ position: "absolute", inset: -12, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.08)" }} />
            <div className="cta-ring" style={{ position: "absolute", inset: -26, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.05)", animationDelay: "0.8s", animation: "ringPulse 3s ease-in-out infinite" }} />
            <div className="cta-ring" style={{ position: "absolute", inset: -42, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.03)", animationDelay: "1.6s", animation: "ringPulse 3s ease-in-out infinite" }} />
            
            <button
              className="cta-btn relative z-10 rounded-full flex flex-col items-center justify-center gap-0.5"
              style={{ width: 148, height: 148 }}
            >
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "sans-serif",
                  fontWeight: 500,
                }}
              >
                Begin
              </span>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.9)",
                  fontFamily: "sans-serif",
                  fontWeight: 600,
                }}
              >
                Order Case
              </span>
            </button>
          </div>

          <p
            style={{
              marginTop: "3rem",
              fontSize: 12,
              opacity: 0.3,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              letterSpacing: "0.05em",
            }}
          >
            Free delivery on orders over $120
          </p>
        </section>

        {/* ══════════════════════════════
            FOOTER
        ══════════════════════════════ */}
        <footer
          className="footer-bar py-6 px-12 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
        >
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              opacity: 0.3,
              fontFamily: "sans-serif",
              fontWeight: 500,
            }}
          >
            Enlyn Water Co. © 2024
          </p>

          <div
            style={{
              fontSize: 11,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              opacity: 0.25,
              letterSpacing: "0.05em",
            }}
          >
            Pure. Refined. Yours.
          </div>

          <div className="flex gap-8">
            {["Instagram", "Sustainability", "Stockists"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  opacity: 0.3,
                  fontFamily: "sans-serif",
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "inherit",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.7")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "0.3")}
              >
                {link}
              </a>
            ))}
          </div>

          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              opacity: 0.3,
              fontFamily: "sans-serif",
              fontWeight: 500,
            }}
          >
            Plastic Neutral Certified
          </p>
        </footer>
      </div>
    </main>
  );
}