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
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "linear-gradient(135deg, #eff7dc 0%, #f8f6f1 100%)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 440, background: "#fff", border: "1px solid #eaeae2", borderRadius: 24, boxShadow: "0 28px 80px rgba(16, 22, 16, 0.08)", padding: 28 }}>
        <div style={{ marginBottom: 26 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: "#dbeab3", display: "grid", placeItems: "center", fontSize: 18, fontWeight: 800 }}>g</div>
          <h1 style={{ margin: "18px 0 8px", fontSize: 38, letterSpacing: -1.5 }}>Welcome back</h1>
          <p style={{ margin: 0, color: "#58615a", lineHeight: 1.5 }}>Sign in to keep your work moving with the team.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
          <label style={{ display: "grid", gap: 8, fontWeight: 600, color: "#2a312a" }}>
            Email
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              style={{ border: "1px solid #dfe5d8", borderRadius: 12, padding: "12px 14px", fontSize: 15 }}
            />
          </label>
          <label style={{ display: "grid", gap: 8, fontWeight: 600, color: "#2a312a" }}>
            Password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              style={{ border: "1px solid #dfe5d8", borderRadius: 12, padding: "12px 14px", fontSize: 15 }}
            />
          </label>
          {error && <p role="alert" style={{ margin: 0, color: "#b42318" }}>{error}</p>}
          <button disabled={isSubmitting} type="submit" style={{ border: "none", background: "#20261f", color: "#fff", borderRadius: 999, padding: "14px 18px", fontWeight: 700, fontSize: 15, opacity: isSubmitting ? 0.7 : 1 }}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 18, color: "#5f665f" }}>
          New here? <Link href="/register" style={{ color: "#1d271c", fontWeight: 700 }}>Create account</Link>
        </p>
      </div>
    </main>
  );
}
