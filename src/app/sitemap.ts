import type { MetadataRoute } from 'next';
import { getAllBlogSlugs } from '@/lib/blog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gdprconsultants.in';

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, lastModified: new Date(), priority: 1.0, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/about`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/blog`, priority: 0.9, changeFrequency: 'daily' },
  { url: `${SITE_URL}/contact-us/`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/privacy-policy`, priority: 0.4, changeFrequency: 'yearly' },
  // Compliance Tools
  { url: `${SITE_URL}/consent-management-platform/`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/Cookie-Consent-Management/`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/Data-Protection-Impact-Assessment/`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/Data-Protection-Third-Party-Processors-Assessment/`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/Data-Subject-Rights-and-Grievance-Management/`, priority: 0.8, changeFrequency: 'monthly' },
  // GDPR Issues
  { url: `${SITE_URL}/administrative-fines-and-penalties/`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/data-transfer-issues/`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/GDPR-and-rest-of-the-world/`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/GDPR-and-business-development/`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/GDPR-and-hotel-Industry/`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/GDPR-and-software-development/`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/GDPR-and-elearning-business/`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/subcontract-and-third-party-issues/`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/GDPR-and-BIO/`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/GDPR-and-crypto-world/`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/gdpr-certification/`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/business-discontinuity/`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/GDPR-and-EU-Representation/`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/GDPR-and-NGO/`, priority: 0.6, changeFrequency: 'monthly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllBlogSlugs();
    blogEntries = slugs
      .filter((s) => s.slug)
      .map((s) => ({
        url: `${SITE_URL}/blog/${s.slug}`,
        priority: 0.6,
        changeFrequency: 'monthly' as const,
      }));
  } catch {
    // DB unavailable — return static only
  }
  return [...staticRoutes, ...blogEntries];
}
