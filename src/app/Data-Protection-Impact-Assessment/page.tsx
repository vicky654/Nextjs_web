import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/sections/PageHero';
import SchemaMarkup from '@/components/ui/SchemaMarkup';
import { buildPageMeta, buildBreadcrumbSchema, buildSoftwareAppSchema } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'Impact Assessment Software for GDPR',
  description: 'Ensure GDPR compliance with our GDPR impact assessment software that identifies risks, mitigates threats, and simplifies compliance reporting.',
  keywords: 'GDPR impact assessment, GDPR DPIA software, GDPR compliance assessment tools, GDPR risk analysis EU',
  canonicalPath: '/Data-Protection-Impact-Assessment/',
});

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Compliance Tools', href: '#' },
  { label: 'Data Protection Impact Assessment' },
];

export default function DPIAPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
  const softwareSchema = buildSoftwareAppSchema({
    name: 'Data Protection Impact Assessment (DPIA) Software',
    description: 'GDPR DPIA software to identify risks, mitigate threats, and produce compliance reports under Article 35.',
    url: '/Data-Protection-Impact-Assessment/',
    features: [
      'GDPR Article 35 DPIA workflow',
      'Risk identification and scoring',
      'Mitigation recommendations',
      'Stakeholder consultation tracking',
      'Regulatory reporting output',
    ],
  });

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, softwareSchema]} />
      <Header />
      <main>
      <PageHero
        title="Data Protection Impact Assessment"
        subtitle="Structured DPIA workflows to identify, assess, and mitigate data protection risks under GDPR Article 35."
        breadcrumbs={breadcrumbs}
      />
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <h2 className="h3 mb-3">What is a DPIA?</h2>
              <p>
                A Data Protection Impact Assessment (DPIA) is a mandatory process under GDPR Article 35 for
                processing activities that are likely to result in a high risk to individuals&apos; rights and freedoms.
                Our DPIA software guides your organisation through every step of this structured process.
              </p>
              <p>
                From defining the processing activity to documenting residual risks and supervisory authority
                consultation, our platform ensures nothing is missed and every decision is auditable.
              </p>

              <h2 className="h3 mt-4 mb-3">Key Capabilities</h2>
              <ul className="list-group list-group-flush mb-4">
                {[
                  'Pre-DPIA screening to identify when assessment is required',
                  'Structured risk identification and likelihood/impact scoring',
                  'Built-in mitigation measure library aligned with GDPR',
                  'Stakeholder and DPO consultation workflows',
                  'Automated DPIA report generation for regulators',
                  'Integration with Records of Processing Activities (RoPA)',
                ].map((f) => (
                  <li key={f} className="list-group-item d-flex align-items-start gap-2">
                    <i className="bi bi-check-circle-fill text-success mt-1" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 bg-light p-4">
                <h3 className="h5 mb-3">Start Your DPIA</h3>
                <p className="text-muted small">
                  Our experts guide you through GDPR-compliant impact assessments tailored to your organisation.
                </p>
                <Link href="/contact-us/" className="btn btn-primary w-100">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
