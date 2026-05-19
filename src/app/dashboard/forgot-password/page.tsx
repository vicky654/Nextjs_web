import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Forgot Password - DPDP Consultants Dashboard',
  description: 'Reset your DPDP Consultants client dashboard password.',
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link href="/" className="auth-logo">
            <span className="logo-highlight">DPDP</span> Consultants
          </Link>
          <h1>Reset Password</h1>
          <p>Enter your email to receive a password reset link</p>
        </div>

        <form className="auth-form" action="/api/auth/forgot-password" method="POST">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100">
            Send Reset Link
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Remember your password?{' '}
            <Link href="/dashboard/login">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
