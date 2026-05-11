import { useState, useEffect } from "react";

// === BRAND TOKENS (matching your existing materials) ===
const C = {
  black: "#0a0a0a",
  ink: "#111",
  charcoal: "#1a1a1a",
  steel: "#222",
  border: "#2a2a2a",
  borderHi: "#3a3a3a",
  muted: "#666",
  text: "#c0c0c0",
  textHi: "#e0e0e0",
  white: "#ffffff",
  // Brand greens (from your marketing materials)
  green: "#0a8c3a",      // deep professional green
  greenBright: "#22c55e", // bright accent green (matches your neon)
  greenGlow: "#4ade80",   // lighter glow
  // Premium accent
  gold: "#d4a84a",
};

const PHONE = "(573) 418-3221";
const PHONE_RAW = "5734183221";

// === DATA ===
const SERVICES = [
  {
    id: "pressure",
    icon: "💦",
    title: "Pressure Washing",
    tagline: "Concrete, brick, siding — restored",
    desc: "Driveways, sidewalks, patios, building exteriors. Soft wash methods safe on every surface, biodegradable solutions, results visible from the street.",
    forWho: "Homeowners · Commercial properties · Property managers",
  },
  {
    id: "windows",
    icon: "🪟",
    title: "Window Cleaning",
    tagline: "Streak-free, inside and out",
    desc: "Interior and exterior window cleaning for residential and commercial properties. Storefronts, office buildings, luxury homes — we handle every glass surface.",
    forWho: "Storefronts · Office buildings · Luxury homes",
  },
  {
    id: "holiday",
    icon: "🎄",
    title: "Holiday Lighting",
    tagline: "Install, maintain, take down",
    desc: "Professional holiday light installation for homes and businesses. We supply, install, and store the lights — you do nothing. Same crew year after year.",
    forWho: "Residential · HOAs · Commercial properties",
  },
  {
    id: "permanent",
    icon: "💡",
    title: "Permanent Lighting",
    tagline: "Year-round, app-controlled",
    desc: "Permanent roofline lighting installed once, controlled from your phone. 16 million colors. Holidays, sports, events — never install seasonal lights again.",
    forWho: "Residential · Commercial · Year-round visibility",
  },
  {
    id: "subscription",
    icon: "🛡️",
    title: "Property Shield Plans",
    tagline: "Maintenance on autopilot",
    desc: "Subscription-based exterior maintenance for homes and commercial properties. Quarterly washes, priority scheduling, locked-in rates. Set it and forget it.",
    forWho: "Busy professionals · Commercial · HOAs",
  },
];

const DIRT_BUSTERS_PACKAGES = [
  {
    icon: "👻",
    tier: "ENTRY LEVEL",
    name: "The Grime Fighter",
    tagline: "A quick grime knockout for your most-used surfaces",
    price: "149",
    color: C.greenGlow,
    features: [
      "Driveway & Sidewalk Pressure Wash",
      "Entryway & Porch Cleanup",
      "Surface Mold & Mildew Removal",
      "Before & After Photos Texted Same Day",
      "7-Day Satisfaction Guarantee",
    ],
    perfectFor: "Homeowners wanting a simple but effective refresh of high-traffic outdoor areas",
  },
  {
    icon: "👹",
    tier: "STANDARD",
    name: "The Gunk Eliminator",
    tagline: "More power, more shine — dirt is no match",
    price: "347",
    color: "#e8a020",
    popular: true,
    features: [
      "Full House Wash (Soft Wash — Siding & Brick Safe)",
      "Driveway & Sidewalk Pressure Wash",
      "Exterior Window Cleaning",
      "Patio or Deck Rinse",
      "Before & After Photos Texted Same Day",
      "7-Day Satisfaction Guarantee",
    ],
    perfectFor: "Those who want a noticeable facelift without breaking the bank",
  },
  {
    icon: "🦠",
    tier: "PREMIUM",
    name: "The Slime Slayer",
    tagline: "Dirt, algae, mold — consider them GONE",
    price: "547",
    color: "#dc2626",
    features: [
      "Everything in The Gunk Eliminator",
      "Roof Soft Wash (Removes Moss, Algae & Stains)",
      "Fence & Deck Cleaning",
      "Gutter Brightening & Wash",
      "Before & After Photos Texted Same Day",
      "7-Day Satisfaction Guarantee",
    ],
    perfectFor: "Homeowners wanting complete exterior restoration — like new again",
  },
  {
    icon: "🦸",
    tier: "ULTIMATE",
    name: "The Ghostbuster",
    tagline: "When dirt is out of control, call in the big guns",
    price: "697",
    color: "#9333ea",
    features: [
      "Everything in The Slime Slayer",
      "Commercial-Grade Deep Clean",
      "Full Gutter Clean-Out & Flush",
      "Post-Cleaning Protective Coatings",
      "Priority Booking + 15% Maintenance Discount",
      "Before & After + Property Health Report",
    ],
    perfectFor: "Homeowners, businesses, or real estate agents needing top-tier results",
  },
];

const SHIELD_PLANS = [
  {
    name: "Shield Basic",
    price: "79",
    period: "/month",
    annual: "$480+ in services",
    features: [
      "2 House Washes per year",
      "2 Driveway Washes per year",
      "Priority scheduling (within 5 business days)",
      "10% off any additional service",
      "Free re-service within 7 days",
    ],
    color: C.greenGlow,
  },
  {
    name: "Shield Pro",
    price: "149",
    period: "/month",
    annual: "$1,100+ in services",
    popular: true,
    features: [
      "Quarterly House Washes (4/year)",
      "3 Driveway/Patio Washes per year",
      "1 Full Window Cleaning (interior + exterior)",
      "Gutter Flush (spring + fall)",
      "Priority scheduling within 48 hours",
      "Seasonal property walkthrough",
      "15% off all add-ons",
    ],
    color: C.greenBright,
  },
  {
    name: "Shield Elite",
    price: "249",
    period: "/month",
    annual: "$3,600+ in services",
    features: [
      "Monthly property visit + spot cleaning",
      "Quarterly full house washes",
      "2 full window cleanings (in + out)",
      "Lawn maintenance (bi-weekly Apr–Oct)",
      "Gutter cleaning 2x/year",
      "Holiday lighting install + removal",
      "Same-week scheduling guaranteed",
      "Direct line to owner",
      "Annual property report",
    ],
    color: C.gold,
  },
];

const COMMERCIAL_PLANS = [
  {
    name: "Commercial Standard",
    price: "299",
    period: "/month",
    features: [
      "Monthly storefront/building exterior wash",
      "Monthly exterior window cleaning",
      "Monthly entryway & sidewalk wash",
      "Priority response within 48 hours",
      "Quarterly deep clean visit included",
      "15% off additional services",
    ],
  },
  {
    name: "Commercial Premier",
    price: "549",
    period: "/month",
    popular: true,
    features: [
      "Bi-weekly exterior maintenance visits",
      "Monthly full window cleaning (in + out)",
      "Monthly parking & dumpster pad wash",
      "Quarterly full building deep clean",
      "Minor graffiti removal included",
      "Same-week emergency scheduling",
      "Monthly photo report for owners",
      "20% off additional services",
      "Direct account contact",
    ],
  },
];

const TRUST_POINTS = [
  { num: "3+", label: "Years Serving Mid-MO" },
  { num: "5★", label: "Average Rating" },
  { num: "100%", label: "Satisfaction Guarantee" },
  { num: "24hr", label: "Response Time" },
];

const REASONS = [
  {
    icon: "🛡️",
    title: "100% Satisfaction Guarantee",
    desc: "We don't leave until you're happy. Not satisfied? We come back free within 7 days. No questions, no arguments.",
  },
  {
    icon: "🌿",
    title: "Eco-Friendly Solutions",
    desc: "Tough on grime, gentle on your surfaces, your landscaping, and your family. Biodegradable products on every job.",
  },
  {
    icon: "📸",
    title: "Before & After Every Job",
    desc: "Photos texted to you the same day. See the difference. Share with neighbors. Built-in proof of our work.",
  },
  {
    icon: "📍",
    title: "Locally Owned & Trusted",
    desc: "Built right here in mid-Missouri. Same crew, same standards, every time. We live where we work.",
  },
  {
    icon: "💼",
    title: "Licensed & Fully Insured",
    desc: "Commercial-grade insurance, bonded crew, and proper licensing. Required by serious commercial clients — protection for you.",
  },
  {
    icon: "⚡",
    title: "Same-Week Scheduling",
    desc: "Most jobs scheduled within 5 business days. Premier and Elite plan members get same-week guaranteed.",
  },
];

const SERVICE_AREA = [
  "Jefferson City", "Columbia", "Holts Summit", "St. Martins",
  "Wardsville", "Taos", "Fulton", "Ashland",
  "California", "Eldon", "Russellville", "Centertown",
];

// === STYLES ===
const fonts = {
  display: "'Bebas Neue', 'Impact', sans-serif",
  body: "'Inter', system-ui, sans-serif",
  accent: "'Bangers', 'Bebas Neue', sans-serif",
};

const styles = {
  app: {
    background: C.black,
    minHeight: "100vh",
    color: C.text,
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 1.6,
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 20px",
  },
};

// === NAV BAR ===
function Nav({ openQuoteForm }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLink = (id, label) => (
    <a href={`#${id}`} onClick={() => setOpen(false)} style={{
      color: C.textHi, textDecoration: "none", fontSize: 13, fontWeight: 600,
      letterSpacing: 1.5, textTransform: "uppercase", padding: "8px 4px",
      transition: "color 0.2s",
    }} onMouseEnter={e => e.target.style.color = C.greenBright}
       onMouseLeave={e => e.target.style.color = C.textHi}>{label}</a>
  );

  return (
    <>
      {/* Top promo bar */}
      <div style={{
        background: `linear-gradient(90deg, ${C.green}, ${C.greenBright}, ${C.green})`,
        color: C.white, textAlign: "center", padding: "8px 16px",
        fontSize: 12, fontWeight: 600, letterSpacing: 1,
      }}>
        🌿 SPRING SPECIAL: BOOK A HOUSE WASH + WINDOW CLEANING — GET 10% OFF
        <span style={{ margin: "0 8px" }}>·</span>
        <a href={`tel:${PHONE_RAW}`} style={{ color: C.white, textDecoration: "underline", fontWeight: 700 }}>CALL {PHONE}</a>
      </div>

      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: scrolled ? "rgba(10,10,10,0.95)" : C.black,
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : `1px solid transparent`,
        transition: "all 0.3s",
      }}>
        <div style={{ ...styles.container, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px" }}>
          <a href="#top" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            {/* Logo placeholder - SWAP IN YOUR ACTUAL LOGO */}
            <div style={{
              width: 44, height: 44, borderRadius: 8,
              background: `linear-gradient(135deg, ${C.green}, ${C.greenBright})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, fontWeight: 900, color: C.white,
              fontFamily: fonts.display, letterSpacing: -1,
              boxShadow: `0 0 20px ${C.greenBright}44`,
            }}>CC</div>
            <div>
              <div style={{ color: C.white, fontFamily: fonts.display, fontSize: 18, letterSpacing: 1.5, lineHeight: 1 }}>
                CAPITAL CITY
              </div>
              <div style={{ color: C.greenBright, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, marginTop: 2 }}>
                Pressure Washing & Window Cleaning
              </div>
            </div>
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="desktop-nav">
            <div style={{ display: "flex", gap: 24 }}>
              {navLink("services", "Services")}
              {navLink("packages", "Packages")}
              {navLink("plans", "Plans")}
              {navLink("about", "About")}
              {navLink("contact", "Contact")}
            </div>
            <a href={`tel:${PHONE_RAW}`} style={{
              padding: "10px 20px", borderRadius: 6,
              background: `linear-gradient(135deg, ${C.green}, ${C.greenBright})`,
              color: C.white, textDecoration: "none", fontSize: 13, fontWeight: 700,
              letterSpacing: 1, textTransform: "uppercase",
              boxShadow: `0 4px 16px ${C.greenBright}33`,
            }}>📞 {PHONE}</a>
          </div>

          <button onClick={() => setOpen(!open)} className="mobile-menu-btn" style={{
            background: "none", border: "none", color: C.white, fontSize: 28, cursor: "pointer",
            display: "none", padding: 0,
          }}>{open ? "✕" : "☰"}</button>
        </div>

        {open && (
          <div className="mobile-menu" style={{ background: C.ink, borderTop: `1px solid ${C.border}`, padding: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 16 }}>
              {navLink("services", "Services")}
              {navLink("packages", "Packages")}
              {navLink("plans", "Plans")}
              {navLink("about", "About")}
              {navLink("contact", "Contact")}
            </div>
            <a href={`tel:${PHONE_RAW}`} style={{
              display: "block", padding: "12px", borderRadius: 6, textAlign: "center",
              background: `linear-gradient(135deg, ${C.green}, ${C.greenBright})`,
              color: C.white, textDecoration: "none", fontWeight: 700, letterSpacing: 1,
            }}>📞 CALL {PHONE}</a>
          </div>
        )}
      </nav>
    </>
  );
}

// === HERO ===
function Hero({ openQuoteForm }) {
  return (
    <section id="top" style={{
      position: "relative",
      background: `radial-gradient(ellipse at top, ${C.charcoal} 0%, ${C.black} 70%)`,
      overflow: "hidden", padding: "60px 0 80px",
    }}>
      {/* Animated background glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.greenBright}15 0%, transparent 70%)`,
        filter: "blur(40px)", pointerEvents: "none",
      }} />

      <div style={{ ...styles.container, position: "relative", textAlign: "center" }}>
        <div style={{
          display: "inline-block", padding: "6px 16px", borderRadius: 20,
          background: `${C.greenBright}15`, border: `1px solid ${C.greenBright}44`,
          color: C.greenBright, fontSize: 11, fontWeight: 700, letterSpacing: 2,
          textTransform: "uppercase", marginBottom: 24,
        }}>
          ✦ Mid-Missouri's Premier Exterior Cleaning ✦
        </div>

        <h1 style={{
          fontFamily: fonts.display, fontSize: "clamp(48px, 9vw, 96px)",
          letterSpacing: 2, lineHeight: 0.95, color: C.white,
          margin: "0 0 20px", textShadow: `0 0 60px ${C.greenBright}44`,
        }}>
          TRANSFORM YOUR<br />
          <span style={{
            background: `linear-gradient(135deg, ${C.greenBright}, ${C.greenGlow})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>PROPERTY.</span>
        </h1>

        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)", color: C.text,
          maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.6,
        }}>
          Premium pressure washing, window cleaning, and exterior maintenance for high-end residential and commercial properties.
          <strong style={{ color: C.white }}> Results you can see from the street — guaranteed.</strong>
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
          <button onClick={openQuoteForm} style={{
            padding: "16px 32px", borderRadius: 8, border: "none",
            background: `linear-gradient(135deg, ${C.green}, ${C.greenBright})`,
            color: C.white, fontSize: 15, fontWeight: 700, letterSpacing: 1.5,
            textTransform: "uppercase", cursor: "pointer",
            boxShadow: `0 8px 32px ${C.greenBright}44`,
            transition: "transform 0.2s",
          }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
             onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            Get a Free Quote →
          </button>
          <a href={`tel:${PHONE_RAW}`} style={{
            padding: "16px 32px", borderRadius: 8,
            background: "transparent", border: `2px solid ${C.greenBright}`,
            color: C.greenBright, fontSize: 15, fontWeight: 700, letterSpacing: 1.5,
            textTransform: "uppercase", textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>📞 {PHONE}</a>
        </div>

        {/* Trust strip */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap",
          fontSize: 12, color: C.muted, fontWeight: 500,
        }}>
          {["✓ Licensed & Insured", "✓ 5-Star Rated", "✓ Locally Owned", "✓ Same-Week Service"].map(t => (
            <span key={t} style={{ color: C.text }}>{t}</span>
          ))}
        </div>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 16, marginTop: 60, maxWidth: 800, marginLeft: "auto", marginRight: "auto",
        }}>
          {TRUST_POINTS.map(t => (
            <div key={t.label} style={{
              padding: "20px 16px", borderRadius: 8,
              background: `linear-gradient(135deg, ${C.ink}, ${C.charcoal})`,
              border: `1px solid ${C.border}`, textAlign: "center",
            }}>
              <div style={{
                fontFamily: fonts.display, fontSize: 36, color: C.greenBright,
                lineHeight: 1, marginBottom: 6,
              }}>{t.num}</div>
              <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// === SECTION HEADER ===
function SectionHeader({ eyebrow, title, subtitle, accent = C.greenBright }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <div style={{
        color: accent, fontSize: 11, fontWeight: 700, letterSpacing: 3,
        textTransform: "uppercase", marginBottom: 12,
      }}>{eyebrow}</div>
      <h2 style={{
        fontFamily: fonts.display, fontSize: "clamp(36px, 5vw, 56px)",
        color: C.white, margin: "0 0 16px", letterSpacing: 1, lineHeight: 1.05,
      }}>{title}</h2>
      {subtitle && (
        <p style={{ fontSize: 16, color: C.text, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// === SERVICES ===
function Services() {
  return (
    <section id="services" style={{ padding: "80px 0", background: C.black }}>
      <div style={styles.container}>
        <SectionHeader
          eyebrow="What We Do"
          title="Five Services. One Premium Standard."
          subtitle="Built for high-end residential and commercial properties across mid-Missouri. Soft wash safe. Eco-friendly. Backed by our 100% satisfaction guarantee."
        />

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}>
          {SERVICES.map((s, i) => (
            <div key={s.id} style={{
              padding: 28, borderRadius: 12,
              background: `linear-gradient(135deg, ${C.ink} 0%, ${C.charcoal} 100%)`,
              border: `1px solid ${C.border}`,
              transition: "all 0.3s", cursor: "default",
              position: "relative", overflow: "hidden",
            }} onMouseEnter={e => {
              e.currentTarget.style.borderColor = C.greenBright;
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 20px 40px ${C.greenBright}22`;
            }} onMouseLeave={e => {
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{
                fontFamily: fonts.display, fontSize: 24, color: C.white,
                margin: "0 0 6px", letterSpacing: 1,
              }}>{s.title}</h3>
              <div style={{
                fontSize: 12, color: C.greenBright, fontWeight: 600,
                letterSpacing: 1, textTransform: "uppercase", marginBottom: 14,
              }}>{s.tagline}</div>
              <p style={{ fontSize: 14, color: C.text, lineHeight: 1.6, marginBottom: 16 }}>
                {s.desc}
              </p>
              <div style={{
                paddingTop: 14, borderTop: `1px solid ${C.border}`,
                fontSize: 11, color: C.muted, letterSpacing: 0.5,
              }}>
                <strong style={{ color: C.textHi }}>For:</strong> {s.forWho}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// === DIRT BUSTERS PACKAGES (Residential one-time) ===
function DirtBusters({ openQuoteForm }) {
  return (
    <section id="packages" style={{
      padding: "80px 0",
      background: `linear-gradient(180deg, ${C.black} 0%, ${C.ink} 50%, ${C.black} 100%)`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={styles.container}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            color: C.greenBright, fontSize: 11, fontWeight: 700, letterSpacing: 3,
            textTransform: "uppercase", marginBottom: 12,
          }}>Residential Packages</div>
          <h2 style={{
            fontFamily: fonts.accent, fontSize: "clamp(48px, 8vw, 80px)",
            color: C.white, margin: "0 0 8px", letterSpacing: 1, lineHeight: 0.95,
            textTransform: "uppercase",
            background: `linear-gradient(135deg, #b8b8b8, ${C.greenBright})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: `0 0 60px ${C.greenBright}44`,
          }}>
            Dirt Busters
          </h2>
          <div style={{
            fontFamily: fonts.accent, fontSize: 18, color: C.greenBright,
            fontStyle: "italic", letterSpacing: 1, marginBottom: 12,
          }}>
            "Fighting Grime, One Wash at a Time"
          </div>
          <p style={{ fontSize: 16, color: C.text, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            Four packages. From quick refresh to ultimate deep clean. Every job comes with same-day photos and our 7-day satisfaction guarantee.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}>
          {DIRT_BUSTERS_PACKAGES.map((p, i) => (
            <div key={p.name} style={{
              position: "relative",
              background: C.ink, borderRadius: 12,
              border: `2px solid ${p.popular ? p.color : C.border}`,
              padding: 24, transition: "all 0.3s",
              boxShadow: p.popular ? `0 0 40px ${p.color}33` : "none",
            }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
               onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              {p.popular && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: p.color, color: C.white, fontSize: 10, fontWeight: 700,
                  letterSpacing: 1.5, textTransform: "uppercase", padding: "4px 12px",
                  borderRadius: 12,
                }}>Most Popular</div>
              )}
              <div style={{ fontSize: 40, marginBottom: 8 }}>{p.icon}</div>
              <div style={{
                fontSize: 10, color: p.color, fontWeight: 700, letterSpacing: 2,
                textTransform: "uppercase", marginBottom: 6,
              }}>{p.tier}</div>
              <h3 style={{
                fontFamily: fonts.accent, fontSize: 26, color: C.white,
                margin: "0 0 6px", letterSpacing: 0.5,
              }}>{p.name}</h3>
              <div style={{ fontSize: 12, color: C.muted, fontStyle: "italic", marginBottom: 16, minHeight: 36 }}>
                "{p.tagline}"
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: C.muted }}>FROM</span>
                <span style={{ fontFamily: fonts.display, fontSize: 44, color: p.color, lineHeight: 1 }}>${p.price}</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{
                    fontSize: 13, color: C.text, padding: "6px 0",
                    borderBottom: j < p.features.length - 1 ? `1px solid ${C.border}` : "none",
                    display: "flex", gap: 8,
                  }}>
                    <span style={{ color: p.color, flexShrink: 0 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <div style={{
                fontSize: 11, color: C.muted, marginBottom: 16, lineHeight: 1.5,
                paddingTop: 14, borderTop: `1px solid ${C.border}`,
              }}>
                <strong style={{ color: C.textHi }}>Perfect for:</strong> {p.perfectFor}
              </div>
              <button onClick={openQuoteForm} style={{
                width: "100%", padding: "12px", borderRadius: 6, border: "none",
                background: p.color, color: C.white,
                fontSize: 12, fontWeight: 700, letterSpacing: 1.5,
                textTransform: "uppercase", cursor: "pointer",
              }}>Book This Package</button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 36, fontSize: 13, color: C.muted }}>
          Add-ons available: Rust removal · Paver sealing · Deck staining · Interior windows · Graffiti removal
        </div>
      </div>
    </section>
  );
}

// === PROPERTY SHIELD PLANS (subscription) ===
function ShieldPlans({ openQuoteForm }) {
  const [tab, setTab] = useState("residential");

  return (
    <section id="plans" style={{
      padding: "80px 0",
      background: `linear-gradient(180deg, ${C.black} 0%, ${C.charcoal} 100%)`,
    }}>
      <div style={styles.container}>
        <SectionHeader
          eyebrow="Property Shield Plans"
          title="Maintenance on Autopilot."
          subtitle="Set it and forget it. Locked-in rates, priority scheduling, and your property always looking sharp. Cancel anytime with 30 days notice."
        />

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 36 }}>
          {[
            { id: "residential", label: "🏠 Residential" },
            { id: "commercial", label: "🏢 Commercial" },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "12px 24px", borderRadius: 8, border: "none",
              background: tab === t.id ? C.greenBright : C.ink,
              color: tab === t.id ? C.white : C.text,
              fontSize: 13, fontWeight: 700, letterSpacing: 1,
              textTransform: "uppercase", cursor: "pointer",
              transition: "all 0.2s",
            }}>{t.label}</button>
          ))}
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: tab === "commercial" ? "repeat(auto-fit, minmax(280px, 1fr))" : "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16, maxWidth: tab === "commercial" ? 800 : 1100, margin: "0 auto",
        }}>
          {(tab === "residential" ? SHIELD_PLANS : COMMERCIAL_PLANS).map(plan => (
            <div key={plan.name} style={{
              position: "relative",
              background: plan.popular ? `linear-gradient(135deg, ${C.ink}, ${C.charcoal})` : C.ink,
              border: `2px solid ${plan.popular ? C.greenBright : C.border}`,
              borderRadius: 12, padding: 28,
              boxShadow: plan.popular ? `0 0 40px ${C.greenBright}33` : "none",
            }}>
              {plan.popular && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: C.greenBright, color: C.white, fontSize: 10, fontWeight: 700,
                  letterSpacing: 1.5, textTransform: "uppercase", padding: "4px 14px",
                  borderRadius: 12,
                }}>Most Popular</div>
              )}
              <h3 style={{
                fontFamily: fonts.display, fontSize: 28, color: C.white,
                margin: "0 0 8px", letterSpacing: 1,
              }}>{plan.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                <span style={{ fontFamily: fonts.display, fontSize: 48, color: plan.color || C.greenBright, lineHeight: 1 }}>${plan.price}</span>
                <span style={{ color: C.muted, fontSize: 14 }}>{plan.period}</span>
              </div>
              {plan.annual && (
                <div style={{
                  fontSize: 12, color: C.greenBright, fontWeight: 600,
                  background: `${C.greenBright}15`, display: "inline-block",
                  padding: "4px 10px", borderRadius: 4, marginBottom: 16,
                }}>{plan.annual} annual value</div>
              )}
              <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 24px" }}>
                {plan.features.map((f, i) => (
                  <li key={i} style={{
                    fontSize: 13, color: C.text, padding: "8px 0",
                    display: "flex", gap: 10, alignItems: "flex-start",
                  }}>
                    <span style={{ color: plan.color || C.greenBright, flexShrink: 0, fontSize: 14 }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={openQuoteForm} style={{
                width: "100%", padding: "14px", borderRadius: 6, border: "none",
                background: plan.popular
                  ? `linear-gradient(135deg, ${C.green}, ${C.greenBright})`
                  : "transparent",
                color: plan.popular ? C.white : C.greenBright,
                border: plan.popular ? "none" : `1px solid ${C.greenBright}`,
                fontSize: 13, fontWeight: 700, letterSpacing: 1.5,
                textTransform: "uppercase", cursor: "pointer",
              }}>Get Started</button>
            </div>
          ))}
        </div>

        <div style={{
          textAlign: "center", marginTop: 36, fontSize: 13, color: C.muted, lineHeight: 1.7,
        }}>
          All plans include: <strong style={{ color: C.text }}>priority scheduling · free re-service · discount on extras · cancel anytime</strong>
          <br />Plans billed every 4 weeks (13 cycles/year). No setup fee when you prepay annually.
        </div>
      </div>
    </section>
  );
}

// === GALLERY (placeholder for before/after photos) ===
function Gallery() {
  const placeholders = [
    { label: "House Wash", color: C.greenBright },
    { label: "Driveway Restoration", color: "#e8a020" },
    { label: "Window Cleaning", color: "#5ba3d0" },
    { label: "Roof Soft Wash", color: "#dc2626" },
    { label: "Commercial Storefront", color: "#9333ea" },
    { label: "Holiday Lighting", color: C.gold },
  ];
  return (
    <section id="gallery" style={{ padding: "80px 0", background: C.black }}>
      <div style={styles.container}>
        <SectionHeader
          eyebrow="The Proof"
          title="Before & After"
          subtitle="Every job documented. Every result visible from the street. This is what we deliver."
        />
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}>
          {placeholders.map((p, i) => (
            <div key={i} style={{
              aspectRatio: "1/1", borderRadius: 8, overflow: "hidden",
              background: `linear-gradient(135deg, ${C.charcoal}, ${C.ink})`,
              border: `1px solid ${C.border}`, position: "relative",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {/* SWAP IN: Before/after photos go here */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(135deg, ${p.color}11 0%, transparent 100%)`,
              }} />
              <div style={{ textAlign: "center", padding: 20 }}>
                <div style={{ fontSize: 30, marginBottom: 8, opacity: 0.5 }}>📸</div>
                <div style={{
                  fontSize: 12, color: C.muted, letterSpacing: 1,
                  textTransform: "uppercase", fontWeight: 600,
                }}>{p.label}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 6, opacity: 0.6 }}>
                  [photo placeholder]
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: C.muted, fontStyle: "italic" }}>
          Photos coming soon. Replace placeholders with real before/after shots in <code style={{ color: C.greenBright }}>/public/gallery/</code>
        </div>
      </div>
    </section>
  );
}

// === WHY US ===
function WhyUs() {
  return (
    <section id="about" style={{
      padding: "80px 0",
      background: `linear-gradient(180deg, ${C.black} 0%, ${C.ink} 100%)`,
    }}>
      <div style={styles.container}>
        <SectionHeader
          eyebrow="Why Capital City"
          title="The Premium Choice in Mid-Missouri."
          subtitle="Most companies wash stuff. We restore properties. Different standard. Different result."
        />
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}>
          {REASONS.map((r, i) => (
            <div key={i} style={{
              padding: 24, borderRadius: 8,
              background: C.charcoal, border: `1px solid ${C.border}`,
            }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{r.icon}</div>
              <h3 style={{
                fontFamily: fonts.display, fontSize: 20, color: C.white,
                margin: "0 0 10px", letterSpacing: 0.5,
              }}>{r.title}</h3>
              <p style={{ fontSize: 14, color: C.text, lineHeight: 1.6 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// === GUARANTEE ===
function Guarantee() {
  return (
    <section style={{ padding: "60px 20px", background: C.black }}>
      <div style={{
        maxWidth: 800, margin: "0 auto", padding: 40, borderRadius: 16,
        background: `linear-gradient(135deg, ${C.green}11, ${C.greenBright}11)`,
        border: `2px solid ${C.greenBright}`, textAlign: "center",
        boxShadow: `0 0 60px ${C.greenBright}22`,
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🛡️</div>
        <h2 style={{
          fontFamily: fonts.display, fontSize: "clamp(32px, 5vw, 48px)",
          color: C.white, margin: "0 0 16px", letterSpacing: 1, lineHeight: 1.1,
        }}>
          The 100% Clean Guarantee
        </h2>
        <p style={{ fontSize: 18, color: C.text, lineHeight: 1.6, maxWidth: 600, margin: "0 auto" }}>
          Not satisfied? Contact us within 7 days and we'll come back and redo the work — no charge, no questions, no arguments.
          <br /><br />
          <strong style={{ color: C.greenBright }}>We don't leave until you're proud of how your property looks.</strong>
        </p>
      </div>
    </section>
  );
}

// === SERVICE AREA ===
function ServiceArea() {
  return (
    <section style={{ padding: "60px 0", background: C.ink }}>
      <div style={styles.container}>
        <SectionHeader
          eyebrow="Where We Work"
          title="Serving Mid-Missouri"
        />
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center",
          maxWidth: 800, margin: "0 auto",
        }}>
          {SERVICE_AREA.map(city => (
            <span key={city} style={{
              padding: "8px 16px", borderRadius: 20,
              background: C.charcoal, border: `1px solid ${C.border}`,
              fontSize: 13, color: C.text, fontWeight: 500,
            }}>📍 {city}</span>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: C.muted }}>
          Don't see your city? <a href={`tel:${PHONE_RAW}`} style={{ color: C.greenBright, textDecoration: "none" }}>Call us</a> — we likely cover your area.
        </div>
      </div>
    </section>
  );
}

// === CONTACT FORM ===
function ContactForm({ open, onClose }) {
  const [data, setData] = useState({
    name: "", phone: "", email: "", service: "", propertyType: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.phone) {
      setErr("Name and phone are required");
      return;
    }
    setSubmitting(true);
    setErr("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setDone(true);
      } else {
        const errData = await res.json();
        setErr(errData.error || "Something went wrong. Please call us directly.");
      }
    } catch {
      setErr("Connection error. Please call us at " + PHONE);
    }
    setSubmitting(false);
  };

  if (!open) return null;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(8px)", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16, overflow: "auto",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: C.ink, borderRadius: 12, maxWidth: 540, width: "100%",
        border: `1px solid ${C.greenBright}`, position: "relative",
        boxShadow: `0 20px 60px ${C.greenBright}22`,
        maxHeight: "90vh", overflow: "auto",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, background: "none", border: "none",
          color: C.muted, fontSize: 24, cursor: "pointer", padding: 0, width: 32, height: 32,
        }}>✕</button>

        <div style={{ padding: "28px 28px 20px", borderBottom: `1px solid ${C.border}` }}>
          <h2 style={{
            fontFamily: fonts.display, fontSize: 32, color: C.white,
            margin: "0 0 6px", letterSpacing: 1,
          }}>Get Your Free Quote</h2>
          <p style={{ fontSize: 14, color: C.text, margin: 0 }}>
            We'll respond within 2 hours during business hours. Same-week scheduling available.
          </p>
        </div>

        {done ? (
          <div style={{ padding: 36, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontFamily: fonts.display, fontSize: 28, color: C.white, margin: "0 0 12px" }}>
              Quote Request Received!
            </h3>
            <p style={{ fontSize: 15, color: C.text, lineHeight: 1.6 }}>
              We'll be in touch within 2 hours. For urgent inquiries, call us directly:
            </p>
            <a href={`tel:${PHONE_RAW}`} style={{
              display: "inline-block", marginTop: 16, padding: "14px 28px",
              borderRadius: 8, background: C.greenBright, color: C.white,
              textDecoration: "none", fontWeight: 700, letterSpacing: 1,
            }}>📞 {PHONE}</a>
          </div>
        ) : (
          <form onSubmit={submit} style={{ padding: 28 }}>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Name *</label>
              <input value={data.name} onChange={e => setData({ ...data, name: e.target.value })}
                placeholder="Your name" style={inputStyle} required />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div>
                <label style={labelStyle}>Phone *</label>
                <input type="tel" value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })}
                  placeholder="(573) 555-1234" style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })}
                  placeholder="you@example.com" style={inputStyle} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div>
                <label style={labelStyle}>Service Interest</label>
                <select value={data.service} onChange={e => setData({ ...data, service: e.target.value })} style={inputStyle}>
                  <option value="">Choose...</option>
                  <option>Pressure Washing</option>
                  <option>Window Cleaning</option>
                  <option>House Wash</option>
                  <option>Holiday Lighting</option>
                  <option>Permanent Lighting</option>
                  <option>Property Shield Plan</option>
                  <option>Commercial Maintenance</option>
                  <option>Multiple Services</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Property Type</label>
                <select value={data.propertyType} onChange={e => setData({ ...data, propertyType: e.target.value })} style={inputStyle}>
                  <option value="">Choose...</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>HOA / Multi-property</option>
                  <option>Real Estate Pre-listing</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Message (optional)</label>
              <textarea value={data.message} onChange={e => setData({ ...data, message: e.target.value })}
                placeholder="Property address, square footage, any specific concerns..."
                rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            {err && (
              <div style={{
                padding: 10, marginBottom: 14, borderRadius: 6,
                background: "#dc262622", border: "1px solid #dc2626",
                color: "#fca5a5", fontSize: 13,
              }}>{err}</div>
            )}

            <button type="submit" disabled={submitting} style={{
              width: "100%", padding: 14, borderRadius: 8, border: "none",
              background: submitting ? C.muted : `linear-gradient(135deg, ${C.green}, ${C.greenBright})`,
              color: C.white, fontSize: 14, fontWeight: 700, letterSpacing: 1.5,
              textTransform: "uppercase", cursor: submitting ? "wait" : "pointer",
              boxShadow: `0 8px 24px ${C.greenBright}33`,
            }}>
              {submitting ? "Sending..." : "Send Quote Request →"}
            </button>

            <div style={{ marginTop: 16, textAlign: "center", fontSize: 12, color: C.muted }}>
              Or call directly: <a href={`tel:${PHONE_RAW}`} style={{ color: C.greenBright, textDecoration: "none", fontWeight: 600 }}>{PHONE}</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block", fontSize: 11, color: C.muted, letterSpacing: 1,
  textTransform: "uppercase", marginBottom: 6, fontWeight: 600,
};

const inputStyle = {
  width: "100%", background: C.charcoal, border: `1px solid ${C.border}`,
  borderRadius: 6, padding: "10px 14px", color: C.white, fontSize: 14,
  outline: "none", fontFamily: fonts.body, transition: "border-color 0.2s",
};

// === FINAL CTA ===
function FinalCTA({ openQuoteForm }) {
  return (
    <section id="contact" style={{
      padding: "100px 20px", textAlign: "center",
      background: `radial-gradient(ellipse at center, ${C.charcoal} 0%, ${C.black} 70%)`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: "30% 0 30% 0",
        background: `radial-gradient(ellipse, ${C.greenBright}11 0%, transparent 70%)`,
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: fonts.display, fontSize: "clamp(40px, 7vw, 72px)",
          color: C.white, margin: "0 0 20px", letterSpacing: 1, lineHeight: 1.05,
        }}>
          Ready for a clean<br />
          <span style={{
            background: `linear-gradient(135deg, ${C.greenBright}, ${C.greenGlow})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>you're proud of?</span>
        </h2>
        <p style={{ fontSize: 18, color: C.text, marginBottom: 32 }}>
          Get your free quote today. No pressure, no obligation. We respond within 2 hours.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={openQuoteForm} style={{
            padding: "16px 32px", borderRadius: 8, border: "none",
            background: `linear-gradient(135deg, ${C.green}, ${C.greenBright})`,
            color: C.white, fontSize: 15, fontWeight: 700, letterSpacing: 1.5,
            textTransform: "uppercase", cursor: "pointer",
            boxShadow: `0 8px 32px ${C.greenBright}44`,
          }}>Get Free Quote →</button>
          <a href={`tel:${PHONE_RAW}`} style={{
            padding: "16px 32px", borderRadius: 8,
            background: "transparent", border: `2px solid ${C.greenBright}`,
            color: C.greenBright, fontSize: 15, fontWeight: 700, letterSpacing: 1.5,
            textTransform: "uppercase", textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>📞 {PHONE}</a>
        </div>
      </div>
    </section>
  );
}

// === FOOTER ===
function Footer() {
  return (
    <footer style={{
      background: C.ink, borderTop: `1px solid ${C.border}`,
      padding: "60px 20px 30px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 40, marginBottom: 40,
        }}>
          <div>
            <div style={{
              fontFamily: fonts.display, fontSize: 22, color: C.white,
              letterSpacing: 1.5, marginBottom: 6,
            }}>CAPITAL CITY</div>
            <div style={{ fontSize: 11, color: C.greenBright, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16 }}>
              Pressure Washing & Window Cleaning
            </div>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
              Mid-Missouri's premier exterior cleaning company. Premium service for homes and businesses that demand the best.
            </p>
          </div>
          <div>
            <div style={footerHead}>Services</div>
            <div style={footerLinks}>
              {SERVICES.map(s => <a key={s.id} href={`#services`} style={footerLink}>{s.title}</a>)}
            </div>
          </div>
          <div>
            <div style={footerHead}>Service Area</div>
            <div style={footerLinks}>
              {SERVICE_AREA.slice(0, 8).map(c => <span key={c} style={{ ...footerLink, cursor: "default" }}>{c}, MO</span>)}
            </div>
          </div>
          <div>
            <div style={footerHead}>Contact</div>
            <div style={footerLinks}>
              <a href={`tel:${PHONE_RAW}`} style={footerLink}>📞 {PHONE}</a>
              <span style={{ ...footerLink, cursor: "default" }}>📍 Jefferson City, MO</span>
              <span style={{ ...footerLink, cursor: "default" }}>🌐 Serving Mid-Missouri</span>
              <span style={{ ...footerLink, cursor: "default" }}>⏱️ Same-week scheduling</span>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: 24, borderTop: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          fontSize: 11, color: C.muted, letterSpacing: 1,
        }}>
          <div>© 2026 Capital City Pressure Washing & Window Cleaning LLC. All rights reserved.</div>
          <div>Licensed · Insured · Locally Owned</div>
        </div>
      </div>
    </footer>
  );
}

const footerHead = {
  fontSize: 12, color: C.greenBright, fontWeight: 700, letterSpacing: 2,
  textTransform: "uppercase", marginBottom: 14,
};

const footerLinks = {
  display: "flex", flexDirection: "column", gap: 8,
};

const footerLink = {
  fontSize: 13, color: C.text, textDecoration: "none", lineHeight: 1.5,
};

// === STICKY MOBILE CTA ===
function MobileStickyCTA({ openQuoteForm }) {
  return (
    <div className="mobile-sticky-cta" style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40,
      background: C.ink, borderTop: `1px solid ${C.border}`,
      padding: "10px 12px", display: "none", gap: 8,
      paddingBottom: "calc(10px + env(safe-area-inset-bottom))",
    }}>
      <a href={`tel:${PHONE_RAW}`} style={{
        flex: 1, padding: 12, borderRadius: 6, border: `1px solid ${C.greenBright}`,
        background: "transparent", color: C.greenBright, textDecoration: "none",
        textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: 1,
      }}>📞 CALL</a>
      <button onClick={openQuoteForm} style={{
        flex: 2, padding: 12, borderRadius: 6, border: "none",
        background: `linear-gradient(135deg, ${C.green}, ${C.greenBright})`,
        color: C.white, fontSize: 12, fontWeight: 700, letterSpacing: 1,
      }}>FREE QUOTE →</button>
    </div>
  );
}

// === MAIN APP ===
export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const openQuoteForm = () => setQuoteOpen(true);

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800;900&family=Bangers&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: ${C.black}; -webkit-font-smoothing: antialiased; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${C.black}; }
        ::-webkit-scrollbar-thumb { background: ${C.steel}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.borderHi}; }
        button:focus, input:focus, textarea:focus, select:focus { outline: 2px solid ${C.greenBright}66; outline-offset: 2px; }
        input::placeholder, textarea::placeholder { color: ${C.muted}; }

        @media (max-width: 880px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .mobile-sticky-cta { display: flex !important; }
        }
        @media (min-width: 881px) {
          .mobile-menu { display: none !important; }
        }

        section { padding-bottom: 80px; }
        @media (max-width: 600px) {
          section { padding: 50px 0 60px !important; }
          h1 { letter-spacing: 1px !important; }
        }
      `}</style>

      <Nav openQuoteForm={openQuoteForm} />
      <Hero openQuoteForm={openQuoteForm} />
      <Services />
      <DirtBusters openQuoteForm={openQuoteForm} />
      <ShieldPlans openQuoteForm={openQuoteForm} />
      <Gallery />
      <WhyUs />
      <Guarantee />
      <ServiceArea />
      <FinalCTA openQuoteForm={openQuoteForm} />
      <Footer />

      <ContactForm open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      <MobileStickyCTA openQuoteForm={openQuoteForm} />
    </div>
  );
}
