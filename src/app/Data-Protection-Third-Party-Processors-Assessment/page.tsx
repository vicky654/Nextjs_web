import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import SchemaMarkup from '@/components/ui/SchemaMarkup';
import { buildPageMeta, buildBreadcrumbSchema, buildSoftwareAppSchema } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'Third-Party Risk Assessment Software for GDPR',
  description: 'Assess and manage vendor risks seamlessly with GDPR vendor risk assessment software built for EU data protection compliance.',
  keywords: 'GDPR vendor risk management, GDPR third-party compliance, GDPR supplier risk assessment, GDPR risk tools',
  canonicalPath: '/Data-Protection-Third-Party-Processors-Assessment/',
});

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Compliance Tools', href: '#' },
  { label: 'Third Party Processors Assessment' },
];

export default function ThirdPartyAssessmentPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
  const softwareSchema = buildSoftwareAppSchema({
    name: 'Data Protection Third-Party Processors Assessment',
    description: 'GDPR vendor risk assessment software for evaluating and managing third-party data processors under Article 28.',
    url: '/Data-Protection-Third-Party-Processors-Assessment/',
    features: [
      'Vendor due diligence questionnaires',
      'Data Processing Agreement (DPA) management',
      'Third-party risk scoring',
      'Ongoing vendor monitoring',
      'Sub-processor tracking',
    ],
  });

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, softwareSchema]} />
      <PageHero
        title="Third-Party Processors Assessment"
        subtitle="Evaluate and manage all third-party data processors to satisfy GDPR Article 28 requirements."
        breadcrumbs={breadcrumbs}
      />
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <h2 className="h3 mb-3">Managing Third-Party Data Processor Risk</h2>
              <p>
                Under GDPR Article 28, data controllers are responsible for ensuring that every third-party
                processor offers sufficient guarantees to implement appropriate technical and organisational
                measures. Our Third-Party Processors Assessment platform gives you full visibility over
                your entire vendor ecosystem.
              </p>
              <p>
                From initial due diligence to ongoing monitoring and DPA lifecycle management, our solution
                helps you identify, assess, and mitigate risks from every data processor your organisation uses.
              </p>

              <h2 className="h3 mt-4 mb-3">Platform Features</h2>
              <ul className="list-group list-group-flush mb-4">
                {[
                  'Centralised vendor registry with risk classifications',
                  'Automated due diligence questionnaires (DDQs)',
                  'Data Processing Agreement (DPA) creation and tracking',
                  'Sub-processor register and approval workflows',
                  'Risk scoring dashboard with remediation tracking',
                  'Periodic review scheduling and alerts',
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
                <h3 className="h5 mb-3">Assess Your Vendors</h3>
                <p className="text-muted small">
                  Build a complete picture of your third-party data processor landscape.
                </p>
                <a href="/contact-us/" className="btn btn-primary w-100">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
