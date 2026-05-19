/**
 * Type definitions for DPDP Consultants Website
 */

// Blog Post Types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  featuredImage: string;
  publishedAt: string;
  category: string;
  tags: string[];
  readTime: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

// Service Types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  shortDescription: string;
}

// Resource Types
export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  type: 'guide' | 'checklist' | 'template' | 'whitepaper' | 'regulation';
  downloadLink?: string;
  featuredImage: string;
  publishedAt: string;
  author: string;
}

// Dashboard Types
export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  company?: string;
  phone?: string;
  joinedAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  lastUpdated: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// SEO Types
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  openGraph?: {
    title: string;
    description: string;
    image: string;
    url: string;
    type: string;
  };
  twitter?: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
}

// DB Blog Post (MongoDB)
export interface DbBlogPost {
  id: string;
  status: boolean;
  recdate: Date;
  recpub: string | null;
  rectitle: string;
  recdesc: string;
  summary: string | null;
  metadesc: string | null;
  metakeyw: string | null;
  recimg: string | null;
  imgalt: string | null;
  recfile: string | null;
  slug: string | null;
  author: string;
  author_image: string | null;
  category: string;
  tags: string[];
  read_time: number | null;
  faq_schema: FAQItem[] | null;
  updated_at: Date | null;
  is_featured: boolean;
  is_archived: boolean;
}

export interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// Animation Types
export interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
  stagger?: number;
}
