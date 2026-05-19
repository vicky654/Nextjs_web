/**
 * Resources data for DPDP Consultants Website
 */

import { Resource } from '@/types';

export const RESOURCES: Resource[] = [
  {
    id: '1',
    slug: 'draft-dpdp-rules-2025',
    title: 'Draft DPDP Rules 2025 - Complete Analysis',
    description: 'Detailed analysis of the draft rules issued under the Digital Personal Data Protection Act, 2023.',
    content: `
      <h2>Overview of Draft Rules</h2>
      <p>The Ministry of Electronics and Information Technology (MeitY) has released the draft Digital Personal Data Protection Rules, 2025 for public consultation.</p>
      
      <h2>Key Highlights</h2>
      <ul>
        <li><strong>Significant Digital Age:</strong> Rules define significant data fiduciary based on turnover and data volume thresholds.</li>
        <li><strong>Consent Mechanisms:</strong> Detailed guidelines for obtaining and managing consent.</li>
        <li><strong>Data Principal Rights:</strong> Specific procedures for exercising data subject rights.</li>
        <li><strong>Cross-border Transfer:</strong> List of approved countries for data transfers.</li>
      </ul>
      
      <h2>Compliance Timeline</h2>
      <p>Organizations must comply within stipulated timelines as specified in the rules.</p>
    `,
    type: 'regulation',
    featuredImage: '/images/resources/draft-rules.jpg',
    publishedAt: '2025-01-15',
    author: 'DPDP Consultants Team',
  },
  {
    id: '2',
    slug: 'dpdp-compliance-checklist',
    title: 'DPDP Compliance Checklist for Businesses',
    description: 'A comprehensive checklist to help businesses prepare for DPDP Act compliance.',
    content: `
      <h2>Essential Compliance Steps</h2>
      
      <h3>1. Data Mapping</h3>
      <ul>
        <li>Identify all personal data processed</li>
        <li>Document data flow and storage</li>
        <li>Create data inventory</li>
      </ul>
      
      <h3>2. Consent Management</h3>
      <ul>
        <li>Implement consent mechanism</li>
        <li>Create consent records</li>
        <li>Build preference centers</li>
      </ul>
      
      <h3>3. Policy Updates</h3>
      <ul>
        <li>Update privacy policy</li>
        <li>Create cookie policy</li>
        <li>Draft data processing agreements</li>
      </ul>
    `,
    type: 'checklist',
    featuredImage: '/images/resources/checklist.jpg',
    publishedAt: '2024-12-10',
    author: 'DPDP Consultants Team',
  },
  {
    id: '3',
    slug: 'data-protection-officer-guide',
    title: 'Guide to Data Protection Officer Requirements',
    description: 'Understanding the role and requirements of Data Protection Officers under DPDP Act.',
    content: `
      <h2>Who Needs a DPO?</h2>
      <p>Under DPDP Act, significant data fiduciaries must appoint a Data Protection Officer (DPO).</p>
      
      <h2>Role and Responsibilities</h2>
      <ul>
        <li>Monitor compliance with the Act</li>
        <li>Act as point of contact for data principals</li>
        <li>Advise on data protection impact assessments</li>
        <li>Coordinate with Data Protection Board</li>
      </ul>
      
      <h2>Qualifications</h2>
      <p>The DPO should have necessary expertise in data protection laws and practices.</p>
    `,
    type: 'guide',
    featuredImage: '/images/resources/dpo-guide.jpg',
    publishedAt: '2024-11-25',
    author: 'DPDP Consultants Team',
  },
  {
    id: '4',
    slug: 'consent-management-platform-comparison',
    title: 'Consent Management Platform Comparison Guide',
    description: 'Compare top consent management platforms for DPDP and GDPR compliance.',
    content: `
      <h2>Why CMP is Essential</h2>
      <p>A Consent Management Platform (CMP) helps organizations obtain, manage, and document user consent.</p>
      
      <h2>Key Features to Look For</h2>
      <ul>
        <li>Multi-language support</li>
        <li>Granular consent options</li>
        <li>Consent records</li>
        <li>Integration capabilities</li>
        <li>Compliance reporting</li>
      </ul>
      
      <h2>Popular CMP Solutions</h2>
      <p>Review and compare leading CMP providers in the market.</p>
    `,
    type: 'whitepaper',
    featuredImage: '/images/resources/cmp-comparison.jpg',
    publishedAt: '2024-11-15',
    author: 'DPDP Consultants Team',
  },
  {
    id: '5',
    slug: 'data-breach-response-plan-template',
    title: 'Data Breach Response Plan Template',
    description: 'Template and guidelines for creating an effective data breach response plan.',
    content: `
      <h2>Importance of Breach Response</h2>
      <p>A well-defined breach response plan is crucial for minimizing damage and maintaining compliance.</p>
      
      <h2>Response Plan Components</h2>
      <ol>
        <li><strong>Detection:</strong> Identify and confirm the breach</li>
        <li><strong>Containment:</strong> Limit the scope and impact</li>
        <li><strong>Assessment:</strong> Evaluate the severity</li>
        <li><strong>Notification:</strong> Inform required parties</li>
        <li><strong>Remediation:</strong> Fix vulnerabilities</li>
        <li><strong>Review:</strong> Learn from the incident</li>
      </ol>
    `,
    type: 'template',
    featuredImage: '/images/resources/breach-plan.jpg',
    publishedAt: '2024-10-20',
    author: 'DPDP Consultants Team',
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return RESOURCES.find(resource => resource.slug === slug);
}

export function getResourcesByType(type: Resource['type']): Resource[] {
  return RESOURCES.filter(resource => resource.type === type);
}

export function getRecentResources(limit: number = 3): Resource[] {
  return [...RESOURCES]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}
