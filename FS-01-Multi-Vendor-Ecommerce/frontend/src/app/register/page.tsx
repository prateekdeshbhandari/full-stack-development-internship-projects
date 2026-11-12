export default function RegisterPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "linear-gradient(135deg, #f7f1e6 0%, #f5f5f2 100%)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 440, background: "#fff", border: "1px solid #eceae1", borderRadius: 24, padding: 28, boxShadow: "0 32px 80px rgba(25, 20, 10, 0.08)" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "#f6d59d", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 18 }}>M</div>
          <h1 style={{ margin: "20px 0 10px", fontSize: 38, letterSpacing: -1.4 }}>Create your account</h1>
          <p style={{ margin: 0, color: "#546369", lineHeight: 1.6 }}>Start selling and managing your brand in minutes.</p>
        </div>

        <form style={{ display: "grid", gap: 16 }}>
          <label style={{ display: "grid", gap: 8, fontWeight: 700, color: "#202b32" }}>
            Full name
            <input type="text" placeholder="Alex Morgan" style={{ border: "1px solid #e9e5dc", borderRadius: 12, padding: "12px 14px", fontSize: 15 }} />
          </label>
          <label style={{ display: "grid", gap: 8, fontWeight: 700, color: "#202b32" }}>
            Business email
            <input type="email" placeholder="alex@market.com" style={{ border: "1px solid #e9e5dc", borderRadius: 12, padding: "12px 14px", fontSize: 15 }} />
          </label>
          <label style={{ display: "grid", gap: 8, fontWeight: 700, color: "#202b32" }}>
            Password
            <input type="password" placeholder="Create a password" style={{ border: "1px solid #e9e5dc", borderRadius: 12, padding: "12px 14px", fontSize: 15 }} />
          </label>
          <button type="submit" style={{ border: "none", background: "#111827", color: "#fff", borderRadius: 999, padding: "14px 18px", fontWeight: 700, fontSize: 15 }}>
            Create account
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 18, color: "#5d6974" }}>
          Already have an account? <a href="/login" style={{ color: "#111827", fontWeight: 800 }}>Log in</a>
        </p>
      </div>
    </main>
  );
}
