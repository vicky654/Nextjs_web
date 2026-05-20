import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import LogosBar from "@/components/home/LogosBar";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import TeamSection from "@/components/home/TeamSection";
import BlogSection from "@/components/home/BlogSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";
import ContactSection from "@/components/home/ContactSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import HomeFooter from "@/components/home/HomeFooter";
import { SERVICES } from "@/lib/constants";
import { getCachedBlogs } from "@/lib/blog";
import type { DbBlogPost } from "@/types";

export const metadata: Metadata = {
  title: "EU's Best GDPR Compliance Management Software",
  description: "Achieve GDPR compliance with EU's leading GDPR compliance tools and automated GDPR software for complete data protection management.",
  keywords: "GDPR compliance software EU, GDPR tools, GDPR automation, GDPR compliance solutions",
  alternates: { canonical: "https://www.gdprconsultants.in/" },
  openGraph: {
    title: "EU's Best GDPR Compliance Management Software",
    description: "Achieve GDPR compliance with EU's leading GDPR compliance tools and automated GDPR software for complete data protection management.",
    url: "https://www.gdprconsultants.in/",
    siteName: "GDPR Consultants",
    images: [{ url: "https://www.gdprconsultants.in/images/og-image.svg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EU's Best GDPR Compliance Management Software",
    description: "Achieve GDPR compliance with EU's leading GDPR compliance tools and automated GDPR software for complete data protection management.",
    images: ["https://www.gdprconsultants.in/images/og-image.svg"],
    site: "@gdprconsultants",
  },
};

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string;
  bio: string;
  social_links: { linkedin?: string; twitter?: string; email?: string };
  expertise: string[];
}

interface LogoItem {
  id: string;
  company_name: string;
  logo: string;
  website: string;
}

export default async function HomePage() {
  // Fetch dynamic data — all failures are non-fatal
  let recentPosts: DbBlogPost[] = [];
  let teamMembers: TeamMember[] = [];
  let clientLogos: LogoItem[] = [];

  try {
    const result = await getCachedBlogs(1, 3);
    recentPosts = result.posts;
  } catch (err) {
    console.error('[Home] Blog fetch failed:', err instanceof Error ? err.message : err);
  }

  try {
    const mod = await import('@/lib/team') as { getActiveTeam?: () => Promise<TeamMember[]> };
    if (mod.getActiveTeam) teamMembers = await mod.getActiveTeam();
  } catch { /* team module not yet created — render without */ }

  try {
    const mod = await import('@/lib/clientLogos') as { getActiveClientLogos?: () => Promise<LogoItem[]> };
    if (mod.getActiveClientLogos) clientLogos = await mod.getActiveClientLogos();
  } catch { /* logos module not yet created — render without */ }

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <LogosBar logos={clientLogos} />
        <StatsSection />
        <ServicesSection services={SERVICES} />
        <WhyUsSection />
        <TeamSection members={teamMembers} />
        <BlogSection posts={recentPosts} />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
        <NewsletterSection />
      </main>
      <HomeFooter />
    </>
  );
}
