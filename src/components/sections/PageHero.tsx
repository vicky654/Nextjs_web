import Breadcrumb from '@/components/ui/Breadcrumb';
import type { BreadcrumbItem } from '@/types';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageHero({ title, subtitle, breadcrumbs }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <h1>{title}</h1>
            {subtitle && <p className="lead">{subtitle}</p>}
            <Breadcrumb items={breadcrumbs} />
          </div>
        </div>
      </div>
    </section>
  );
}
