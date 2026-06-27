"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import Header from "./header";
import Link from "next/link";
import Image from "next/image";

const Scene = dynamic(() => import("../components/Scene"), { ssr: false });

export default function Home() {
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);
  const rocksRef = useRef<HTMLDivElement>(null);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ROCKS PARALLAX SYSTEM
  //
  //  Desktop  →  mouse-driven 3-D parallax
  //               Cursor position (normalised −0.5 → +0.5) drives
  //               targetX / targetY.  The rocks drift *opposite* to
  //               the cursor, with a shallow perspective tilt that
  //               sells the layered-depth illusion.
  //
  //  Mobile   →  scroll-driven parallax
  //               As the user scrolls through the hero section the
  //               rocks drift upward (up to 30 px), replicating the
  //               same depth cue without needing a pointer.
  //
  //  Both branches share one RAF lerp loop.  Neither branch touches
  //  the other's axis — they compose cleanly.
  //
  //  REVERT GUIDE (3 steps):
  //    1. Delete this entire useEffect block.
  //    2. Delete `const rocksRef = useRef<HTMLDivElement>(null);`.
  //    3. Remove ref={rocksRef} and willChange from the rocks <div>.
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Evaluated once at mount; won't change during the session.
    // "hover: none" is true for touch-primary devices (phones, tablets).
    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    // ── DESKTOP: mouse-driven parallax ──────────────────────────────
    // Maps normalised cursor position to translation targets:
    //   horizontal (X):  ±24 px  — rocks drift counter to cursor
    //   vertical   (Y):  ± 8 px
    // `mousemove` never fires on touch screens, so this is a safe
    // no-op on mobile — no guard needed.
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * -24;
      targetY = (e.clientY / window.innerHeight - 0.5) * -8;
    };

    // ── MOBILE: scroll-driven parallax ──────────────────────────────
    // Scroll progress through the hero (0 → 1) maps to a vertical
    // drift of up to −30 px (rocks float upward as you scroll down).
    // Clamped at heroHeight so the effect stops when leaving the hero.
    // Guard: skipped on desktop so it never competes with the mouse effect
    // on hybrid (touch + mouse) laptops.
    const onScroll = () => {
      if (!isTouchDevice) return;
      const heroHeight = heroRef.current?.offsetHeight ?? window.innerHeight;
      const progress = Math.min(window.scrollY / heroHeight, 1); // 0 → 1
      targetY = progress * -30;
    };

    // ── SHARED RAF LERP LOOP ─────────────────────────────────────────
    // Both branches write to targetX / targetY; this loop closes the gap
    // at 5.5 % per frame (~60 fps).  That factor gives ≈18 frames to
    // cover 63 % of the distance — weighty but not sluggish.
    // Perspective tilt is derived from the translation so it always
    // stays proportional: kept small (×0.25 / ×0.1) to read as depth,
    // not rotation.
    const tick = () => {
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;

      if (rocksRef.current) {
        const rotY = currentX * 0.25; // yaw: left–right tilt
        const rotX = currentY * 0.1;  // pitch: forward–back tilt
        rocksRef.current.style.transform =
          `perspective(1400px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll",    onScroll,    { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll",    onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          if (bgRef.current) {
            bgRef.current.style.opacity = `${Math.max(0.4, 0.95 - scrollY / 400)}`;
          }

          if (mobileOverlayRef.current && heroRef.current) {
            const heroHeight = heroRef.current.offsetHeight;
            const fadeStart = heroHeight * 0.6;
            const fadeEnd = heroHeight;
            const opacity = Math.min(0.6, Math.max(0, (scrollY - fadeStart) / (fadeEnd - fadeStart)));
            mobileOverlayRef.current.style.opacity = String(opacity);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      className="main-wrapper relative text-white overflow-x-hidden bg-[#0a0f1a]"
      style={{
        fontFamily: "'Cormorant Garamond', 'Didot', 'Bodoni MT', 'Playfair Display', Georgia, serif",
      }}
    >
      {/* ══════════════════════════════════════════════════════
          Z-INDEX STACK (bottom → top):
          z-[2]  — hero-background.webp (full screen)
          z-[3]  — 3D bottle (Scene)
          z-[4]  — rocks.webp (bottom of viewport, in front of bottle base)
          z-[5]  — Mobile readability veil
          z-[6]  — Scrollable content layer
          z-[50] — Dock header
      ══════════════════════════════════════════════════════ */}

      {/* ─── HERO BACKGROUND ─── */}
      <div
        className="fixed inset-0 w-full h-screen z-2 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          ref={bgRef}
          className="absolute inset-0 will-change-[opacity]"
        >
          <Image
            src="/hero-background.webp"
            alt=""
            fill
            className="object-cover object-center"
            draggable={false}
            priority
          />
        </div>
      </div>

      {/* ─── ROCKS LAYER — z-[3], below bottle ─── */}
      <div
        ref={rocksRef}
        className="fixed left-0 w-full z-3 pointer-events-none"
        style={{ bottom: "-80px", height: "28vh", willChange: "transform" }}
        aria-hidden="true"
      >
        <Image
          src="/rocks.webp"
          alt=""
          fill
          className="object-cover object-bottom"
          draggable={false}
          priority
        />
      </div>

      {/* ─── 3D CANVAS LAYER — z-[6], above content layer ─── */}
      <div className="fixed inset-0 w-full h-screen z-6 pointer-events-none">
        <Scene />
      </div>

      {/* ─── MOBILE READABILITY VEIL ─── */}
      <div
        id="mobile-overlay"
        ref={mobileOverlayRef}
        className="md:hidden fixed inset-0 z-7 pointer-events-none bg-[#0a0f1a]"
        style={{ opacity: 0 }}
      />

      {/* ─── HEADER ─── */}
      <Header />

      {/* ─── CONTENT LAYER — no stacking context; children set their own z-index globally ─── */}
      <div className="relative w-full">

        {/* ══════════════════════════════
            SECTION 1 — HERO
        ══════════════════════════════ */}
        <section
          ref={heroRef}
          className="h-screen flex flex-col items-center justify-center text-center px-6 relative"
        >
          <div className="relative flex flex-col items-center">

            {/* Eyebrow — "PURE BY NATURE ——— [title] ——— CHOSEN FOR LIFE" */}
            <div className="flex items-center gap-5 mb-6 w-full justify-center relative z-[5]">
              <div className="flex items-center gap-[10px]">
                <div
                  style={{
                    width: 40,
                    height: 1,
                    background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4))",
                  }}
                />
                <span
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.42em",
                    textTransform: "uppercase",
                    opacity: 0.55,
                    fontFamily: "-apple-system, 'SF Pro Text', sans-serif",
                    fontWeight: 500,
                    color: "white",
                  }}
                >
                  Pure by Nature
                </span>
              </div>
              <div className="flex items-center gap-[10px]">
                <span
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.42em",
                    textTransform: "uppercase",
                    opacity: 0.55,
                    fontFamily: "-apple-system, 'SF Pro Text', sans-serif",
                    fontWeight: 500,
                    color: "white",
                  }}
                >
                  Chosen for Life
                </span>
                <div
                  style={{
                    width: 40,
                    height: 1,
                    background: "linear-gradient(to left, transparent, rgba(255,255,255,0.4))",
                  }}
                />
              </div>
            </div>
            {/* Hero wordmark — behind bottle */}
            <h1
              className="hero-word relative z-[7]"
              style={{
                fontSize: "clamp(180px, 20vw, 280px)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 0.82,
                marginBottom: "2.5rem",
                fontFamily: "'Cormorant Garamond', 'Didot', 'Bodoni MT', Georgia, serif",
                fontStyle: "italic",
              }}
            >
              Indorra
            </h1>
            
            {/* Stats row — dark navy glass, in front of bottle */}
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                position: "relative",
                zIndex: 7,
                background: "rgba(8, 20, 45, 0.72)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderTop: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 20,
                boxShadow: "0 4px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06) inset",
                overflow: "hidden",
                marginTop: "1.5rem",
              }}
            >
              {[
                { value: "7.8", label: "PH BALANCE" },
                { value: "∞", label: "ELECTROLYTES" },
                { value: "0.0", label: "SODIUM" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  {i > 0 && (
                    <div style={{ width: 1, alignSelf: "stretch", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)" }} />
                  )}
                  <div className="px-10 py-[18px] text-center">
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 300,
                        letterSpacing: "-0.02em",
                        color: "rgba(255,255,255,0.92)",
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
                        opacity: 0.45,
                        fontFamily: "-apple-system, 'SF Pro Text', sans-serif",
                        fontWeight: 500,
                        color: "white",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
        </section>

        {/* ══════════════════════════════
            SECTION 2 — PRODUCT ANCHOR
        ══════════════════════════════ */}
        <section
          className="flex items-center justify-start px-[8%] py-32 relative z-[4] bg-[#0a0f1a]"
        >
          <div className="max-w-xl">

            <div className="flex items-center gap-3 mb-8">
              <div className="w-7 h-px bg-white/25" />
              <span
                style={{
                  fontSize: 8,
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  opacity: 0.45,
                  fontFamily: "sans-serif",
                  fontWeight: 600,
                  color: "white",
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
                color: "rgba(255,255,255,0.92)",
              }}
            >
              Hydration{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>Refined</em>
              <br />
              for the{" "}
              <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.35)", color: "transparent" }}>
                Modern Body.
              </span>
            </h2>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 8 }}>
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
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 9,
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      opacity: 0.2,
                      color: "white",
                      flexShrink: 0,
                      width: 20,
                    }}
                  >
                    {card.num}
                  </span>
                  <h4
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      opacity: 0.4,
                      fontFamily: "sans-serif",
                      color: "white",
                      flexShrink: 0,
                      width: 100,
                      margin: 0,
                    }}
                  >
                    {card.title}
                  </h4>
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.6,
                      opacity: 0.55,
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 400,
                      color: "white",
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
        <section
          className="flex flex-col items-center justify-center px-6 py-10 text-center relative z-[4] bg-[#0a0f1a]"
        >
          <h3
            style={{
              fontSize: "clamp(52px, 10vw, 152px)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              marginBottom: "4rem",
              fontFamily: "'Cormorant Garamond', 'Didot', Georgia, serif",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.92)",
            }}
          >
            Taste the
            <br />
            <span style={{ fontStyle: "normal", fontWeight: 200 }}>Untamed.</span>
          </h3>

          <Link href={'/order'}>
          <div className="relative inline-flex items-center justify-center">
            <div className="cta-ring" style={{ position: "absolute", inset: -12, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)" }} />
            <div className="cta-ring" style={{ position: "absolute", inset: -26, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", animationDelay: "0.8s", animation: "ringPulse 3s ease-in-out infinite" }} />
            <div className="cta-ring" style={{ position: "absolute", inset: -42, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", animationDelay: "1.6s", animation: "ringPulse 3s ease-in-out infinite" }} />

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
        </Link>
          <p
            style={{
              marginTop: "3rem",
              fontSize: 12,
              opacity: 0.3,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              letterSpacing: "0.05em",
              color: "white",
            }}
          >
            Free delivery on orders over Rs.1000
          </p>
        </section>

        {/* ══════════════════════════════
            FOOTER
        ══════════════════════════════ */}
        <footer
          className="footer-bar py-6 px-12 flex flex-col md:flex-row justify-between items-center gap-4 relative z-[4]"
        >
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              opacity: 0.3,
              fontFamily: "sans-serif",
              fontWeight: 500,
              color: "white",
            }}
          >
            Enlyn Water Co. © 2026
          </p>
          <div
            style={{
              fontSize: 11,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              opacity: 0.25,
              letterSpacing: "0.05em",
              color: "white",
            }}
          >
            Pure. Refined. Yours.
          </div>
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              opacity: 0.3,
              fontFamily: "sans-serif",
              fontWeight: 500,
              color: "white",
            }}
          >
            Plastic Neutral Certified
          </p>
        </footer>
      </div>
    </main>
  );
}
