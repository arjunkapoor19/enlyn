"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Source",
      href: "/source",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      label: "Science",
      href: "/science",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
    {
      label: "Philosophy",
      href: "/philosophy",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
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
          text-decoration: none;
          color: inherit;
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

        .dock-item.active {
          background: rgba(255,255,255,0.45);
        }

        .dock-item.active::after {
          opacity: 1;
        }

        .dock-divider {
          width: 1px;
          height: 32px;
          background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.1), transparent);
          margin: 0 4px;
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: 20,
          paddingBottom: 12,
          pointerEvents: "none",
        }}
      >
        <nav
          className="dock-nav pointer-events-auto"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            borderRadius: 20,
            padding: "6px 8px",
          }}
        >
          {/* ── Logo / Home pill ── */}
          <Link href="/" className={`dock-item${pathname === "/" ? " active" : ""}`}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "#0e0e0e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "sans-serif",
                flexShrink: 0,
              }}
            >
              E
            </div>
            <span
              style={{
                fontSize: 10,
                color: "rgba(0,0,0,0.5)",
                letterSpacing: "0.04em",
                fontFamily: "sans-serif",
              }}
            >
              Enlyn
            </span>
          </Link>

          <div className="dock-divider" />

          {/* ── Nav items ── */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`dock-item${pathname === item.href ? " active" : ""}`}
            >
              <span style={{ color: "rgba(0,0,0,0.5)" }}>{item.icon}</span>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(0,0,0,0.5)",
                  letterSpacing: "0.04em",
                  fontFamily: "sans-serif",
                }}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}