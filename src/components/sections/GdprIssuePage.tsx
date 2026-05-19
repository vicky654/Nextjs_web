import type { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import PageHero from './PageHero';
import SchemaMarkup from '@/components/ui/SchemaMarkup';
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/seo';
import type { BreadcrumbItem } from '@/types';

interface GdprIssuePageProps {
  title: string;
  subtitle: string;
  canonicalPath: string;
  description: string;
  points: string[];
  children?: ReactNode;
}

const homeCrumb: BreadcrumbItem = { label: 'Home', href: '/' };
const issuesCrumb: BreadcrumbItem = { label: 'GDPR Issues', href: '#' };

export default function GdprIssuePage({
  title,
  subtitle,
  canonicalPath,
  description,
  points,
  children,
}: GdprIssuePageProps) {
  const breadcrumbs: BreadcrumbItem[] = [homeCrumb, issuesCrumb, { label: title }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
  const webPageSchema = buildWebPageSchema({ title, description, url: canonicalPath });

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, webPageSchema]} />
      <Header />
      <main>
      <PageHero title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} />
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <p className="lead">{description}</p>

              {points.length > 0 && (
                <>
                  <h2 className="h3 mt-4 mb-3">Key Considerations</h2>
                  <ul className="list-group list-group-flush mb-4">
                    {points.map((p) => (
                      <li key={p} className="list-group-item d-flex align-items-start gap-2">
                        <i className="bi bi-arrow-right-circle-fill text-primary mt-1" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {children}
            </div>
            <div className="col-lg-4">
              <div className="card border-0 bg-light p-4">
                <h3 className="h5 mb-3">Need Expert Guidance?</h3>
                <p className="text-muted small">
                  Our GDPR specialists can help your organisation navigate {title.toLowerCase()} and ensure full compliance.
                </p>
                <Link href="/contact-us/" className="btn btn-primary w-100">
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
