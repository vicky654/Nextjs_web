"use client";

/**
 * ServiceCard Component
 * Card component for displaying service information
 */

import Link from "next/link";
import { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="service-card">
      <div className="service-icon">
        <i className={service.icon}></i>
      </div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-description">{service.shortDescription}</p>
      <ul className="service-features">
        {service.features.slice(0, 3).map((feature, index) => (
          <li key={index}>
            <i className="bi bi-check-circle-fill"></i>
            {feature}
          </li>
        ))}
      </ul>
      <Link href="/services" className="service-link">
        Learn More <i className="bi bi-arrow-right"></i>
      </Link>

      <style jsx>{`
        .service-card {
          background: #fff;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }

        .service-icon {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #1e3a5f 0%, #00a8cc 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .service-icon i {
          font-size: 1.75rem;
          color: #fff;
        }

        .service-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e3a5f;
          margin-bottom: 12px;
        }

        .service-description {
          color: #6c757d;
          margin-bottom: 20px;
          line-height: 1.7;
        }

        .service-features {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
          flex: 1;
        }

        .service-features li {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          color: #495057;
          font-size: 0.9rem;
        }

        .service-features li i {
          color: #00a8cc;
          font-size: 0.9rem;
        }

        .service-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #00a8cc;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .service-link:hover {
          gap: 12px;
          color: #1e3a5f;
        }
      `}</style>
    </div>
  );
}
