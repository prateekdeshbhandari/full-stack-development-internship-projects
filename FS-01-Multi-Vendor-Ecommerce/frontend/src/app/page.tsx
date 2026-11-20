import Link from "next/link";
import { ProductCard } from "../components/ProductCard";

const products = [
  { title: "Summit Pro Lamp", vendor: "Luma Studio", price: 149, tag: "L", rating: 4.9 },
  { title: "Harbor Chair", vendor: "North & Pine", price: 219, tag: "C", rating: 4.8 },
  { title: "Aster Speaker", vendor: "Volt Labs", price: 189, tag: "S", rating: 4.7 },
  { title: "Arc Desk Mat", vendor: "Field & Form", price: 64, tag: "M", rating: 4.9 },
];

const categories = [
  { name: "Home & Living", description: "Thoughtful pieces for every room", tag: "H" },
  { name: "Workspace", description: "Make room for good ideas", tag: "W" },
  { name: "Tech & Audio", description: "Everyday tech, carefully chosen", tag: "T" },
];

export default function HomePage() {
  return (
    <main style={{ background: "#f5f5f2", minHeight: "100vh", color: "#101826", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <header
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "20px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -1, color: "#111827" }}>
          🛍️ MarketHub
        </div>
        <nav style={{ display: "flex", gap: 20, alignItems: "center", fontWeight: 600, color: "#445159", fontSize: 15 }}>
          <Link href="/" style={{ color: "#111827", textDecoration: "none" }}>Home</Link>
          <Link href="/products" style={{ color: "#445159", textDecoration: "none" }}>Products</Link>
          <Link href="/dashboard" style={{ color: "#445159", textDecoration: "none" }}>Vendor Dashboard</Link>
          <Link href="/login" style={{ background: "#111827", color: "#fff", borderRadius: 999, padding: "8px 18px", textDecoration: "none" }}>
            Sign In
          </Link>
        </nav>
      </header>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 36,
          alignItems: "center",
          padding: "40px 28px 32px",
        }}
      >
        <div>
          <p style={{ margin: 0, letterSpacing: 1.4, textTransform: "uppercase", color: "#4c5a62", fontWeight: 700, fontSize: 12 }}>
            Curated by independent sellers
          </p>
          <h1 style={{ margin: "18px 0 14px", fontSize: "clamp(38px, 5.5vw, 68px)", letterSpacing: -2.5, lineHeight: 1.05, color: "#111827" }}>
            Discover what your market is obsessed with.
          </h1>
          <p style={{ margin: 0, maxWidth: 560, color: "#53606c", fontSize: 17, lineHeight: 1.7 }}>
            Shop from trusted vendors, manage inventory, and turn product discovery into repeat sales across your marketplace.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 28, flexWrap: "wrap" }}>
            <Link href="/products" style={{ background: "#111827", color: "#fff", borderRadius: 999, padding: "14px 24px", fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 14px rgba(17,24,39,0.15)" }}>
              Explore Products →
            </Link>
            <Link href="/dashboard" style={{ background: "#edf3dd", color: "#1d2b2a", borderRadius: 999, padding: "14px 24px", fontWeight: 700, textDecoration: "none" }}>
              Seller Dashboard
            </Link>
          </div>
          <div style={{ display: "flex", gap: 28, marginTop: 36, flexWrap: "wrap" }}>
            <div>
              <strong style={{ display: "block", fontSize: 24, color: "#111827" }}>3,200+</strong>
              <span style={{ color: "#53606c", fontSize: 14 }}>independent vendors</span>
            </div>
            <div>
              <strong style={{ display: "block", fontSize: 24, color: "#111827" }}>Instant</strong>
              <span style={{ color: "#53606c", fontSize: 14 }}>cart checkout & orders</span>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #f8f3df 0%, #edf3d8 100%)",
            borderRadius: 28,
            minHeight: 400,
            padding: 30,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 24px 50px rgba(17, 24, 39, 0.08)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ background: "#fff", borderRadius: 999, padding: "8px 14px", fontWeight: 700, fontSize: 13 }}>Featured Sellers</span>
            <span style={{ background: "#dfeecf", color: "#2d4411", borderRadius: 999, padding: "8px 14px", fontWeight: 700, fontSize: 13 }}>Live Store</span>
          </div>
          <div style={{ fontSize: 96, textAlign: "center", margin: "20px 0" }}>🛍️</div>
          <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", borderRadius: 18, padding: 20 }}>
            <div style={{ fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase", color: "#4c5a62", fontWeight: 700 }}>Marketplace Spotlight</div>
            <h3 style={{ margin: "6px 0", fontSize: 20 }}>Handcrafted & Designer Goods</h3>
            <p style={{ margin: 0, color: "#53606c", fontSize: 14 }}>Multi-vendor payouts, real-time inventory management, and instant order tracking.</p>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 28px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 28, letterSpacing: -1 }}>Trending Products</h2>
            <p style={{ margin: "4px 0 0", color: "#56646c", fontSize: 15 }}>Curated picks from our top independent sellers</p>
          </div>
          <Link href="/products" style={{ color: "#111827", fontWeight: 700, fontSize: 14 }}>View All Products →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {products.map((p) => (
            <ProductCard key={p.title} {...p} />
          ))}
        </div>
      </section>
    </main>
  );
}
