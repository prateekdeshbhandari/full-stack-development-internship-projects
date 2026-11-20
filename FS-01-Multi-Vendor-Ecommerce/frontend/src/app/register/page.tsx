"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000").replace(/\/+$/, "");

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("vendor");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create account.");
      }

      if (data.token) {
        localStorage.setItem("mvh_token", data.token);
        localStorage.setItem("mvh_user", JSON.stringify(data.user));
      }

      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to register.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "linear-gradient(135deg, #f7f1e6 0%, #f5f5f2 100%)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 440, background: "#fff", border: "1px solid #eceae1", borderRadius: 24, padding: 28, boxShadow: "0 32px 80px rgba(25, 20, 10, 0.08)" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "#f6d59d", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 18 }}>M</div>
          <h1 style={{ margin: "20px 0 10px", fontSize: 38, letterSpacing: -1.4 }}>Create your account</h1>
          <p style={{ margin: 0, color: "#546369", lineHeight: 1.6 }}>Start selling and managing your brand in minutes.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <label style={{ display: "grid", gap: 8, fontWeight: 700, color: "#202b32" }}>
            Full name
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Morgan"
              style={{ border: "1px solid #e9e5dc", borderRadius: 12, padding: "12px 14px", fontSize: 15 }}
            />
          </label>
          <label style={{ display: "grid", gap: 8, fontWeight: 700, color: "#202b32" }}>
            Business email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@market.com"
              style={{ border: "1px solid #e9e5dc", borderRadius: 12, padding: "12px 14px", fontSize: 15 }}
            />
          </label>
          <label style={{ display: "grid", gap: 8, fontWeight: 700, color: "#202b32" }}>
            Password
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password (min 6 chars)"
              style={{ border: "1px solid #e9e5dc", borderRadius: 12, padding: "12px 14px", fontSize: 15 }}
            />
          </label>
          <label style={{ display: "grid", gap: 8, fontWeight: 700, color: "#202b32" }}>
            Account type
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ border: "1px solid #e9e5dc", borderRadius: 12, padding: "12px 14px", fontSize: 15, background: "#fff" }}
            >
              <option value="vendor">Vendor (Sell products)</option>
              <option value="customer">Customer (Buy products)</option>
            </select>
          </label>

          {error && <p role="alert" style={{ margin: 0, color: "#b42318", fontSize: 14 }}>{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ border: "none", background: "#111827", color: "#fff", borderRadius: 999, padding: "14px 18px", fontWeight: 700, fontSize: 15, cursor: "pointer", opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 18, color: "#5d6974" }}>
          Already have an account? <Link href="/login" style={{ color: "#111827", fontWeight: 800 }}>Log in</Link>
        </p>
      </div>
    </main>
  );
}
