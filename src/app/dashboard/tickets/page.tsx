import type { Metadata } from "next";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata: Metadata = {
  title: "Tickets - DPDP Consultants Dashboard",
  description: "Manage your support tickets.",
};

export default function TicketsPage() {
  const tickets = [
    { id: 1, subject: "DPIA Review Request", status: "open", priority: "high", createdAt: "2024-01-20" },
    { id: 2, subject: "Consent Banner Implementation", status: "in-progress", priority: "medium", createdAt: "2024-01-18" },
    { id: 3, subject: "GDPR Compliance Query", status: "closed", priority: "low", createdAt: "2024-01-15" },
  ];

  return (
    <DashboardLayout>
      <div className="tickets-page">
        <div className="page-header">
          <h1>Support Tickets</h1>
          <button className="btn btn-primary">
            <i className="bi bi-plus-lg me-2"></i> New Ticket
          </button>
        </div>

        <div className="tickets-list">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <div className="ticket-header">
                <h4>{ticket.subject}</h4>
                <span className={`badge bg-${ticket.status === 'open' ? 'success' : ticket.status === 'in-progress' ? 'warning' : 'secondary'}`}>
                  {ticket.status}
                </span>
              </div>
              <div className="ticket-meta">
                <span><i className="bi bi-tag me-1"></i> {ticket.priority}</span>
                <span><i className="bi bi-calendar me-1"></i> {ticket.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
