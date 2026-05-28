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

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // ── Parallax: move bg image RIGHT as user scrolls down ──
          // translateX goes from 0% at top → positive% as scrollY grows
          if (bgRef.current) {
            const parallaxX = Math.min(scrollY * 0.12, bgRef.current.offsetWidth - window.innerWidth); // Prevent white space
            bgRef.current.style.transform = `translateX(${parallaxX}px) translateZ(0)`;
            bgRef.current.style.opacity = `${Math.max(0.4, 0.9 - scrollY / 300)}`;
          }

          // ── Mobile readability veil ──
          // Fades in once user scrolls past the hero section height
          if (mobileOverlayRef.current && heroRef.current) {
            const heroHeight = heroRef.current.offsetHeight;
            // Start fading at 60% of hero, fully opaque by 100%
            const fadeStart = heroHeight * 0.6;
            const fadeEnd = heroHeight;
            const opacity = Math.min(0.35, Math.max(0, (scrollY - fadeStart) / (fadeEnd - fadeStart)));
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
      className="main-wrapper relative text-[#1a1a1a] overflow-x-hidden"
      style={{
        background: "linear-gradient(160deg, #f8f6f1 0%, #ede9e0 40%, #e8e2d5 100%)",
        fontFamily: "'Cormorant Garamond', 'Didot', 'Bodoni MT', 'Playfair Display', Georgia, serif",
      }}
    >
      {/* ─── GRAIN TEXTURE OVERLAY ─── */}
      <div
        className="fixed inset-0 z-1 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ─── AMBIENT LIGHT ORBS ─── */}
      <div
        className="fixed pointer-events-none z-1"
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
        className="fixed pointer-events-none z-1"
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

      {/* ══════════════════════════════════════════════════════
          Z-INDEX STACK (bottom → top):
          z-[2]  — HeroMountainBg parallax image
          z-[3]  — 3D bottle (Scene)
          z-[4]  — Enlyn text + stats pill (hero text content)
          z-[5]  — Mobile readability veil (scroll-activated)
          z-[50] — Dock header (always on top)
      ══════════════════════════════════════════════════════ */}

      {/* ─── HERO MOUNTAIN BACKGROUND (parallax) ─── */}
      {/* Wrapper is fixed to hero viewport; inner div slides right on scroll */}
      <div
        className="fixed inset-0 w-full h-screen z-2 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          ref={bgRef}
          style={{
            // Start slightly wider than viewport so there's room to slide right
            // without revealing empty space on the right edge at rest
            position: "absolute",
            top: 0,
            left: "-15%",          // offset so image starts flush-left with room to slide
            width: "116%",        // extra width buffer for parallax travel
            height: "100%",
            willChange: "transform",
            transform: "translateX(0px) translateZ(0)",
          }}
        >
          <Image
            src="/HeroMountainBg.png"
            alt=""
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center center",
              display: "block",
              opacity: 0.8
            }}
            draggable={false}
            priority
          />
        </div>
      </div>

      {/* ─── 3D CANVAS LAYER — z-[3], ABOVE background image ─── */}
      <div className="fixed inset-0 w-full h-screen z-3 pointer-events-none">
        <Scene />
      </div>

      {/* ─── MOBILE READABILITY VEIL — z-[5], fades in on scroll past hero ─── */}
      {/* Only rendered on mobile (md:hidden). Sits above bottle, below nothing. */}
      <div
        id="mobile-overlay"
        ref={mobileOverlayRef}
        className="md:hidden fixed inset-0 z-4 pointer-events-none"
        style={{ backgroundColor: "#f5f5f0", opacity: 0 }}
      />

      {/* ─── macOS DOCK STYLE HEADER ─── */}

      <Header />

      {/* ─── CONTENT LAYER ─── */}
      <div className="relative w-full" style={{ zIndex: 4 }}>

        {/* ══════════════════════════════
            SECTION 1 — HERO
        ══════════════════════════════ */}
        <section
          ref={heroRef}
          className="h-screen flex flex-col items-center justify-center text-center px-6"
          style={{ position: "relative" }}
        >
          {/* Hero text content — z-[4] via parent, sits above bottle */}
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10 }}>

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
                fontSize: "clamp(180px, 20vw, 280px)",
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
                    <div style={{ width: 1, alignSelf: "stretch", background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.09), transparent)" }} />
                  )}
                  <div style={{ padding: "18px 40px", textAlign: "center" }}>
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

          </div>

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
              <span style={{ WebkitTextStroke: "1px rgba(10,10,10,0.4)", color: "transparent" }}>
                Modern Body.
              </span>
            </h2>

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
        <section className="flex flex-col items-center justify-center px-6 py-10 text-center">
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
          <Link href={'/order'}>
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
        </Link>
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
            Free delivery on orders over Rs.1000
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
            Enlyn Water Co. © 2026
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