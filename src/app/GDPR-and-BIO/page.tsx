import type { Metadata } from 'next';
import GdprIssuePage from '@/components/sections/GdprIssuePage';
import { buildPageMeta } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'GDPR and Biometric Data — Special Category Processing',
  description: 'GDPR compliance for biometric data processing — facial recognition, fingerprints, retina scans, and voice data under Article 9.',
  keywords: 'GDPR biometric data, GDPR facial recognition, biometric data protection, Article 9 GDPR, GDPR special category',
  canonicalPath: '/GDPR-and-BIO/',
});

export default function GdprBioPage() {
  return (
    <GdprIssuePage
      title="GDPR and Biometric Data"
      subtitle="Special category protections for biometric data under GDPR Article 9 — processing requirements, lawful bases, and DPIAs."
      canonicalPath="/GDPR-and-BIO/"
      description="Biometric data — fingerprints, facial geometry, iris scans, voice patterns — is classified as special category data under GDPR Article 9 when used for the purpose of uniquely identifying individuals. Processing requires explicit consent or another Article 9(2) exception, plus a DPIA under Article 35."
      points={[
        'Biometric data is special category data when used for unique identification (Article 9)',
        'Explicit consent is the most common lawful basis — must meet the high Article 7 standard',
        'DPIA mandatory before deploying biometric systems (Article 35(3)(b))',
        'Facial recognition in public spaces faces heightened regulatory scrutiny across the EU',
        'Purpose limitation strictly enforced — biometrics collected for one purpose cannot be repurposed',
        'Data subject rights (erasure, portability) apply and require technical implementation',
        'National law derogations may add additional restrictions beyond GDPR',
      ]}
    />
  );
}
