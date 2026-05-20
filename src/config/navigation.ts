import type { ComponentType } from 'react';
import {
  Shield,
  Cookie,
  ClipboardList,
  Users,
  MessageSquare,
  AlertCircle,
  ArrowLeftRight,
  Globe,
  TrendingUp,
  Building2,
  Code2,
  GraduationCap,
  Link2,
  FlaskConical,
  Coins,
  Award,
  AlertTriangle,
  Flag,
  Heart,
} from 'lucide-react';

type NavIcon = ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

export interface NavConfigItem {
  label: string;
  href: string;
  description?: string;
  icon?: NavIcon;
  children?: NavConfigItem[];
  isMegaMenu?: boolean;
}

export const NAV_CONFIG: NavConfigItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Services', href: '/services/' },
  {
    label: 'Compliance Tools',
    href: '#',
    children: [
      {
        label: 'Consent Management Platform',
        href: '/consent-management-platform/',
        icon: Shield,
        description: 'Manage user consents at scale with auditable trails',
      },
      {
        label: 'Cookie Consent Management',
        href: '/Cookie-Consent-Management/',
        icon: Cookie,
        description: 'GDPR-ready cookie banners & preference centers',
      },
      {
        label: 'Data Protection Impact Assessment',
        href: '/Data-Protection-Impact-Assessment/',
        icon: ClipboardList,
        description: 'Identify and mitigate data protection risks',
      },
      {
        label: 'Third Party Risk Assessment',
        href: '/Data-Protection-Third-Party-Processors-Assessment/',
        icon: Users,
        description: 'Evaluate vendor compliance and data handling',
      },
      {
        label: 'Data Subject Rights & Grievance',
        href: '/Data-Subject-Rights-and-Grievance-Management/',
        icon: MessageSquare,
        description: 'Handle rights requests and complaints efficiently',
      },
    ],
  },
  {
    label: 'GDPR Issues',
    href: '#',
    isMegaMenu: true,
    children: [
      { label: 'Administrative Fines and Penalties', href: '/administrative-fines-and-penalties/', icon: AlertCircle },
      { label: 'Data Transfer Issues', href: '/data-transfer-issues/', icon: ArrowLeftRight },
      { label: 'GDPR and Rest of The World', href: '/GDPR-and-rest-of-the-world/', icon: Globe },
      { label: 'GDPR and Business Development', href: '/GDPR-and-business-development/', icon: TrendingUp },
      { label: 'GDPR and Hotel Industry', href: '/GDPR-and-hotel-Industry/', icon: Building2 },
      { label: 'GDPR and Software Development', href: '/GDPR-and-software-development/', icon: Code2 },
      { label: 'GDPR and Elearning Business', href: '/GDPR-and-elearning-business/', icon: GraduationCap },
      { label: 'Subcontract and Third Party Issues', href: '/subcontract-and-third-party-issues/', icon: Link2 },
      { label: 'GDPR and BIO', href: '/GDPR-and-BIO/', icon: FlaskConical },
      { label: 'GDPR and Crypto World', href: '/GDPR-and-crypto-world/', icon: Coins },
      { label: 'GDPR Certification', href: '/gdpr-certification/', icon: Award },
      { label: 'Business Discontinuity', href: '/business-discontinuity/', icon: AlertTriangle },
      { label: 'GDPR and EU Representation', href: '/GDPR-and-EU-Representation/', icon: Flag },
      { label: 'GDPR and NGO', href: '/GDPR-and-NGO/', icon: Heart },
    ],
  },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact-us/' },
];
