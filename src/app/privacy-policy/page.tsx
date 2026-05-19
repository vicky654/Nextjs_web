import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy - DPDP Consultants",
  description: "Privacy Policy of DPDP Consultants - Learn how we protect and handle your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      
      <main>
        <section className="page-header">
          <div className="container">
            <h1>Privacy Policy</h1>
            <p>Last Updated: January 2024</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="policy-content">
              <h2>Introduction</h2>
              <p>
                DPDP Consultants ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by DPDP Consultants.
              </p>

              <h2>Information We Collect</h2>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
              <ul>
                <li>Contact us through our website</li>
                <li>Request information about our services</li>
                <li>Subscribe to our newsletter</li>
                <li>Use our client portal</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and improve our services</li>
                <li>Respond to your inquiries</li>
                <li>Send you relevant communications</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to outside parties. We may share information with service providers who assist us in operating our website.
              </p>

              <h2>Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at info@dpdpconsultants.com
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
