import Link from "next/link";
import { ProductCard } from "../components/ProductCard";

const products = [
  { title: "Summit Pro Lamp", vendor: "Luma Studio", price: 149, tag: "L", rating: 4.9 },
  { title: "Harbor Chair", vendor: "North & Pine", price: 219, tag: "C", rating: 4.8 },
  { title: "Aster Speaker", vendor: "Volt Labs", price: 189, tag: "S", rating: 4.7 },
  { title: "Arc Desk Mat", vendor: "Field & Form", price: 64, tag: "M", rating: 4.9 },
];

export default function HomePage() {
  return (
    <main style={{ background: "#f5f5f2", minHeight: "100vh", color: "#101826" }}>
      <header
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1 }}>MarketHub</div>
        <nav style={{ display: "flex", gap: 22, alignItems: "center", fontWeight: 600, color: "#445159" }}>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/login" style={{ background: "#111827", color: "#fff", borderRadius: 999, padding: "10px 16px" }}>
            Login
          </Link>
        </nav>
      </header>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 30,
          alignItems: "center",
          padding: "50px 28px 32px",
        }}
      >
        <div>
          <p style={{ margin: 0, letterSpacing: 1.4, textTransform: "uppercase", color: "#4c5a62", fontWeight: 700, fontSize: 12 }}>
            Curated by independent sellers
          </p>
          <h1 style={{ margin: "18px 0 14px", fontSize: "clamp(42px, 6vw, 72px)", letterSpacing: -3.5, lineHeight: 0.95 }}>
            Discover what your market is obsessed with.
          </h1>
          <p style={{ margin: 0, maxWidth: 560, color: "#53606c", fontSize: 18, lineHeight: 1.7 }}>
            Shop from trusted vendors, manage inventory, and turn product discovery into repeat sales across your marketplace.
          </p>
          <div style={{ display: "flex", gap: 18, marginTop: 28, flexWrap: "wrap" }}>
            <Link href="/products" style={{ background: "#111827", color: "#fff", borderRadius: 999, padding: "14px 22px", fontWeight: 700 }}>
              Explore products
            </Link>
            <Link href="/register" style={{ background: "#edf3dd", color: "#1d2b2a", borderRadius: 999, padding: "14px 22px", fontWeight: 700 }}>
              Become a seller
            </Link>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #f8f3df 0%, #edf3d8 100%)",
            borderRadius: 28,
            minHeight: 420,
            padding: 28,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 24px 50px rgba(17, 24, 39, 0.08)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ background: "#fff", borderRadius: 999, padding: "8px 12px", fontWeight: 700 }}>Top picks</span>
            <span style={{ background: "#dfeecf", borderRadius: 999, padding: "8px 12px", fontWeight: 700 }}>Live</span>
          </div>
          <div style={{ fontSize: 120, textAlign: "center" }}>✦</div>
          <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: 18, padding: 18 }}>
            <div style={{ fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase", color: "#4c5a62", fontWeight: 700 }}>Featured seller</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>Fjord Goods</div>
                <small style={{ color: "#5d6771" }}>Handpicked home essentials</small>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>$128</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 28px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h2 style={{ margin: 0, fontSize: 34, letterSpacing: -1.2 }}>Trending now</h2>
          <Link href="/products" style={{ color: "#1d2b2a", fontWeight: 700 }}>View all</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 20 }}>
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </section>
    </main>
  );
}
