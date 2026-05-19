import type { Metadata } from 'next';
import GdprIssuePage from '@/components/sections/GdprIssuePage';
import { buildPageMeta } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'GDPR Administrative Fines and Penalties',
  description: 'Understand GDPR administrative fines and penalties under Articles 83 and 84. Learn how regulators calculate fines and how to mitigate your exposure.',
  keywords: 'GDPR fines, GDPR penalties, GDPR administrative fines, Article 83 GDPR, GDPR enforcement',
  canonicalPath: '/administrative-fines-and-penalties/',
});

export default function AdminFinesPage() {
  return (
    <GdprIssuePage
      title="Administrative Fines and Penalties"
      subtitle="Understanding GDPR fines under Articles 83 and 84 and how to mitigate your organisation's exposure."
      canonicalPath="/administrative-fines-and-penalties/"
      description="GDPR empowers supervisory authorities to issue administrative fines of up to €20 million or 4% of global annual turnover — whichever is higher — for the most serious infringements. Understanding the criteria regulators use to calculate fines is essential for every organisation processing EU personal data."
      points={[
        'Tier 1 fines up to €10M or 2% of global turnover for procedural breaches',
        'Tier 2 fines up to €20M or 4% of global turnover for core GDPR principles violations',
        'Eight criteria regulators assess when calculating fine amounts (Article 83(2))',
        'Fines may be combined with corrective orders, bans on processing, and public reprimands',
        'Data breach notification failures frequently trigger enforcement action',
        'Proactive compliance programmes are a significant mitigating factor',
      ]}
    />
  );
}
