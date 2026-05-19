/**
 * Constants for DPDP Consultants Website
 */

import { NavItem, Service } from '@/types';

// Company Information
export const COMPANY_INFO = {
  name: 'DPDP Consultants',
  tagline: 'Your Trusted Data Protection & Privacy Experts',
  description: 'We help businesses navigate the complex landscape of data protection and privacy regulations with expert consulting services.',
  email: 'info@dpdpconsultants.com',
  phone: '+91 98765 43210',
  address: 'Mumbai, Maharashtra, India',
  website: 'https://dpdpconsultants.com',
  linkedin: 'https://linkedin.com/company/dpdpconsultants',
  twitter: 'https://twitter.com/dpdpconsultants',
};

// Navigation Items
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Services', href: '/services/' },
  {
    label: 'Compliance Tools', href: '#',
    children: [
      { label: 'Consent Management Platform', href: '/consent-management-platform/' },
      { label: 'Cookie Consent Management', href: '/Cookie-Consent-Management/' },
      { label: 'Data Protection Impact Assessment', href: '/Data-Protection-Impact-Assessment/' },
      { label: 'Third Party Risk Assessment', href: '/Data-Protection-Third-Party-Processors-Assessment/' },
      { label: 'Data Subject Rights & Grievance', href: '/Data-Subject-Rights-and-Grievance-Management/' },
    ],
  },
  {
    label: 'GDPR Issues', href: '#',
    children: [
      { label: 'Administrative Fines and Penalties', href: '/administrative-fines-and-penalties/' },
      { label: 'Data Transfer Issues', href: '/data-transfer-issues/' },
      { label: 'GDPR and Rest of The World', href: '/GDPR-and-rest-of-the-world/' },
      { label: 'GDPR and Business Development', href: '/GDPR-and-business-development/' },
      { label: 'GDPR and Hotel Industry', href: '/GDPR-and-hotel-Industry/' },
      { label: 'GDPR and Software Development', href: '/GDPR-and-software-development/' },
      { label: 'GDPR and Elearning Business', href: '/GDPR-and-elearning-business/' },
      { label: 'Subcontract and Third Party Issues', href: '/subcontract-and-third-party-issues/' },
      { label: 'GDPR and BIO', href: '/GDPR-and-BIO/' },
      { label: 'GDPR and Crypto World', href: '/GDPR-and-crypto-world/' },
      { label: 'GDPR Certification', href: '/gdpr-certification/' },
      { label: 'Business Discontinuity', href: '/business-discontinuity/' },
      { label: 'GDPR and EU Representation', href: '/GDPR-and-EU-Representation/' },
      { label: 'GDPR and NGO', href: '/GDPR-and-NGO/' },
    ],
  },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact-us/' },
];

// Dashboard Navigation Items
export const DASHBOARD_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Documents', href: '/dashboard/documents' },
  { label: 'Tickets', href: '/dashboard/tickets' },
  { label: 'Profile', href: '/dashboard/profile' },
];

// Services Data
export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'DPDP Compliance',
    description: 'Comprehensive compliance solutions for the Digital Personal Data Protection Act.',
    icon: 'bi-shield-check',
    shortDescription: 'End-to-end DPDP Act compliance consulting',
    features: [
      'Data Protection Impact Assessment',
      'Consent Management Solutions',
      'Data Principal Rights Framework',
      'Cross-border Transfer Assessment',
    ],
  },
  {
    id: '2',
    title: 'GDPR Advisory',
    description: 'Expert guidance on General Data Protection Regulation compliance.',
    icon: 'bi-globe',
    shortDescription: 'Full GDPR compliance support',
    features: [
      'GDPR Gap Analysis',
      'Data Processing Agreements',
      'Data Protection Officer Services',
      'Right to Erasure Implementation',
    ],
  },
  {
    id: '3',
    title: 'Data Protection Impact Assessment',
    description: 'Thorough DPIA services to identify and mitigate data protection risks.',
    icon: 'bi-clipboard-data',
    shortDescription: 'Comprehensive risk assessment',
    features: [
      'Risk Identification',
      'Mitigation Strategies',
      'Stakeholder Consultation',
      'Compliance Documentation',
    ],
  },
  {
    id: '4',
    title: 'Third Party Assessment',
    description: 'Evaluate and manage third-party data protection risks.',
    icon: 'bi-people',
    shortDescription: 'Vendor risk management',
    features: [
      'Vendor Due Diligence',
      'Contract Review',
      'Ongoing Monitoring',
      'Incident Response Planning',
    ],
  },
  {
    id: '5',
    title: 'Grievance Redressal',
    description: 'Establish effective grievance redressal mechanisms for data protection.',
    icon: 'bi-chat-dots',
    shortDescription: 'Complaint handling systems',
    features: [
      'Grievance Policy Creation',
      'Response Framework',
      'Escalation Procedures',
      'Monthly Reporting',
    ],
  },
  {
    id: '6',
    title: 'Cookie Consent Solutions',
    description: 'Implement compliant cookie consent management systems.',
    icon: 'bi-cookie',
    shortDescription: 'Cookie banner & consent management',
    features: [
      'Cookie Audit',
      'Consent Banner Implementation',
      'Preference Center',
      'Compliance Documentation',
    ],
  },
];

// Footer Links
export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about/' },
    { label: 'Services', href: '/services/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Contact', href: '/contact-us/' },
  ],
  services: [
    { label: 'Consent Management Platform', href: '/consent-management-platform/' },
    { label: 'Cookie Consent Management', href: '/Cookie-Consent-Management/' },
    { label: 'Data Protection Impact Assessment', href: '/Data-Protection-Impact-Assessment/' },
    { label: 'Third Party Assessment', href: '/Data-Protection-Third-Party-Processors-Assessment/' },
    { label: 'Data Subject Rights & Grievance', href: '/Data-Subject-Rights-and-Grievance-Management/' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms & Conditions', href: '/terms-conditions/' },
    { label: 'Cookie Policy', href: '/cookie-policy/' },
  ],
};

// Animation Configurations
export const ANIMATION_CONFIG = {
  hero: {
    duration: 1,
    ease: 'power3.out',
  },
  stagger: {
    stagger: 0.1,
  },
  fadeIn: {
    duration: 0.8,
    ease: 'power2.out',
  },
  slideUp: {
    duration: 0.8,
    ease: 'power3.out',
  },
};

// SEO Default Values
export const SEO_DEFAULTS = {
  title: 'DPDP Consultants - Data Protection & Privacy Experts',
  description: 'Expert consulting services for DPDP, GDPR compliance and data protection. We help businesses navigate complex privacy regulations.',
  image: '/images/og-image.jpg',
  siteName: 'DPDP Consultants',
  twitterHandle: '@dpdpconsultants',
};
