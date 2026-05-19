import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServiceCard from "@/components/sections/ServiceCard";
import BlogCard from "@/components/sections/BlogCard";
import CTASection from "@/components/sections/CTASection";
import { SERVICES } from "@/lib/constants";
import { BLOG_POSTS } from "@/data/blog";

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
    locale: "en_IN",
    type: "website",
  },
};

export default function HomePage() {
  const recentPosts = BLOG_POSTS.slice(0, 3);

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection
          subtitle="Data Protection Experts"
          title="Secure Your Business with Expert Privacy Consulting"
          description="We help organizations navigate the complex landscape of data protection regulations including DPDP Act and GDPR. Our expert team ensures your business stays compliant while focusing on growth."
          primaryCTA={{ label: "Get Started", href: "/contact" }}
          secondaryCTA={{ label: "Our Services", href: "/services" }}
        />

        {/* Services Section */}
        <section className="section">
          <div className="container">
            <div className="section-title">
              <span className="subtitle">Our Services</span>
              <h2>Comprehensive Data Protection Solutions</h2>
              <p>
                We offer end-to-end consulting services to help your organization achieve and maintain compliance with data protection regulations.
              </p>
            </div>
            <div className="row g-4">
              {SERVICES.map((service) => (
                <div className="col-md-6 col-lg-4" key={service.id}>
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section section-bg">
          <div className="container">
            <div className="row g-4 text-center">
              <div className="col-6 col-md-3">
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Clients Served</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-item">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Success Rate</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Expert Consultants</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-item">
                  <div className="stat-number">10+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="section">
          <div className="container">
            <div className="section-title">
              <span className="subtitle">Latest Insights</span>
              <h2>Recent Blog Posts</h2>
              <p>
                Stay updated with the latest trends and developments in data protection and privacy regulations.
              </p>
            </div>
            <div className="row g-4">
              {recentPosts.map((post) => (
                <div className="col-md-6 col-lg-4" key={post.id}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Ready to Secure Your Business?"
          description="Contact us today to learn how we can help your organization achieve data protection compliance."
          primaryCTA={{ label: "Contact Us", href: "/contact" }}
          secondaryCTA={{ label: "About Us", href: "/about" }}
        />
      </main>

      <Footer />

      {/* Additional Styles */}
    </>
  );
}
