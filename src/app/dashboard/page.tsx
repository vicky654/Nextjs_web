import type { Metadata } from "next";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata: Metadata = {
  title: "Dashboard - DPDP Consultants",
  description: "Your client dashboard for managing compliance documents and tickets.",
};

export default function DashboardHomePage() {
  return (
    <DashboardLayout>
      <div className="dashboard-home">
        <h1>Welcome to Your Dashboard</h1>
        <p className="subtitle">Manage your compliance documents and support tickets</p>
        
        <div className="row g-4 mt-4">
          <div className="col-md-4">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-folder"></i>
              </div>
              <div className="stat-info">
                <h3>12</h3>
                <p>Documents</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-chat-dots"></i>
              </div>
              <div className="stat-info">
                <h3>3</h3>
                <p>Open Tickets</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-check-circle"></i>
              </div>
              <div className="stat-info">
                <h3>8</h3>
                <p>Completed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-4">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <h4>Recent Documents</h4>
              </div>
              <div className="card-body">
                <div className="document-list">
                  <div className="document-item">
                    <i className="bi bi-file-pdf"></i>
                    <span>DPIA Report - Q4 2024</span>
                    <span className="badge bg-success">Approved</span>
                  </div>
                  <div className="document-item">
                    <i className="bi bi-file-pdf"></i>
                    <span>Privacy Policy Draft</span>
                    <span className="badge bg-warning">Pending</span>
                  </div>
                  <div className="document-item">
                    <i className="bi bi-file-pdf"></i>
                    <span>Data Processing Agreement</span>
                    <span className="badge bg-success">Approved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h4>Quick Actions</h4>
              </div>
              <div className="card-body">
                <div className="quick-actions">
                  <a href="/dashboard/documents" className="action-btn">
                    <i className="bi bi-upload"></i> Upload Document
                  </a>
                  <a href="/dashboard/tickets" className="action-btn">
                    <i className="bi bi-plus-circle"></i> New Ticket
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
