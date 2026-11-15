"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../../services/api";

type AuthResponse = {
  user: { id: string; name: string; email: string };
  token: string;
};

const getErrorMessage = (error: unknown) => {
  if (!(error instanceof Error)) return "Unable to create your account. Please try again.";
  try {
    const response = JSON.parse(error.message) as { message?: string };
    return response.message || error.message;
  } catch {
    return error.message;
  }
};

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const { token } = await apiRequest<AuthResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      window.sessionStorage.setItem("authToken", token);
      router.replace("/dashboard");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "linear-gradient(135deg, #f7f1e6 0%, #f6f7f3 100%)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 460, background: "#fff", border: "1px solid #eceae1", borderRadius: 24, boxShadow: "0 28px 80px rgba(29, 20, 10, 0.1)", padding: 28 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: "#f6d59d", display: "grid", placeItems: "center", fontSize: 18, fontWeight: 800 }}>g</div>
          <h1 style={{ margin: "18px 0 8px", fontSize: 38, letterSpacing: -1.5 }}>Create your account</h1>
          <p style={{ margin: 0, color: "#58615a", lineHeight: 1.5 }}>Set up your space and start collaborating with your team.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <label style={{ display: "grid", gap: 8, fontWeight: 600, color: "#2a312a" }}>
            Full name
            <input
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Alex Morgan"
              style={{ border: "1px solid #e2ddd0", borderRadius: 12, padding: "12px 14px", fontSize: 15 }}
            />
          </label>
          <label style={{ display: "grid", gap: 8, fontWeight: 600, color: "#2a312a" }}>
            Work email
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="alex@company.com"
              style={{ border: "1px solid #e2ddd0", borderRadius: 12, padding: "12px 14px", fontSize: 15 }}
            />
          </label>
          <label style={{ display: "grid", gap: 8, fontWeight: 600, color: "#2a312a" }}>
            Password
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={72}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password (at least 8 characters)"
              style={{ border: "1px solid #e2ddd0", borderRadius: 12, padding: "12px 14px", fontSize: 15 }}
            />
          </label>
          {error && <p role="alert" style={{ margin: 0, color: "#b42318" }}>{error}</p>}
          <button disabled={isSubmitting} type="submit" style={{ border: "none", background: "#20261f", color: "#fff", borderRadius: 999, padding: "14px 18px", fontWeight: 700, fontSize: 15, opacity: isSubmitting ? 0.7 : 1 }}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 18, color: "#5f665f" }}>
          Already have an account? <a href="/login" style={{ color: "#1d271c", fontWeight: 700 }}>Sign in</a>
        </p>
      </div>
    </main>
  );
}
