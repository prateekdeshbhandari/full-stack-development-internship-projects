export default function RegisterPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "linear-gradient(135deg, #f7f1e6 0%, #f6f7f3 100%)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 460, background: "#fff", border: "1px solid #eceae1", borderRadius: 24, boxShadow: "0 28px 80px rgba(29, 20, 10, 0.1)", padding: 28 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: "#f6d59d", display: "grid", placeItems: "center", fontSize: 18, fontWeight: 800 }}>g</div>
          <h1 style={{ margin: "18px 0 8px", fontSize: 38, letterSpacing: -1.5 }}>Create your account</h1>
          <p style={{ margin: 0, color: "#58615a", lineHeight: 1.5 }}>Set up your space and start collaborating with your team.</p>
        </div>

        <form style={{ display: "grid", gap: 16 }}>
          <label style={{ display: "grid", gap: 8, fontWeight: 600, color: "#2a312a" }}>
            Full name
            <input type="text" placeholder="Alex Morgan" style={{ border: "1px solid #e2ddd0", borderRadius: 12, padding: "12px 14px", fontSize: 15 }} />
          </label>
          <label style={{ display: "grid", gap: 8, fontWeight: 600, color: "#2a312a" }}>
            Work email
            <input type="email" placeholder="alex@company.com" style={{ border: "1px solid #e2ddd0", borderRadius: 12, padding: "12px 14px", fontSize: 15 }} />
          </label>
          <label style={{ display: "grid", gap: 8, fontWeight: 600, color: "#2a312a" }}>
            Password
            <input type="password" placeholder="Create a password" style={{ border: "1px solid #e2ddd0", borderRadius: 12, padding: "12px 14px", fontSize: 15 }} />
          </label>
          <button type="submit" style={{ border: "none", background: "#20261f", color: "#fff", borderRadius: 999, padding: "14px 18px", fontWeight: 700, fontSize: 15 }}>
            Create account
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 18, color: "#5f665f" }}>
          Already have an account? <a href="/login" style={{ color: "#1d271c", fontWeight: 700 }}>Sign in</a>
        </p>
      </div>
    </main>
  );
}
