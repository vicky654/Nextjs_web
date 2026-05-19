import type { Metadata } from 'next';
import GdprIssuePage from '@/components/sections/GdprIssuePage';
import { buildPageMeta } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'GDPR and NGOs — Data Protection for Non-Profit Organisations',
  description: 'GDPR compliance for NGOs and non-profit organisations — member data, donor records, volunteer information, and legitimate interest processing.',
  keywords: 'GDPR NGO, GDPR non-profit, NGO data protection, GDPR charity, non-profit GDPR compliance',
  canonicalPath: '/GDPR-and-NGO/',
});

export default function GdprNGOPage() {
  return (
    <GdprIssuePage
      title="GDPR and NGOs"
      subtitle="Data protection compliance for non-profit organisations, charities, and associations processing member and donor data."
      canonicalPath="/GDPR-and-NGO/"
      description="NGOs, charities, and associations process significant volumes of personal data — member records, donor information, volunteer details, beneficiary data. A common misconception is that non-profit status reduces GDPR obligations; it does not. NGOs are fully subject to GDPR as data controllers."
      points={[
        'NGOs are data controllers fully subject to GDPR — non-profit status provides no exemption',
        'Member and donor data processing requires a clear lawful basis (contract, consent, or legitimate interest)',
        'Special category data (health, political opinions) may be processed for not-for-profit bodies under Article 9(2)(d)',
        'Fundraising communications require consent and an easy opt-out mechanism',
        'Volunteer data must be handled with the same rigour as employee data',
        'Beneficiary data — often sensitive — requires enhanced security and strict access controls',
        'Data retention schedules needed for donor, member, and grant records',
      ]}
    />
  );
}
