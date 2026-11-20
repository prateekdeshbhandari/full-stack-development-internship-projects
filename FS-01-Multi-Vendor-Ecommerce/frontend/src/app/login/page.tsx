"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000").replace(/\/+$/, "");

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign in.");
      }

      if (data.token) {
        localStorage.setItem("mvh_token", data.token);
        localStorage.setItem("mvh_user", JSON.stringify(data.user));
      }

      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "linear-gradient(135deg, #eef5df 0%, #f5f5f2 100%)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420, background: "#fff", border: "1px solid #edf0ee", borderRadius: 24, padding: 28, boxShadow: "0 30px 80px rgba(17, 24, 39, 0.08)" }}>
        <div style={{ marginBottom: 22 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "#dfeecf", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 18 }}>M</div>
          <h1 style={{ margin: "20px 0 10px", fontSize: 38, letterSpacing: -1.4 }}>Welcome back</h1>
          <p style={{ margin: 0, color: "#546369", lineHeight: 1.6 }}>Log in to manage your storefront and orders.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
          <label style={{ display: "grid", gap: 8, fontWeight: 700, color: "#202b32" }}>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@market.com"
              style={{ border: "1px solid #dfe5e1", borderRadius: 12, padding: "12px 14px", fontSize: 15 }}
            />
          </label>
          <label style={{ display: "grid", gap: 8, fontWeight: 700, color: "#202b32" }}>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ border: "1px solid #dfe5e1", borderRadius: 12, padding: "12px 14px", fontSize: 15 }}
            />
          </label>

          {error && <p role="alert" style={{ margin: 0, color: "#b42318", fontSize: 14 }}>{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ border: "none", background: "#111827", color: "#fff", borderRadius: 999, padding: "14px 18px", fontWeight: 700, fontSize: 15, cursor: "pointer", opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 18, color: "#5d6974" }}>
          New here? <Link href="/register" style={{ color: "#111827", fontWeight: 800 }}>Create account</Link>
        </p>
      </div>
    </main>
  );
}
