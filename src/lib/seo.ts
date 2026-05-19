import type { Metadata } from 'next';
import type { DbBlogPost, BreadcrumbItem, FAQItem } from '@/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gdprconsultants.in';
const SITE_NAME = 'GDPR Consultants';
const DEFAULT_OG_IMAGE = '/images/og-image.svg';
const TWITTER_HANDLE = '@gdprconsultants';

export interface PageMetaConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  noIndex?: boolean;
}

export function getCanonicalUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export function getFallbackOGImage(): string {
  return `${SITE_URL}${DEFAULT_OG_IMAGE}`;
}

export function buildPageMeta(config: PageMetaConfig): Metadata {
  const canonical = getCanonicalUrl(config.canonicalPath);
  const ogImage = config.ogImage ?? getFallbackOGImage();
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: { canonical },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: config.title }],
      locale: 'en_IN',
      type: config.ogType ?? 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [ogImage],
      site: TWITTER_HANDLE,
    },
    robots: config.noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

export function buildBlogMeta(post: DbBlogPost): Metadata {
  const slug = post.slug ?? String(post.id);
  const canonical = getCanonicalUrl(`/blog/${slug}`);
  const ogImage = post.recimg?.startsWith('http') ? post.recimg : getFallbackOGImage();
  return {
    title: post.rectitle,
    description: post.metadesc ?? post.summary ?? '',
    keywords: post.metakeyw ?? undefined,
    alternates: { canonical },
    openGraph: {
      title: post.rectitle,
      description: post.metadesc ?? post.summary ?? '',
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.imgalt ?? post.rectitle }],
      locale: 'en_IN',
      type: 'article',
      publishedTime: post.recdate?.toISOString(),
      modifiedTime: post.updated_at?.toISOString(),
      authors: [post.author ?? 'GDPR Consultants'],
      tags: post.tags ?? [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.rectitle,
      description: post.metadesc ?? post.summary ?? '',
      images: [ogImage],
      site: TWITTER_HANDLE,
    },
    robots: { index: true, follow: true },
  };
}

// JSON-LD schema builders
export function buildOrgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/og-image.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@gdprconsultants.in',
      areaServed: 'EU',
      availableLanguage: 'English',
    },
    sameAs: [],
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: item.href ? getCanonicalUrl(item.href) : undefined,
    })),
  };
}

export function buildArticleSchema(post: DbBlogPost, url: string) {
  const ogImage = post.recimg?.startsWith('http') ? post.recimg : getFallbackOGImage();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.rectitle,
    description: post.metadesc ?? post.summary ?? '',
    image: ogImage,
    datePublished: post.recdate?.toISOString(),
    dateModified: (post.updated_at ?? post.recdate)?.toISOString(),
    author: { '@type': 'Organization', name: post.author ?? SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/og-image.svg` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

export function buildFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function buildSoftwareAppSchema(tool: { name: string; description: string; url: string; features: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: getCanonicalUrl(tool.url),
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    featureList: tool.features,
  };
}

export function buildWebPageSchema(page: { title: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: getCanonicalUrl(page.url),
    isPartOf: { '@type': 'WebSite', url: SITE_URL, name: SITE_NAME },
  };
}

