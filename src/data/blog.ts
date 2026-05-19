/**
 * Blog data for DPDP Consultants Website
 */

import { BlogPost, BlogCategory } from '@/types';

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: '1', name: 'DPDP Act', slug: 'dpdp-act', count: 5 },
  { id: '2', name: 'GDPR', slug: 'gdpr', count: 4 },
  { id: '3', name: 'Data Privacy', slug: 'data-privacy', count: 8 },
  { id: '4', name: 'Compliance', slug: 'compliance', count: 6 },
  { id: '5', name: 'Cyber Security', slug: 'cyber-security', count: 3 },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'understanding-dpdp-act-2023',
    title: 'Understanding the Digital Personal Data Protection Act 2023',
    excerpt: 'A comprehensive guide to India\'s new data protection law and what it means for businesses operating in the digital space.',
    content: `
      <h2>Introduction</h2>
      <p>The Digital Personal Data Protection Act, 2023 (DPDP Act) represents a landmark legislation in India's digital privacy landscape. Enacted to protect the digital personal data of individuals, this law establishes a comprehensive framework for data processing and management.</p>
      
      <h2>Key Provisions</h2>
      <p>The Act introduces several crucial provisions that businesses must understand:</p>
      <ul>
        <li><strong>Data Fiduciary Obligations:</strong> Entities handling personal data must ensure compliance with specified duties.</li>
        <li><strong>Consent Management:</strong> Explicit consent is required before processing personal data.</li>
        <li><strong>Data Principal Rights:</strong> Individuals have rights regarding their personal data.</li>
        <li><strong>Cross-border Transfers:</strong> Specific conditions for transferring data outside India.</li>
      </ul>
      
      <h2>Who Must Comply?</h2>
      <p>Any entity processing digital personal data within India, or processing data of Indian residents from outside India, must comply with the DPDP Act.</p>
      
      <h2>Penalties</h2>
      <p>Non-compliance can result in significant penalties up to ₹250 crore (approximately $30 million USD).</p>
      
      <h2>Conclusion</h2>
      <p>Businesses should begin assessing their data processing activities and implementing compliance measures to avoid penalties.</p>
    `,
    author: 'Priya Sharma',
    authorImage: '/images/team/priya.jpg',
    featuredImage: '/images/blog/dpdp-act.jpg',
    publishedAt: '2024-01-15',
    category: 'DPDP Act',
    tags: ['DPDP', 'Data Protection', 'Compliance', 'India'],
    readTime: 8,
  },
  {
    id: '2',
    slug: 'gdpr-vs-dpdp-key-differences',
    title: 'GDPR vs DPDP Act: Key Differences Businesses Should Know',
    excerpt: 'Comparing the European GDPR with India\'s new DPDP Act to help businesses understand the regulatory landscape.',
    content: `
      <h2>Overview</h2>
      <p>As businesses operate globally, understanding the differences between GDPR and DPDP Act becomes crucial for compliance.</p>
      
      <h2>Scope and Jurisdiction</h2>
      <p>While GDPR applies to organizations processing data of EU residents, DPDP Act applies to processing of digital personal data within India or of Indian residents outside India.</p>
      
      <h2>Consent Requirements</h2>
      <p>Both require consent, but DPDP Act has specific provisions for deemed consent in certain scenarios.</p>
      
      <h2>Data Transfer Rules</h2>
      <p>GDPR has adequacy decisions, while DPDP Act lists specific countries where data can be transferred.</p>
      
      <h2>Penalties</h2>
      <p>GDPR penalties can go up to €20 million or 4% of global turnover, while DPDP Act penalties can go up to ₹250 crore.</p>
    `,
    author: 'Raj Patel',
    authorImage: '/images/team/raj.jpg',
    featuredImage: '/images/blog/gdpr-vs-dpdp.jpg',
    publishedAt: '2024-02-10',
    category: 'GDPR',
    tags: ['GDPR', 'DPDP', 'Comparison', 'Compliance'],
    readTime: 6,
  },
  {
    id: '3',
    slug: 'data-protection-impact-assessment-guide',
    title: 'Complete Guide to Data Protection Impact Assessment',
    excerpt: 'Learn how to conduct DPIA and why it\'s essential for compliance with modern data protection regulations.',
    content: `
      <h2>What is a DPIA?</h2>
      <p>A Data Protection Impact Assessment (DPIA) is a process to identify and minimize data protection risks in a project or system.</p>
      
      <h2>When is DPIA Required?</h2>
      <p>DPIA is mandatory when:</p>
      <ul>
        <li>Processing involves systematic monitoring</li>
        <li>Processing sensitive data on large scale</li>
        <li>New technologies are being implemented</li>
      </ul>
      
      <h2>Steps to Conduct DPIA</h2>
      <ol>
        <li>Describe the processing activity</li>
        <li>Assess necessity and proportionality</li>
        <li>Identify risks to data subjects</li>
        <li>Document mitigation measures</li>
        <li>Consult stakeholders</li>
        <li>Review and update regularly</li>
      </ol>
    `,
    author: 'Amit Kumar',
    authorImage: '/images/team/amit.jpg',
    featuredImage: '/images/blog/dpia-guide.jpg',
    publishedAt: '2024-03-05',
    category: 'Compliance',
    tags: ['DPIA', 'Risk Assessment', 'Compliance', 'Guide'],
    readTime: 10,
  },
  {
    id: '4',
    slug: 'cookie-consent-best-practices',
    title: 'Cookie Consent Best Practices for Indian Websites',
    excerpt: 'Essential guidelines for implementing compliant cookie consent mechanisms on your website.',
    content: `
      <h2>Understanding Cookie Consent</h2>
      <p>Cookie consent is a crucial aspect of digital privacy compliance. Under DPDP Act and global regulations, websites must obtain user consent before placing cookies.</p>
      
      <h2>Types of Cookies</h2>
      <ul>
        <li><strong>Essential Cookies:</strong> Necessary for website functionality</li>
        <li><strong>Analytics Cookies:</strong> Track user behavior</li>
        <li><strong>Marketing Cookies:</strong> Used for advertising purposes</li>
      </ul>
      
      <h2>Best Practices</h2>
      <ol>
        <li>Implement a cookie banner</li>
        <li>Provide granular consent options</li>
        <li>Maintain consent records</li>
        <li>Allow easy consent withdrawal</li>
        <li>Keep cookie policy updated</li>
      </ol>
    `,
    author: 'Sneha Reddy',
    authorImage: '/images/team/sneha.jpg',
    featuredImage: '/images/blog/cookie-consent.jpg',
    publishedAt: '2024-03-20',
    category: 'Data Privacy',
    tags: ['Cookies', 'Consent', 'Compliance', 'Website'],
    readTime: 5,
  },
  {
    id: '5',
    slug: 'third-party-vendor-risk-management',
    title: 'Managing Third-Party Vendor Data Protection Risks',
    excerpt: 'How to assess and mitigate data protection risks associated with third-party vendors and service providers.',
    content: `
      <h2>The Vendor Risk Challenge</h2>
      <p>Organizations increasingly rely on third-party vendors, creating significant data protection risks that must be managed.</p>
      
      <h2>Risk Assessment Process</h2>
      <ol>
        <li>Identify all vendors with data access</li>
        <li>Assess data sensitivity levels</li>
        <li>Evaluate vendor security measures</li>
        <li>Review contractual obligations</li>
        <li>Monitor ongoing compliance</li>
      </ol>
      
      <h2>Contractual Safeguards</h2>
      <p>Ensure Data Processing Agreements (DPAs) include:</p>
      <ul>
        <li>Data handling specifications</li>
        <li>Security requirements</li>
        <li>Breach notification procedures</li>
        <li>Audit rights</li>
      </ul>
    `,
    author: 'Vikram Singh',
    authorImage: '/images/team/vikram.jpg',
    featuredImage: '/images/blog/vendor-risk.jpg',
    publishedAt: '2024-04-02',
    category: 'Compliance',
    tags: ['Vendors', 'Risk Management', 'Third Party', 'DPA'],
    readTime: 7,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug);
}

export function getRecentPosts(limit: number = 3): BlogPost[] {
  return [...BLOG_POSTS]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return BLOG_POSTS.filter(post => post.category.toLowerCase() === category.toLowerCase());
}
