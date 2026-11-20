"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";

const getErrorMessage = (error: unknown) => {
  if (!(error instanceof Error)) return "Unable to sign in. Please try again.";
  try {
    const response = JSON.parse(error.message) as { message?: string };
    return response.message || error.message;
  } catch {
    return error.message;
  }
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      router.replace("/dashboard");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "linear-gradient(135deg, #eff7dc 0%, #f8f6f1 100%)", padding: 24, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 450, background: "#fff", border: "1px solid #eaeae2", borderRadius: 24, boxShadow: "0 28px 80px rgba(16, 22, 16, 0.08)", padding: "32px 28px" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "#dbeab3", display: "grid", placeItems: "center", fontSize: 18, fontWeight: 800, color: "#2d4411" }}>⚡</div>
            <Link href="/document" style={{ color: "#58615a", fontSize: 13, textDecoration: "none", fontWeight: 600 }}>Open Live Editor →</Link>
          </div>
          <h1 style={{ margin: "18px 0 8px", fontSize: 34, letterSpacing: -1.4, color: "#1a2119" }}>Welcome back</h1>
          <p style={{ margin: 0, color: "#58615a", lineHeight: 1.5, fontSize: 15 }}>Sign in to collaborate live on documents with your team.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
          <label style={{ display: "grid", gap: 8, fontWeight: 600, color: "#2a312a", fontSize: 14 }}>
            Work Email
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="alex@company.com"
              style={{ border: "1px solid #dfe5d8", borderRadius: 12, padding: "12px 14px", fontSize: 15, outline: "none" }}
            />
          </label>
          <label style={{ display: "grid", gap: 8, fontWeight: 600, color: "#2a312a", fontSize: 14 }}>
            Password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              style={{ border: "1px solid #dfe5d8", borderRadius: 12, padding: "12px 14px", fontSize: 15, outline: "none" }}
            />
          </label>

          {error && <p role="alert" style={{ margin: 0, color: "#b42318", fontSize: 14, background: "#fef3f2", padding: "10px 12px", borderRadius: 8 }}>{error}</p>}

          <button
            disabled={isSubmitting}
            type="submit"
            style={{
              border: "none",
              background: "#20261f",
              color: "#fff",
              borderRadius: 999,
              padding: "14px 18px",
              fontWeight: 700,
              fontSize: 15,
              opacity: isSubmitting ? 0.7 : 1,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(26, 38, 22, 0.18)",
            }}
          >
            {isSubmitting ? "Signing in..." : "Sign in to Workspace"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 22, color: "#5f665f", fontSize: 14 }}>
          New team member? <Link href="/register" style={{ color: "#1d271c", fontWeight: 700 }}>Create an account</Link>
        </p>
      </div>
    </main>
  );
}
