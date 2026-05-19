import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login - DPDP Consultants Dashboard",
  description: "Login to your DPDP Consultants client dashboard.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const hasError = Boolean(error);

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

        {hasError && (
          <div className="alert alert-danger" role="alert">
            Invalid email or password. Please try again.
          </div>
        )}

        <form className="auth-form" action="/api/auth/login" method="POST">
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

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" name="remember" />
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
