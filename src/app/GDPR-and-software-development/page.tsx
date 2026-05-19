import type { Metadata } from 'next';
import GdprIssuePage from '@/components/sections/GdprIssuePage';
import { buildPageMeta } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'GDPR and Software Development — Privacy by Design',
  description: 'How GDPR shapes software development practices — privacy by design, data minimisation, security requirements, and DPIAs for new products.',
  keywords: 'GDPR software development, privacy by design, GDPR developers, GDPR API, GDPR SaaS compliance',
  canonicalPath: '/GDPR-and-software-development/',
});

export default function GdprSoftwarePage() {
  return (
    <GdprIssuePage
      title="GDPR and Software Development"
      subtitle="Building GDPR compliance into software products from day one with privacy-by-design principles."
      canonicalPath="/GDPR-and-software-development/"
      description="Article 25 of GDPR mandates privacy by design and by default — compliance must be built into systems at the design stage, not retrofitted. For software development teams, this transforms GDPR from a legal checkbox into an engineering discipline."
      points={[
        'Privacy by design (Article 25) — embed data protection into system architecture from sprint one',
        'Data minimisation — collect only what is strictly necessary for the stated purpose',
        'Pseudonymisation and encryption as technical default measures',
        'Access controls and role-based data access as mandatory security baseline',
        'Logging and audit trails for data access and modifications',
        'DPIA required before deploying new products that process data at scale',
        'APIs handling personal data must implement rate limiting and authentication',
        'Data deletion endpoints — users must be able to exercise erasure rights via the product',
      ]}
    />
  );
}
