import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login - DPDP Consultants Dashboard",
  description: "Login to your DPDP Consultants client dashboard.",
};

export default function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link href="/" className="auth-logo">
            <span className="logo-highlight">DPDP</span> Consultants
          </Link>
          <h1>Welcome Back</h1>
          <p>Login to your client dashboard</p>
        </div>
        
        <form className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your email" required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" required />
          </div>
          
          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link href="/dashboard/forgot-password" className="forgot-link">Forgot password?</Link>
          </div>
          
          <button type="submit" className="btn btn-primary btn-lg w-100">
            Login
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don&apos;t have an account? <Link href="/dashboard/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
}
