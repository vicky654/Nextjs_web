import type { Metadata } from 'next';
import GdprIssuePage from '@/components/sections/GdprIssuePage';
import { buildPageMeta } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'GDPR EU Representation — Article 27 Requirements',
  description: 'GDPR EU Representative obligations under Article 27 for non-EU organisations processing EU personal data — appointment, role, and liability.',
  keywords: 'GDPR EU representative, Article 27 GDPR, GDPR non-EU representative, GDPR Article 27 obligation',
  canonicalPath: '/GDPR-and-EU-Representation/',
});

export default function GdprEURepresentationPage() {
  return (
    <GdprIssuePage
      title="GDPR and EU Representation"
      subtitle="Article 27 obligations for non-EU organisations — when you need an EU Representative and what they do."
      canonicalPath="/GDPR-and-EU-Representation/"
      description="Non-EU organisations that process EU residents' personal data under Article 3(2) must designate an EU Representative under Article 27. This is a mandatory compliance obligation with direct liability implications — the representative can be held liable on behalf of the controller or processor."
      points={[
        'Required for non-EU organisations targeting EU residents or monitoring their behaviour',
        'Exemption for occasional, low-risk processing that does not include special category data',
        'Public authorities are exempt from the Article 27 requirement',
        'EU Representative must be established in an EU member state where data subjects are located',
        'Representative acts as contact point for supervisory authorities and data subjects',
        'Representative can face enforcement action and be held jointly liable',
        'Mandate must be in writing and representatives must be able to cooperate with regulators',
      ]}
    />
  );
}
