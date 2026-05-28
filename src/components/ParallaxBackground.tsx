"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * <ParallaxBackground />
 *
 * Drop this as the FIRST child inside any page's root element.
 * It renders fixed behind everything (z-0) and handles:
 *   — Parallax horizontal slide on scroll
 *   — Gentle opacity fade (never goes below `minOpacity`)
 *
 * Props:
 *   src        — image path, defaults to /HeroMountainBg.png
 *   minOpacity — lowest opacity image fades to (default 0.55, never white-out)
 *   parallaxStrength — px moved per scroll px (default 0.08)
 */
export default function ParallaxBackground({
  src = "/HeroMountainBg.png",
  minOpacity = 0.55,
  parallaxStrength = 0.08,
}: {
  src?: string;
  minOpacity?: number;
  parallaxStrength?: number;
}) {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!imgRef.current) return;
          const scrollY = window.scrollY;

          // Slide right — capped so image never reveals empty space
          const maxShift = imgRef.current.offsetWidth - window.innerWidth;
          const shiftX = Math.min(scrollY * parallaxStrength, maxShift);
          imgRef.current.style.transform = `translateX(${shiftX}px) translateZ(0)`;

          // Fade gently — starts fading after 80px scroll, never below minOpacity
          const fadeStart = 80;
          const fadeRange = 600;
          const rawOpacity = 0.82 - Math.max(0, scrollY - fadeStart) / fadeRange;
          imgRef.current.style.opacity = String(Math.max(minOpacity, rawOpacity));

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [minOpacity, parallaxStrength]);

  return (
    <>
      <style>{`
        .parallax-root {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
          /* Base background colour — matches the page so edges blend */
          background: linear-gradient(160deg, #f0ede6 0%, #e8e4db 50%, #e2ddd4 100%);
        }

        .parallax-img-wrap {
          position: absolute;
          top: 0;
          /* Start offset left so there's buffer room to slide right */
          left: -15%;
          width: 116%;
          height: 100%;
          will-change: transform, opacity;
          transform: translateX(0px) translateZ(0);
          opacity: 0.82;
          /* Smooth initial paint — avoids flash */
          transition: opacity 0.05s linear;
        }

        .parallax-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }

        /* Subtle vignette so content reads cleanly over the image */
        .parallax-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(232,228,219,0.18) 100%),
            linear-gradient(to bottom, transparent 55%, rgba(232,228,219,0.45) 100%);
          pointer-events: none;
        }
      `}</style>

      <div className="parallax-root" aria-hidden="true">
        <div ref={imgRef} className="parallax-img-wrap">
          <Image src={src} alt="" draggable={false} fill sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        {/* Vignette sits on top of image, below all content */}
        <div className="parallax-vignette" />
      </div>
    </>
  );
}