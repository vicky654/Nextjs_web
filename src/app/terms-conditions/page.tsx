import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { buildPageMeta } from "@/lib/seo";

export const metadata: Metadata = buildPageMeta({
  title: "Terms & Conditions | DPDP Consultants",
  description: "Terms and Conditions of DPDP Consultants — read our terms of service governing the use of our website and consulting services.",
  canonicalPath: "/terms-conditions/",
  noIndex: false,
});

export default function TermsPage() {
  return (
    <>
      <Header />
      
      <main>
        <section className="page-header">
          <div className="container">
            <h1>Terms & Conditions</h1>
            <p>Last Updated: January 2024</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="policy-content">
              <h2>Agreement to Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h2>Use License</h2>
              <p>
                Permission is granted to temporarily use DPDP Consultants website for personal, non-commercial transitory viewing only.
              </p>

              <h2>Disclaimer</h2>
              <p>
                The materials on DPDP Consultants website are provided on an &apos;as is&apos; basis. DPDP Consultants makes no warranties, expressed or implied.
              </p>

              <h2>Limitations</h2>
              <p>
                DPDP Consultants shall not be liable for any damages arising out of the use or inability to use the materials on this website.
              </p>

              <h2>Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
