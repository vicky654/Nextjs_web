import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register - DPDP Consultants Dashboard",
  description: "Register for a DPDP Consultants client dashboard account.",
};

export default function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link href="/" className="auth-logo">
            <span className="logo-highlight">DPDP</span> Consultants
          </Link>
          <h1>Create Account</h1>
          <p>Register for your client dashboard</p>
        </div>
        
        <form className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your email" required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input type="text" className="form-control" placeholder="Enter company name" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Create a password" required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" placeholder="Confirm password" required />
          </div>
          
          <button type="submit" className="btn btn-primary btn-lg w-100">
            Register
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <Link href="/dashboard/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
}
