import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import HomeFooter from '@/components/home/HomeFooter';
import ContactSection from '@/components/home/ContactSection';
import SchemaMarkup from '@/components/ui/SchemaMarkup';
import { buildPageMeta, buildBreadcrumbSchema, buildOrgSchema } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'Contact DPDP Consultants | Get Expert Privacy Advice',
  description:
    'Connect with our data protection experts for DPDP compliance, GDPR advisory, and tailored privacy solutions. We respond within one business day.',
  keywords:
    'contact DPDP Consultants, GDPR consultants EU, GDPR compliance experts, data protection advisory',
  canonicalPath: '/contact-us/',
});

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Contact Us' },
];

export default function ContactUsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
  const orgSchema = buildOrgSchema();

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, orgSchema]} />
      <Header />
      <main style={{ background: 'var(--hp-dark)', minHeight: '100vh' }}>
        {/* Hero */}
        <section
          style={{
            background: 'linear-gradient(160deg, #060d18 0%, #0d1f3c 50%, #060d18 100%)',
            padding: '7rem 1.5rem 5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              width: 700,
              height: 500,
              background: 'radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.25)',
                borderRadius: 100,
                padding: '0.35rem 1rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#60a5fa',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                marginBottom: '1.5rem',
              }}
            >
              Get in Touch
            </div>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
              }}
            >
              Talk to Our{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Privacy Experts
              </span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
              Reach our team of certified data protection specialists for compliance tools,
              advisory services, and tailored privacy solutions.
            </p>
          </div>
        </section>

        {/* Contact form — dark-themed client component with AJAX submission */}
        <ContactSection />
      </main>
      <HomeFooter />
    </>
  );
}
