import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { RESOURCES, getResourceBySlug } from "@/data/resources";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

interface ResourceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RESOURCES.map((resource) => ({
    slug: resource.slug,
  }));
}

export async function generateMetadata({ params }: ResourceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  
  if (!resource) {
    return {
      title: "Resource Not Found - DPDP Consultants",
    };
  }

  return {
    title: `${resource.title} - DPDP Consultants`,
    description: resource.description,
  };
}

export default async function ResourceDetailPage({ params }: ResourceDetailPageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  return (
    <>
      <Header />
      
      <main>
        <section className="page-header">
          <div className="container">
            <span className="type-badge">{resource.type}</span>
            <h1>{resource.title}</h1>
            <div className="post-meta">
              <span><i className="bi bi-calendar3"></i> {formatDate(resource.publishedAt)}</span>
              <span><i className="bi bi-person"></i> {resource.author}</span>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="resource-content">
              <div 
                className="content-body"
                dangerouslySetInnerHTML={{ __html: resource.content }}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
