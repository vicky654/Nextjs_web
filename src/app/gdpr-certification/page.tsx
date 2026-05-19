import type { Metadata } from 'next';
import GdprIssuePage from '@/components/sections/GdprIssuePage';
import { buildPageMeta } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'GDPR Certification — Article 42 Compliance Seals',
  description: 'GDPR certification under Article 42 — how certification schemes, seals, and marks demonstrate compliance and reduce regulatory risk.',
  keywords: 'GDPR certification, GDPR Article 42, GDPR seals, GDPR compliance certification, ISO 27701 GDPR',
  canonicalPath: '/gdpr-certification/',
});

export default function GdprCertificationPage() {
  return (
    <GdprIssuePage
      title="GDPR Certification"
      subtitle="Article 42 GDPR certification schemes, seals, and marks — demonstrating verifiable compliance to customers and regulators."
      canonicalPath="/gdpr-certification/"
      description="GDPR Article 42 provides a formal certification mechanism that allows organisations and products to demonstrate compliance through accredited certification bodies. While not a safe harbour, certification is a significant mitigating factor in regulatory investigations and a powerful trust signal to customers."
      points={[
        'GDPR Article 42 enables supervisory authority-approved certification schemes',
        'ISO 27701 (Privacy Information Management) is the leading GDPR-aligned certification',
        'EuroPriSe (European Privacy Seal) provides product and service level certifications',
        'Certification reduces regulatory risk — a mitigating factor under Article 83(2)(j)',
        'Accredited certification bodies perform the assessment; supervisory authorities accredit them',
        'Certifications are valid for maximum 3 years and subject to renewal assessment',
        'Controller-to-processor contracts increasingly require certified processors',
      ]}
    />
  );
}
