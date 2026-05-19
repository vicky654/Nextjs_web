import type { Metadata } from "next";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata: Metadata = {
  title: "Profile - DPDP Consultants Dashboard",
  description: "Manage your profile settings.",
};

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="profile-page">
        <h1>Profile Settings</h1>
        
        <div className="row g-4 mt-4">
          <div className="col-lg-4">
            <div className="profile-card">
              <div className="profile-avatar">
                <span>JD</span>
              </div>
              <h3>John Doe</h3>
              <p>john.doe@company.com</p>
              <span className="badge bg-primary">Client</span>
            </div>
          </div>
          
          <div className="col-lg-8">
            <div className="profile-form">
              <h4>Personal Information</h4>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" defaultValue="John Doe" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" defaultValue="john.doe@company.com" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" className="form-control" defaultValue="+91 98765 43210" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Company Name</label>
                    <input type="text" className="form-control" defaultValue="Acme Corp" />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
