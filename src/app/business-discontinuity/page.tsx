import type { Metadata } from 'next';
import GdprIssuePage from '@/components/sections/GdprIssuePage';
import { buildPageMeta } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'GDPR and Business Discontinuity — Data Protection in Insolvency',
  description: 'GDPR obligations during business discontinuity events — insolvency, M&A, restructuring, and how personal data must be handled when a business closes.',
  keywords: 'GDPR business discontinuity, GDPR insolvency, GDPR M&A, GDPR data transfer acquisition, GDPR wind-down',
  canonicalPath: '/business-discontinuity/',
});

export default function BusinessDiscontinuityPage() {
  return (
    <GdprIssuePage
      title="Business Discontinuity"
      subtitle="GDPR obligations when a business closes, merges, or goes through insolvency — protecting data subject rights throughout."
      canonicalPath="/business-discontinuity/"
      description="Business discontinuity events — insolvency, acquisition, restructuring, or wind-down — create acute GDPR challenges. Personal data assets cannot simply be transferred or abandoned. Organisations must maintain compliance obligations even as operations cease, and data subjects' rights persist regardless of a business's financial status."
      points={[
        'Personal data is an asset subject to GDPR — not freely transferable on acquisition without assessment',
        'M&A due diligence must include GDPR compliance review and data inventory',
        'Insolvency practitioners become controllers for data held by insolvent entities',
        'Data subjects must be notified of controller changes that affect their data',
        'Data deletion or secure destruction required for data with no ongoing lawful basis',
        'Customer and employee data cannot be sold as part of an asset sale without lawful basis',
        'Pre-bankruptcy data breach liabilities transfer to acquiring entities in some circumstances',
      ]}
    />
  );
}
