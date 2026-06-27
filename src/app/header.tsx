"use client";

import Link from "next/link";
import Image from "next/image";
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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-start pt-5 pb-3 pointer-events-none">
      <nav className="dock-nav pointer-events-auto inline-flex items-center gap-1 rounded-[20px] py-[6px] px-2">
        <Link href="/" className={`dock-item${pathname === "/" ? " active" : ""}`}>
          <div className="relative w-18 h-10 shrink-0 overflow-hidden">
            <div className="absolute inset-0 scale-[1.7]">
              <Image src="/logo.png" alt="Enlyn" fill className="object-contain" />
            </div>
          </div>
        </Link>

        <div className="dock-divider" />

        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`dock-item${pathname === item.href ? " active" : ""}`}
          >
            <span className="text-white/65">{item.icon}</span>
            <span className="text-[10px] text-white/65 tracking-[0.04em] font-sans">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
