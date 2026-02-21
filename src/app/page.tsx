"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

interface JwtPayload {
  exp?: number;
}

function getCookie(name: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
}

function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
}

export default function LandingPage() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = {
      bodyBg: document.body.style.background,
      bodyColor: document.body.style.color,
      htmlBg: document.documentElement.style.background,
    };
    document.body.style.background = "#070b14";
    document.body.style.color = "#e2e8f0";
    document.documentElement.style.background = "#070b14";
    return () => {
      document.body.style.background = prev.bodyBg;
      document.body.style.color = prev.bodyColor;
      document.documentElement.style.background = prev.htmlBg;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    const token = getCookie("access_token");
    console.log("Get Started clicked. Access token:", token);
    if (token && !isTokenExpired(token)) {
      router.push("/dashboard");
    } else {
      router.push("/user-login");
    }
  };

  const features = [
    {
      number: "01",
      icon: "◈",
      title: "Digitize Documents",
      description:
        "Transform paper records into intelligent digital assets with advanced OCR trained on Kenyan handwriting, stamps, and legal templates — across English, Kiswahili, and Sheng.",
      tags: ["OCR Technology", "Multi-language", "Auto-classify"],
      accent: "#d4a843",
    },
    {
      number: "02",
      icon: "◉",
      title: "Verify & Validate",
      description:
        "Real-time document authentication with AI-powered fraud detection, tamper analysis, and a full backend audit trail from submission to judgment. Cross-checks with KRA, NTSA, NLC and more.",
      tags: ["AI Fraud Detection", "Audit Trail", "Registry Cross-check"],
      accent: "#10b981",
    },
    {
      number: "03",
      icon: "◎",
      title: "Ask Questions",
      description:
        "Conversational AI for instant answers from your judicial data. Natural language queries across millions of legal records, rulings, and statutes — with cited sources.",
      tags: ["Natural Language", "Instant Answers", "Smart Search"],
      accent: "#60a5fa",
    },
    {
      number: "04",
      icon: "◐",
      title: "Predict Trends",
      description:
        "Forecast case timelines, assess resource allocation, and surface emerging legal patterns before they become crises. Evidence-based planning powered by ML.",
      tags: ["Analytics", "Forecasting", "Patterns"],
      accent: "#c084fc",
    },
  ];

  const stats = [
    { number: "1.2M+", label: "Documents Processed" },
    { number: "500K+", label: "Cases Tracked" },
    { number: "0.8s", label: "Avg Verification" },
    { number: "99.2%", label: "Success Rate" },
  ];

  const marqueeItems = [
    "Document Digitization",
    "AI Fraud Detection",
    "Predictive Analytics",
    "Case Timeline Forecasting",
    "OCR Technology",
    "Judicial Intelligence",
    "Registry Cross-checks",
    "Natural Language Search",
    "Resource Planning",
  ];

  return (
    <div
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} landing-root`}
      style={{ background: "#070b14", minHeight: "100vh", color: "#e2e8f0" }}
    >
      {/* NAV */}
      <nav className={`lp-nav${scrollY > 40 ? " scrolled" : ""}`}>
        <div className="lp-nav-logo">
          <div className="lp-nav-logo-mark">S</div>
          <span className="lp-nav-logo-text">Sheria</span>
        </div>
        <div className="lp-nav-links">
          <button className="lp-nav-link">Features</button>
          <button className="lp-nav-link">About</button>
          <button className="lp-nav-link">Technology</button>
          <button className="lp-nav-cta" onClick={handleGetStarted}>
            Get Started →
          </button>
        </div>
      </nav>

      <section className="lp-hero" ref={heroRef}>
        <div className="lp-hero-bg" />
        <div className="lp-hero-grid" />
        <div className="lp-hero-content">
          <div className="lp-hero-eyebrow">
            <div className="lp-hero-eyebrow-dot">⚡</div>
            <span className="lp-hero-eyebrow-text">
              AI-Powered Judicial Intelligence
            </span>
          </div>
          <h1 className="lp-hero-title">
            Modernizing Kenya&apos;s
            <br />
            <span className="lp-hero-title-accent">Justice System</span>
          </h1>
          <p className="lp-hero-sub">
            Intelligent document management, real-time verification, and
            predictive analytics — built for faster, fairer, more transparent
            justice.
          </p>
          <div className="lp-hero-actions">
            <button className="lp-btn-primary" onClick={handleGetStarted}>
              Get Started <span className="lp-btn-arrow">→</span>
            </button>
            <button className="lp-btn-secondary">▷ Watch Demo</button>
          </div>
          <div className="lp-stats-ribbon">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="lp-stat-number">{s.number}</div>
                <div className="lp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lp-hero-visual">
          <div className="lp-floating-card">
            <div className="lp-card-header">
              <div
                className="lp-card-icon"
                style={{ background: "rgba(212,168,67,0.15)" }}
              >
                📄
              </div>
              <div>
                <div className="lp-card-title">Document OCR</div>
                <div className="lp-card-meta">Processing complete</div>
              </div>
            </div>
            <div className="lp-card-value">847 pages</div>
            <span className="lp-card-badge lp-badge-green">✓ Digitized</span>
            <div className="lp-progress-bar">
              <div
                className="lp-progress-fill"
                style={{ width: "94%", background: "#10b981" }}
              />
            </div>
          </div>
          <div className="lp-floating-card">
            <div className="lp-card-header">
              <div
                className="lp-card-icon"
                style={{ background: "rgba(16,185,129,0.15)" }}
              >
                ⚖️
              </div>
              <div>
                <div className="lp-card-title">Case Prediction</div>
                <div className="lp-card-meta">ML Model v3.2</div>
              </div>
            </div>
            <div className="lp-card-value">~4.2 months</div>
            <span className="lp-card-badge lp-badge-gold">92% confidence</span>
            <div className="lp-progress-bar">
              <div
                className="lp-progress-fill"
                style={{ width: "92%", background: "#d4a843" }}
              />
            </div>
          </div>
          <div className="lp-floating-card">
            <div className="lp-card-header">
              <div
                className="lp-card-icon"
                style={{ background: "rgba(96,165,250,0.15)" }}
              >
                🔍
              </div>
              <div>
                <div className="lp-card-title">Fraud Detection</div>
                <div className="lp-card-meta">AI Anomaly Scan</div>
              </div>
            </div>
            <div
              className="lp-card-value"
              style={{ fontSize: "1rem", marginTop: "4px" }}
            >
              No anomalies found
            </div>
            <span className="lp-card-badge lp-badge-green">✓ Authentic</span>
          </div>
        </div>
      </section>

      <div className="lp-marquee-section">
        <div className="lp-marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div className="lp-marquee-item" key={i}>
              <div className="lp-marquee-dot" /> {item}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="lp-section">
        <div className="lp-section-label">Core Modules</div>
        <h2 className="lp-section-title">
          Four pillars of
          <br />
          judicial transformation
        </h2>
        <p className="lp-section-sub">
          An integrated suite designed to modernize every layer of Kenya&apos;s
          justice system.
        </p>
        <div className="lp-features-grid">
          {features.map((f, i) => (
            <div className="lp-feature-card" key={i}>
              <div className="lp-feature-number">{f.number}</div>
              <div className="lp-feature-icon" style={{ color: f.accent }}>
                {f.icon}
              </div>
              <div className="lp-feature-title">{f.title}</div>
              <p className="lp-feature-desc">{f.description}</p>
              <div className="lp-feature-tags">
                {f.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="lp-feature-tag"
                    style={{
                      borderColor: `${f.accent}40`,
                      color: f.accent,
                      background: `${f.accent}10`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lp-divider" />

      <div className="lp-section">
        <div className="lp-section-label">Technology</div>
        <h2 className="lp-section-title">
          Built on world-class
          <br />
          infrastructure
        </h2>
        <div className="lp-tech-grid">
          {[
            {
              category: "Frontend",
              name: "Next.js · TypeScript · Material-UI",
            },
            { category: "Backend", name: "Python · FastAPI · LangChain" },
            { category: "Database", name: "PostgreSQL · ChromaDB Vector" },
            { category: "ML / AI", name: "Qwen LLM · Scikit-Learn · Ollama" },
            {
              category: "Infrastructure",
              name: "Docker · Nginx · MinIO · Redis",
            },
            { category: "Processing", name: "Tesseract OCR · Celery Queue" },
          ].map((item, i) => (
            <div className="lp-tech-card" key={i}>
              <div className="lp-tech-category">{item.category}</div>
              <div className="lp-tech-name">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="lp-cta-section">
        <div className="lp-cta-card">
          <div className="lp-cta-content">
            <h2 className="lp-cta-title">
              Ready to transform
              <br />
              <em>Kenya&apos;s justice?</em>
            </h2>
            <p className="lp-cta-sub">
              Join us in building a faster, fairer, and more transparent
              judicial system powered by AI.
            </p>
            <div className="lp-cta-actions">
              <button className="lp-btn-primary" onClick={handleGetStarted}>
                Get Started Today <span className="lp-btn-arrow">→</span>
              </button>
              <button className="lp-btn-secondary">Schedule a Demo</button>
            </div>
          </div>
        </div>
      </div>

      <footer className="lp-footer">
        <div className="lp-footer-top">
          <div>
            <div className="lp-nav-logo-mark">S</div>
            <div className="lp-footer-brand-name">Sheria</div>
            <div className="lp-footer-brand-desc">
              Smart governance for Kenya&apos;s justice system — built with AI,
              built for people.
            </div>
          </div>
          <div>
            <div className="lp-footer-col-title">Product</div>
            {["Digitize", "Verify", "Ask", "Predict"].map((l) => (
              <a key={l} className="lp-footer-link">
                {l}
              </a>
            ))}
          </div>
          <div>
            <div className="lp-footer-col-title">Company</div>
            {["About Us", "Blog", "Careers", "Contact"].map((l) => (
              <a key={l} className="lp-footer-link">
                {l}
              </a>
            ))}
          </div>
          <div>
            <div className="lp-footer-col-title">Legal</div>
            {["Privacy Policy", "Terms of Service", "Security"].map((l) => (
              <a key={l} className="lp-footer-link">
                {l}
              </a>
            ))}
          </div>
        </div>
        <div className="lp-footer-bottom">
          <div className="lp-footer-copy">
            © 2025 Sheria Platform. All rights reserved.
          </div>
          <div className="lp-footer-badge">
            <div className="lp-footer-badge-dot" />
            All systems operational 
          </div>
        </div>
      </footer>
    </div>
  );
}
