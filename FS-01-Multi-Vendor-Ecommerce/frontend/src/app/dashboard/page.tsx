export default function DashboardPage() {
  const stats = [
    { label: "Orders", value: "1,284" },
    { label: "Revenue", value: "$34.2k" },
    { label: "Conversion", value: "7.8%" },
  ];

  const cards = [
    { title: "Best sellers", summary: "Top items over the last 7 days by revenue and repeat orders.", tag: "Top 10" },
    { title: "Inventory health", summary: "Low stock alerts are being monitored across your vendors.", tag: "Healthy" },
    { title: "Customer feedback", summary: "Average rating remains strong across the marketplace.", tag: "4.9/5" },
  ];

  return (
    <main style={{ background: "#f5f5f2", minHeight: "100vh", padding: 32 }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ margin: 0, color: "#4c5a62", textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700, fontSize: 12 }}>Overview</p>
            <h1 style={{ margin: "10px 0 0", fontSize: 46, letterSpacing: -1.8 }}>Seller dashboard</h1>
          </div>
          <button type="button" style={{ border: "none", background: "#111827", color: "#fff", borderRadius: 999, padding: "12px 18px", fontWeight: 700 }}>
            Add product
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20, marginBottom: 26 }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ background: "#fff", border: "1px solid #edf0ee", borderRadius: 22, padding: 24 }}>
              <div style={{ color: "#5b6873", fontSize: 12, letterSpacing: 0.8, textTransform: "uppercase", fontWeight: 700 }}>{stat.label}</div>
              <div style={{ marginTop: 12, fontSize: 40, fontWeight: 800, letterSpacing: -1.4 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20 }}>
          {cards.map((card) => (
            <div key={card.title} style={{ background: "#fff", border: "1px solid #edf0ee", borderRadius: 22, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ margin: 0, fontSize: 22, letterSpacing: -0.8 }}>{card.title}</h3>
                <span style={{ background: "#edf3dd", color: "#233224", borderRadius: 999, padding: "7px 10px", fontSize: 11, fontWeight: 700 }}>{card.tag}</span>
              </div>
              <p style={{ margin: 0, color: "#53606d", lineHeight: 1.7 }}>{card.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
