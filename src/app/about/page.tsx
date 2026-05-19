import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import { buildPageMeta } from "@/lib/seo";

export const metadata: Metadata = buildPageMeta({
  title: "About DPDP Consultants | Data Protection Experts",
  description: "Learn about DPDP Consultants — your trusted partner for data protection and privacy compliance. Our certified experts help businesses navigate DPDP Act and GDPR.",
  keywords: "about DPDP Consultants, data protection consultants, privacy compliance experts, GDPR advisory India",
  canonicalPath: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <Header />
      
      <main>
        {/* Page Header */}
        <section className="page-header">
          <div className="container">
            <h1>About Us</h1>
            <p>Your Trusted Data Protection & Privacy Experts</p>
          </div>
        </section>

        {/* About Content */}
        <section className="section">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="about-image">
                  <div className="about-image-placeholder">
                    <i className="bi bi-building"></i>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-content">
                  <span className="subtitle">Who We Are</span>
                  <h2>Leading Data Protection Consultants in India</h2>
                  <p>
                    DPDP Consultants is a premier consulting firm specializing in data protection and privacy compliance. With years of experience, we help organizations navigate the complex landscape of data protection regulations.
                  </p>
                  <p>
                    Our team consists of certified privacy professionals, legal experts, and technology specialists who work together to provide comprehensive solutions tailored to your business needs.
                  </p>
                  <ul className="about-features">
                    <li>
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Certified Data Protection Professionals</span>
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Comprehensive Compliance Solutions</span>
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Industry-Specific Expertise</span>
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill"></i>
                      <span>End-to-End Support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Vision */}
        <section className="section section-bg">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="mission-card">
                  <div className="card-icon">
                    <i className="bi bi-bullseye"></i>
                  </div>
                  <h3>Our Mission</h3>
                  <p>
                    To empower organizations with practical, effective data protection strategies that enable business growth while ensuring regulatory compliance.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mission-card">
                  <div className="card-icon">
                    <i className="bi bi-eye"></i>
                  </div>
                  <h3>Our Vision</h3>
                  <p>
                    To be the most trusted partner for organizations seeking to achieve and maintain world-class data protection and privacy standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Partner with Us"
          description="Ready to strengthen your data protection framework? Let's discuss how we can help your organization."
          primaryCTA={{ label: "Contact Us", href: "/contact-us/" }}
          secondaryCTA={{ label: "Our Services", href: "/services" }}
        />
      </main>

      <Footer />
    </>
  );
}
