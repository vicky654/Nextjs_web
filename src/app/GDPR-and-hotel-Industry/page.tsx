import type { Metadata } from 'next';
import GdprIssuePage from '@/components/sections/GdprIssuePage';
import { buildPageMeta } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'GDPR and Hotel Industry — Hospitality Data Compliance',
  description: 'GDPR compliance for the hotel and hospitality industry — guest data, PMS systems, loyalty programmes, and cross-border guest data transfers.',
  keywords: 'GDPR hotel industry, GDPR hospitality, hotel guest data GDPR, GDPR PMS, hospitality data protection',
  canonicalPath: '/GDPR-and-hotel-Industry/',
});

export default function GdprHotelPage() {
  return (
    <GdprIssuePage
      title="GDPR and Hotel Industry"
      subtitle="Data protection compliance for hotels, resorts, and hospitality groups processing EU guest data."
      canonicalPath="/GDPR-and-hotel-Industry/"
      description="Hotels process vast amounts of personal data — passport details, payment cards, health information, stay preferences, and loyalty programme data. Each category carries different GDPR obligations and risk profiles that hospitality operators must understand and manage."
      points={[
        'Guest registration requires a lawful basis — typically contract performance (Article 6(1)(b))',
        'Passport and ID data handling triggers additional obligations for some jurisdictions',
        'Payment card data — PCI DSS and GDPR obligations overlap and must be managed together',
        'Direct marketing to guests requires separate consent distinct from booking consent',
        'Loyalty programme profiling may require DPIA under Article 35',
        'Hotel chains with EU and non-EU properties must manage cross-border transfer mechanisms',
        'Data retention periods for guest records must be defined and enforced',
      ]}
    />
  );
}
