import type { Metadata } from 'next';
import GdprIssuePage from '@/components/sections/GdprIssuePage';
import { buildPageMeta } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'GDPR and Business Development — Compliance as a Competitive Advantage',
  description: 'How GDPR compliance supports business development, builds customer trust, and creates competitive advantage in EU markets.',
  keywords: 'GDPR business development, GDPR competitive advantage, GDPR trust, GDPR EU market entry',
  canonicalPath: '/GDPR-and-business-development/',
});

export default function GdprBusinessPage() {
  return (
    <GdprIssuePage
      title="GDPR and Business Development"
      subtitle="Turning data protection compliance into a genuine business advantage in the EU market."
      canonicalPath="/GDPR-and-business-development/"
      description="GDPR compliance is no longer just a legal obligation — it is increasingly a business development requirement. EU enterprise customers routinely include GDPR compliance as a procurement criterion, and demonstrating strong data protection practices builds the customer trust essential for sustainable growth."
      points={[
        'GDPR compliance unlocks enterprise procurement in EU and regulated industries',
        'Privacy-by-design enables faster product development with reduced re-work',
        'Data minimisation reduces storage costs and breach exposure simultaneously',
        'Transparent privacy practices measurably increase customer conversion rates',
        'DPA compliance is a pre-condition for operating in most EU B2B contracts',
        'Certification schemes (ISO 27701, GDPR seals) provide verifiable compliance signals',
      ]}
    />
  );
}
