import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import { buildPageMeta } from "@/lib/seo";

export const metadata: Metadata = buildPageMeta({
  title: "About DPDP Consultants | Data Protection Experts",
  description:
    "Learn about DPDP Consultants — your trusted partner for data protection and privacy compliance. Our certified experts help businesses navigate DPDP Act and GDPR.",
  keywords:
    "about DPDP Consultants, data protection consultants, privacy compliance experts, GDPR advisory India",
  canonicalPath: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        {/* Page Hero */}
        <section className="page-hero">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <span className="subtitle">Who We Are</span>
                <h1>About Us</h1>
                <p className="lead">Your Trusted Data Protection &amp; Privacy Experts</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="section">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-5">
                <div className="about-image-placeholder">
                  <i className="bi bi-building" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="about-content">
                  <span className="subtitle">Our Story</span>
                  <h2>Leading Data Protection Consultants in India</h2>
                  <p>
                    DPDP Consultants is a premier consulting firm specializing in data protection and privacy
                    compliance. With years of experience, we help organizations navigate the complex landscape
                    of data protection regulations.
                  </p>
                  <p>
                    Our team consists of certified privacy professionals, legal experts, and technology
                    specialists who work together to provide comprehensive solutions tailored to your business
                    needs.
                  </p>
                  <ul className="about-features">
                    {[
                      "Certified Data Protection Professionals",
                      "Comprehensive Compliance Solutions",
                      "Industry-Specific Expertise",
                      "End-to-End Support",
                    ].map((item) => (
                      <li key={item}>
                        <i className="bi bi-check-circle-fill" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section section-bg">
          <div className="container">
            <div className="row g-4 text-center">
              {[
                { number: "500+", label: "Clients Served" },
                { number: "98%",  label: "Success Rate" },
                { number: "50+",  label: "Expert Consultants" },
                { number: "10+",  label: "Years Experience" },
              ].map((s) => (
                <div key={s.label} className="col-6 col-md-3">
                  <div className="stat-item">
                    <div className="stat-number">{s.number}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission / Vision */}
        <section className="section">
          <div className="container">
            <div className="section-title">
              <span className="subtitle">Our Purpose</span>
              <h2>Mission &amp; Vision</h2>
              <p>Driven by a commitment to privacy, compliance, and client success.</p>
            </div>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="mission-card">
                  <div className="card-icon">
                    <i className="bi bi-bullseye" />
                  </div>
                  <h3>Our Mission</h3>
                  <p>
                    To empower organizations with practical, effective data protection strategies that enable
                    business growth while ensuring regulatory compliance.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mission-card">
                  <div className="card-icon">
                    <i className="bi bi-eye" />
                  </div>
                  <h3>Our Vision</h3>
                  <p>
                    To be the most trusted partner for organizations seeking to achieve and maintain
                    world-class data protection and privacy standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title="Partner with Us"
          description="Ready to strengthen your data protection framework? Let's discuss how we can help your organization."
          primaryCTA={{ label: "Contact Us", href: "/contact-us/" }}
          secondaryCTA={{ label: "Our Services", href: "/services/" }}
        />
      </main>

      <Footer />
    </>
  );
}
