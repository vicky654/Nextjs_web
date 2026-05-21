import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import HomeFooter from "@/components/home/HomeFooter";
import ServicesSection from "@/components/home/ServicesSection";
import { SERVICES } from "@/lib/constants";
import { buildPageMeta } from "@/lib/seo";

export const metadata: Metadata = buildPageMeta({
  title: "Data Protection Services | DPDP & GDPR Consulting",
  description:
    "Explore our comprehensive data protection and privacy consulting services — DPDP compliance, GDPR advisory, DPIA, third-party assessments, and more.",
  keywords:
    "data protection services, DPDP compliance consulting, GDPR advisory services, privacy consulting India",
  canonicalPath: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main style={{ background: "var(--hp-dark)" }}>
        {/* Hero */}
        <section
          style={{
            background:
              "linear-gradient(160deg, #060d18 0%, #0d1f3c 50%, #060d18 100%)",
            padding: "7rem 1.5rem 5rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 700,
              height: 500,
              background:
                "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.25)",
                borderRadius: 100,
                padding: "0.35rem 1rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#60a5fa",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              What We Offer
            </div>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}
            >
              Expert Data Protection
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Consulting Services
              </span>
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#94a3b8",
                lineHeight: 1.7,
                maxWidth: 580,
                margin: "0 auto",
              }}
            >
              End-to-end privacy consulting to help your organization achieve
              and maintain compliance with DPDP Act, GDPR, and global data
              protection regulations.
            </p>
          </div>
        </section>

        {/* Services grid — reuses the dark-themed homepage component */}
        <ServicesSection services={SERVICES} />

        {/* CTA */}
        <section
          style={{
            background:
              "linear-gradient(135deg, #0d1f3c 0%, #1e3a5f 50%, #0d1f3c 100%)",
            padding: "5rem 1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
              }}
            >
              Need Help with Compliance?
            </h2>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Contact us today to discuss your data protection requirements and
              get a tailored compliance roadmap.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/contact-us/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "#fff",
                  padding: "0.875rem 2rem",
                  borderRadius: 100,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  boxShadow: "0 4px 20px rgba(37,99,235,0.35)",
                }}
              >
                Get in Touch
              </Link>
              <Link
                href="/about/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.06)",
                  color: "#e2e8f0",
                  padding: "0.875rem 2rem",
                  borderRadius: 100,
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                About Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <HomeFooter />
    </>
  );
}
