import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceCard from "@/components/sections/ServiceCard";
import CTASection from "@/components/sections/CTASection";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services - DPDP Consultants",
  description: "Explore our comprehensive data protection and privacy consulting services including DPDP compliance, GDPR advisory, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      
      <main>
        <section className="page-header">
          <div className="container">
            <h1>Our Services</h1>
            <p>Comprehensive Data Protection Solutions</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-title">
              <span className="subtitle">What We Offer</span>
              <h2>Expert Consulting Services</h2>
              <p>
                We provide end-to-end data protection and privacy consulting services to help your organization achieve and maintain compliance.
              </p>
            </div>
            <div className="row g-4">
              {SERVICES.map((service) => (
                <div className="col-md-6 col-lg-4" key={service.id}>
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection
          title="Need Help with Compliance?"
          description="Contact us today to discuss your data protection requirements."
          primaryCTA={{ label: "Get in Touch", href: "/contact" }}
          secondaryCTA={{ label: "About Us", href: "/about" }}
        />
      </main>

      <Footer />
    </>
  );
}
