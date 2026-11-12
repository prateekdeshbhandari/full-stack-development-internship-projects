export default function LoginPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "linear-gradient(135deg, #eef5df 0%, #f5f5f2 100%)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420, background: "#fff", border: "1px solid #edf0ee", borderRadius: 24, padding: 28, boxShadow: "0 30px 80px rgba(17, 24, 39, 0.08)" }}>
        <div style={{ marginBottom: 22 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "#dfeecf", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 18 }}>M</div>
          <h1 style={{ margin: "20px 0 10px", fontSize: 38, letterSpacing: -1.4 }}>Welcome back</h1>
          <p style={{ margin: 0, color: "#546369", lineHeight: 1.6 }}>Log in to manage your storefront and orders.</p>
        </div>

        <form style={{ display: "grid", gap: 18 }}>
          <label style={{ display: "grid", gap: 8, fontWeight: 700, color: "#202b32" }}>
            Email
            <input type="email" placeholder="you@market.com" style={{ border: "1px solid #dfe5e1", borderRadius: 12, padding: "12px 14px", fontSize: 15 }} />
          </label>
          <label style={{ display: "grid", gap: 8, fontWeight: 700, color: "#202b32" }}>
            Password
            <input type="password" placeholder="••••••••" style={{ border: "1px solid #dfe5e1", borderRadius: 12, padding: "12px 14px", fontSize: 15 }} />
          </label>
          <button type="submit" style={{ border: "none", background: "#111827", color: "#fff", borderRadius: 999, padding: "14px 18px", fontWeight: 700, fontSize: 15 }}>
            Sign in
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 18, color: "#5d6974" }}>
          New here? <a href="/register" style={{ color: "#111827", fontWeight: 800 }}>Create account</a>
        </p>
      </div>
    </main>
  );
}
