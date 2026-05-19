import Breadcrumb from '@/components/ui/Breadcrumb';
import type { BreadcrumbItem } from '@/types';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageHero({ title, subtitle, breadcrumbs }: PageHeroProps) {
  return (
    <section className="page-hero py-5 bg-primary text-white">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <h1 className="display-5 fw-bold mb-2">{title}</h1>
            {subtitle && <p className="lead mb-3 opacity-75">{subtitle}</p>}
            <Breadcrumb items={breadcrumbs} />
          </div>
        </div>
      </div>
    </section>
  );
}
