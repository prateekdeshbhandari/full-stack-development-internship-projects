export default function LoginPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "linear-gradient(135deg, #eff7dc 0%, #f8f6f1 100%)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 440, background: "#fff", border: "1px solid #eaeae2", borderRadius: 24, boxShadow: "0 28px 80px rgba(16, 22, 16, 0.08)", padding: 28 }}>
        <div style={{ marginBottom: 26 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: "#dbeab3", display: "grid", placeItems: "center", fontSize: 18, fontWeight: 800 }}>g</div>
          <h1 style={{ margin: "18px 0 8px", fontSize: 38, letterSpacing: -1.5 }}>Welcome back</h1>
          <p style={{ margin: 0, color: "#58615a", lineHeight: 1.5 }}>Sign in to keep your work moving with the team.</p>
        </div>

        <form style={{ display: "grid", gap: 18 }}>
          <label style={{ display: "grid", gap: 8, fontWeight: 600, color: "#2a312a" }}>
            Email
            <input type="email" placeholder="you@company.com" style={{ border: "1px solid #dfe5d8", borderRadius: 12, padding: "12px 14px", fontSize: 15 }} />
          </label>
          <label style={{ display: "grid", gap: 8, fontWeight: 600, color: "#2a312a" }}>
            Password
            <input type="password" placeholder="••••••••" style={{ border: "1px solid #dfe5d8", borderRadius: 12, padding: "12px 14px", fontSize: 15 }} />
          </label>
          <button type="submit" style={{ border: "none", background: "#20261f", color: "#fff", borderRadius: 999, padding: "14px 18px", fontWeight: 700, fontSize: 15 }}>
            Sign in
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 18, color: "#5f665f" }}>
          New here? <a href="/register" style={{ color: "#1d271c", fontWeight: 700 }}>Create account</a>
        </p>
      </div>
    </main>
  );
}
