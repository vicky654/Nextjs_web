import type { Metadata } from 'next';
import GdprIssuePage from '@/components/sections/GdprIssuePage';
import { buildPageMeta } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'GDPR Subcontract and Third-Party Issues',
  description: 'Managing GDPR obligations when subcontracting data processing — sub-processor requirements, DPA chains, and liability under Article 28.',
  keywords: 'GDPR subcontract, GDPR sub-processors, GDPR third party, GDPR Article 28, data processing agreement chain',
  canonicalPath: '/subcontract-and-third-party-issues/',
});

export default function SubcontractPage() {
  return (
    <GdprIssuePage
      title="Subcontract and Third-Party Issues"
      subtitle="Understanding GDPR liability chains when engaging sub-processors and managing data through third parties."
      canonicalPath="/subcontract-and-third-party-issues/"
      description="When a data processor engages a sub-processor, Article 28(4) requires the same data protection obligations be passed down the chain. Controllers remain fully liable for sub-processor compliance — making third-party risk management a critical compliance priority."
      points={[
        'Processors must get controller authorisation (general or specific) before engaging sub-processors',
        'Sub-processors must be bound by equivalent data protection obligations via written contract',
        'Controllers are liable for sub-processor failures as if they were processor failures',
        'Sub-processor lists must be maintained and disclosed to controllers on request',
        'Sub-processor changes require notification to the controller with a right to object',
        'Cloud providers (AWS, Azure, GCP) are typically sub-processors requiring DPA review',
        'Data Processing Agreement (DPA) chains must be audited and kept current',
      ]}
    />
  );
}
