import type { Metadata } from "next";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata: Metadata = {
  title: "Documents - DPDP Consultants Dashboard",
  description: "Manage your compliance documents.",
};

export default function DocumentsPage() {
  const documents = [
    { id: 1, name: "DPIA Report - Q4 2024", type: "PDF", size: "2.5 MB", uploadedAt: "2024-01-15", status: "approved" },
    { id: 2, name: "Privacy Policy Draft", type: "DOCX", size: "1.2 MB", uploadedAt: "2024-01-18", status: "pending" },
    { id: 3, name: "Data Processing Agreement", type: "PDF", size: "3.1 MB", uploadedAt: "2024-01-20", status: "approved" },
    { id: 4, name: "Consent Management Policy", type: "PDF", size: "1.8 MB", uploadedAt: "2024-01-22", status: "rejected" },
  ];

  return (
    <DashboardLayout>
      <div className="documents-page">
        <div className="page-header">
          <h1>Documents</h1>
          <button className="btn btn-primary">
            <i className="bi bi-upload me-2"></i> Upload Document
          </button>
        </div>

        <div className="documents-table">
          <table className="table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Uploaded</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <i className="bi bi-file-earmark me-2"></i>
                    {doc.name}
                  </td>
                  <td>{doc.type}</td>
                  <td>{doc.size}</td>
                  <td>{doc.uploadedAt}</td>
                  <td>
                    <span className={`badge bg-${doc.status === 'approved' ? 'success' : doc.status === 'pending' ? 'warning' : 'danger'}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1">
                      <i className="bi bi-download"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
