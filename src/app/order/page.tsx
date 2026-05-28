'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Header from '../header';

export default function OrderFormPage() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          if (bgRef.current) {
            const parallaxX = Math.min(scrollY * 0.12, bgRef.current.offsetWidth - window.innerWidth);
            bgRef.current.style.transform = `translateX(${parallaxX}px) translateZ(0)`;
            bgRef.current.style.opacity = `${Math.max(0.4, 0.9 - scrollY / 300)}`;
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
    <>
      {/* ── Watercolour mountain SVG background ── */}
      <div
        className="fixed inset-0 w-full h-screen z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          ref={bgRef}
          style={{
            position: "absolute",
            top: 0,
            left: "-15%",
            width: "116%",
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

      <div className="page-wrapper">
        <Header />

        {/* ── Page header ── */}
        <div className="animate-in" style={{ textAlign: 'center', padding: '120px 24px 20px' }}>
          <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 16 }}>
            — Private Label Programme —
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(48px, 8vw, 88px)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1,
            letterSpacing: '-0.01em'
          }}>
            <span className="hero-word">Begin Your</span>
          </h1>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(48px, 8vw, 88px)',
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: '-0.01em',
            marginBottom: 16
          }}>
            <span className="hero-word">Order</span>
          </h1>
          <div className="luxury-divider" style={{ margin: '0 auto 16px' }}/>
          <p style={{ fontSize: 17, color: 'rgba(0,0,0,0.45)', fontStyle: 'italic', fontWeight: 300 }}>
            Custom branding, your identity. Purely sourced, responsibly bottled.
          </p>
        </div>

        {/* ── Info pills ── */}
        <div className="animate-in animate-in-delay-1" style={{ display: 'flex', justifyContent: 'center', gap: 12, padding: '8px 24px 32px', flexWrap: 'wrap' }}>
          {[['MOQ', '500 cases'], ['Lead time', '4–6 weeks'], ['Formats', '250 ml · 750 ml']].map(([label, val]) => (
            <div key={label} className="stat-card">
              <div style={{ fontSize: 18, fontWeight: 400, color: '#0e0e0e', letterSpacing: '-0.01em' }}>{val}</div>
              <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── Form card ── */}
        <div className="animate-in animate-in-delay-2" style={{ padding: '0 24px 80px' }}>
          <form
            className="form-card"
            action="https://formsubmit.co/singleandlonelyy@gmail.com"
            method="POST"
          >
            <input type="hidden" name="_subject" value="New Enlyn White-Label Order Enquiry"/>
            <input type="hidden" name="_captcha" value="false"/>
            <input type="hidden" name="_template" value="table"/>
            <input type="hidden" name="_next" value="https://enlyn.com/order/thank-you"/>

            {/* ── 1. Contact ── */}
            <div style={{ marginBottom: 32 }}>
              <p className="form-section-label">01 · Contact</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
                <div className="row-2">
                  <div className="field-group">
                    <label className="field-label" htmlFor="first_name">First name</label>
                    <input className="field-input" id="first_name" name="first_name" type="text" placeholder="Alexandra" required/>
                  </div>
                  <div className="field-group">
                    <label className="field-label" htmlFor="last_name">Last name</label>
                    <input className="field-input" id="last_name" name="last_name" type="text" placeholder="Wren" required/>
                  </div>
                </div>
                <div className="row-2">
                  <div className="field-group">
                    <label className="field-label" htmlFor="email">Email address</label>
                    <input className="field-input" id="email" name="email" type="email" placeholder="hello@yourbrand.com" required/>
                  </div>
                  <div className="field-group">
                    <label className="field-label" htmlFor="phone">Phone number</label>
                    <input className="field-input" id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000"/>
                  </div>
                </div>
                <div className="field-group">
                  <label className="field-label" htmlFor="company">Company / Brand name</label>
                  <input className="field-input" id="company" name="company" type="text" placeholder="Your Brand Co." required/>
                </div>
              </div>
            </div>

            {/* ── 2. Branding ── */}
            <div style={{ marginBottom: 32 }}>
              <p className="form-section-label">02 · Branding & Labelling</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
                <div className="field-group">
                  <label className="field-label" htmlFor="brand_name">Label / brand name to appear on bottle</label>
                  <input className="field-input" id="brand_name" name="brand_name" type="text" placeholder="e.g. Lumière Springs" required/>
                </div>
                <div className="row-2">
                  <div className="field-group">
                    <label className="field-label" htmlFor="label_style">Label style preference</label>
                    <select className="field-select" id="label_style" name="label_style">
                      <option value="">Select a style</option>
                      <option>Minimalist / Clean</option>
                      <option>Luxury / Premium</option>
                      <option>Natural / Organic</option>
                      <option>Bold / Graphic</option>
                      <option>Custom – I have a design</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label" htmlFor="label_material">Label material</label>
                    <select className="field-select" id="label_material" name="label_material">
                      <option value="">Select material</option>
                      <option>Paper (standard)</option>
                      <option>Paper (textured / premium)</option>
                      <option>Clear / transparent</option>
                      <option>Metallic / foil</option>
                      <option>Advice from Enlyn team</option>
                    </select>
                  </div>
                </div>
                <div className="field-group">
                  <label className="field-label" htmlFor="brand_colours">Brand colours (hex codes or description)</label>
                  <input className="field-input" id="brand_colours" name="brand_colours" type="text" placeholder="e.g. #1A1A2E, soft ivory, forest green"/>
                </div>
                <div className="field-group">
                  <label className="field-label" htmlFor="logo_notes">Logo & artwork notes</label>
                  <textarea className="field-textarea" id="logo_notes" name="logo_notes" placeholder="Describe your existing logo, provide file formats you have (AI, PNG, SVG…), or let us know if you need design support."/>
                </div>
              </div>
            </div>

            {/* ── 3. Order ── */}
            <div style={{ marginBottom: 32 }}>
              <p className="form-section-label">03 · Order Details</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
                <div className="row-2">
                  <div className="field-group">
                    <label className="field-label" htmlFor="bottle_size">Bottle size</label>
                    <select className="field-select" id="bottle_size" name="bottle_size" required>
                      <option value="">Select size</option>
                      <option>250 ml</option>
                      <option>500 ml</option>
                      <option>750 ml</option>
                      <option>1 L</option>
                      <option>Multiple sizes</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label" htmlFor="bottle_type">Bottle type</label>
                    <select className="field-select" id="bottle_type" name="bottle_type">
                      <option value="">Select type</option>
                      <option>Still</option>
                      <option>Sparkling</option>
                      <option>Both</option>
                    </select>
                  </div>
                </div>
                <div className="row-2">
                  <div className="field-group">
                    <label className="field-label" htmlFor="quantity">Estimated initial quantity (cases)</label>
                    <select className="field-select" id="quantity" name="quantity" required>
                      <option value="">Select quantity</option>
                      <option>500–999 cases</option>
                      <option>1,000–4,999 cases</option>
                      <option>5,000–9,999 cases</option>
                      <option>10,000+ cases</option>
                      <option>Not yet decided</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label" htmlFor="timeline">Target delivery timeline</label>
                    <select className="field-select" id="timeline" name="timeline">
                      <option value="">Select timeline</option>
                      <option>Within 4 weeks</option>
                      <option>4–8 weeks</option>
                      <option>2–3 months</option>
                      <option>Flexible</option>
                    </select>
                  </div>
                </div>
                <div className="field-group">
                  <label className="field-label" htmlFor="distribution">Distribution channel</label>
                  <select className="field-select" id="distribution" name="distribution">
                    <option value="">Select channel</option>
                    <option>Hospitality (hotels, restaurants)</option>
                    <option>Retail</option>
                    <option>Corporate gifting</option>
                    <option>Events & weddings</option>
                    <option>E-commerce</option>
                    <option>Multiple channels</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ── 4. Additional notes ── */}
            <div style={{ marginBottom: 36 }}>
              <p className="form-section-label">04 · Anything Else?</p>
              <div style={{ marginTop: 20 }}>
                <div className="field-group">
                  <label className="field-label" htmlFor="notes">Additional requirements or questions</label>
                  <textarea
                    className="field-textarea"
                    id="notes"
                    name="notes"
                    placeholder="Custom cap colour, embossing, gift packaging, sustainability certifications, co-branding arrangements…"
                    style={{ minHeight: 130 }}
                  />
                </div>
              </div>
            </div>

            {/* ── Submit ── */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 12, letterSpacing: '0.08em', color: 'rgba(0,0,0,0.3)', marginBottom: 20, fontStyle: 'italic' }}>
                We review every enquiry personally and respond within 48 hours.
              </p>
              <button className="cta-btn" type="submit">
                Submit Enquiry
              </button>
            </div>
          </form>
        </div>

        {/* ── Footer ── */}
        <footer className="footer-bar" style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '0.1em', color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase' }}>
            Enlyn © {new Date().getFullYear()}
          </span>
          <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.25)', fontStyle: 'italic' }}>
            Purely sourced · Responsibly bottled
          </span>
        </footer>
      </div>
    </>
  );
}