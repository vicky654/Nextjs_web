import type { Metadata } from 'next';
import GdprIssuePage from '@/components/sections/GdprIssuePage';
import { buildPageMeta } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'GDPR Data Transfer Issues — Cross-Border Transfers',
  description: 'Navigate GDPR cross-border data transfer requirements including SCCs, adequacy decisions, and binding corporate rules for international data flows.',
  keywords: 'GDPR data transfer, cross-border data transfer GDPR, SCCs GDPR, adequacy decision GDPR, GDPR international transfer',
  canonicalPath: '/data-transfer-issues/',
});

export default function DataTransferPage() {
  return (
    <GdprIssuePage
      title="Data Transfer Issues"
      subtitle="Legal mechanisms for transferring personal data outside the EU/EEA under GDPR Chapter V."
      canonicalPath="/data-transfer-issues/"
      description="GDPR Chapter V restricts transfers of personal data to third countries unless an adequate level of protection is ensured. With the invalidation of Privacy Shield and the Schrems II ruling, organisations must carefully evaluate every data transfer mechanism they rely on."
      points={[
        'Adequacy decisions cover countries deemed to provide equivalent protection (e.g., UK, Japan)',
        'Standard Contractual Clauses (SCCs) — the most widely used transfer mechanism post-Schrems II',
        'Transfer Impact Assessments (TIAs) now required before relying on SCCs',
        'Binding Corporate Rules (BCRs) for intra-group transfers within multinational organisations',
        'Derogations under Article 49 available in limited circumstances only',
        'US transfers: EU-US Data Privacy Framework (2023) provides current adequacy basis',
      ]}
    />
  );
}
