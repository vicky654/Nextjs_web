import type { Metadata } from 'next';
import GdprIssuePage from '@/components/sections/GdprIssuePage';
import { buildPageMeta } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'GDPR and Rest of the World — Global Data Protection',
  description: 'How GDPR applies to organisations outside the EU and its influence on global data protection laws including India DPDP Act, UK GDPR, and CCPA.',
  keywords: 'GDPR global, GDPR outside EU, GDPR worldwide, GDPR extraterritorial, global data protection',
  canonicalPath: '/GDPR-and-rest-of-the-world/',
});

export default function GdprWorldPage() {
  return (
    <GdprIssuePage
      title="GDPR and Rest of the World"
      subtitle="GDPR's global reach — how it affects organisations worldwide and its influence on data protection law globally."
      canonicalPath="/GDPR-and-rest-of-the-world/"
      description="GDPR has extraterritorial reach under Article 3 — any organisation processing EU residents' data must comply regardless of where it is established. Beyond its direct applicability, GDPR has become a global benchmark inspiring legislation in over 130 countries."
      points={[
        'Article 3(2): GDPR applies to non-EU organisations targeting or monitoring EU residents',
        'Non-EU organisations must appoint an EU Representative under Article 27',
        'UK GDPR — post-Brexit equivalent with broadly identical requirements',
        'India DPDP Act 2023 draws significantly from GDPR principles',
        'Brazil LGPD, South Korea PIPA, Thailand PDPA — all GDPR-influenced',
        'US state laws (CCPA, CPRA, etc.) increasingly mirror GDPR rights frameworks',
      ]}
    />
  );
}
