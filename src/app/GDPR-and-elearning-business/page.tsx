import type { Metadata } from 'next';
import GdprIssuePage from '@/components/sections/GdprIssuePage';
import { buildPageMeta } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'GDPR and eLearning Business — Online Education Compliance',
  description: 'GDPR compliance for eLearning platforms and online education businesses processing learner data, tracking progress, and profiling students.',
  keywords: 'GDPR elearning, GDPR online education, eLearning data protection, learner data GDPR, GDPR LMS',
  canonicalPath: '/GDPR-and-elearning-business/',
});

export default function GdprElearningPage() {
  return (
    <GdprIssuePage
      title="GDPR and eLearning Business"
      subtitle="Data protection obligations for eLearning platforms, LMS providers, and online education businesses."
      canonicalPath="/GDPR-and-elearning-business/"
      description="eLearning platforms process a wide range of personal data — learner profiles, progress tracking, assessment results, payment information, and often data about minors. Each category carries distinct GDPR obligations that eLearning businesses must address in their product design and policies."
      points={[
        'Learner profile data requires a clear lawful basis — typically contract or legitimate interest',
        'Processing data of children under 16 requires parental consent under GDPR Article 8',
        'Learning analytics and profiling may constitute automated decision-making under Article 22',
        'Assessment results and performance data are sensitive and require strong access controls',
        'Data retention — clear policies on how long learner records are kept after account closure',
        'Third-party integrations (video, payment, analytics) require DPAs under Article 28',
        'Right to data portability (Article 20) — learners can request their course progress data',
      ]}
    />
  );
}
