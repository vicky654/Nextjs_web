import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { RESOURCES } from "@/data/resources";

export const metadata: Metadata = {
  title: "Resources - DPDP Consultants",
  description: "Access our collection of guides, checklists, templates, and resources for data protection compliance.",
};

export default function ResourcesPage() {
  return (
    <>
      <Header />
      
      <main>
        <section className="page-header">
          <div className="container">
            <h1>Resources</h1>
            <p>Guides, Checklists & Templates for Compliance</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="row g-4">
              {RESOURCES.map((resource) => (
                <div className="col-md-6 col-lg-4" key={resource.id}>
                  <div className="resource-card">
                    <div className="resource-type">{resource.type}</div>
                    <h3>{resource.title}</h3>
                    <p>{resource.description}</p>
                    <a href={`/resources/${resource.slug}`} className="resource-link">
                      Read More <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}