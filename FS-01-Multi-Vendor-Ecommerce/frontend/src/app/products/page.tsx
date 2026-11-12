import { ProductCard } from "../../components/ProductCard";

const products = [
  { title: "Summit Pro Lamp", vendor: "Luma Studio", price: 149, tag: "L", rating: 4.9 },
  { title: "Harbor Chair", vendor: "North & Pine", price: 219, tag: "C", rating: 4.8 },
  { title: "Aster Speaker", vendor: "Volt Labs", price: 189, tag: "S", rating: 4.7 },
  { title: "Arc Desk Mat", vendor: "Field & Form", price: 64, tag: "M", rating: 4.9 },
  { title: "Drift Bottle Set", vendor: "Oakrise", price: 89, tag: "B", rating: 4.8 },
  { title: "Monarch Lamp", vendor: "Cinder House", price: 176, tag: "P", rating: 4.9 },
  { title: "Quill Table", vendor: "The Grove Co.", price: 320, tag: "T", rating: 4.7 },
  { title: "Horizon Vase", vendor: "Moss & Co.", price: 58, tag: "V", rating: 4.8 },
];

export default function ProductsPage() {
  return (
    <main style={{ background: "#f5f5f2", minHeight: "100vh", padding: 32 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap" }}>
          <div>
            <p style={{ margin: 0, letterSpacing: 1.2, textTransform: "uppercase", color: "#56646c", fontWeight: 700, fontSize: 12 }}>Marketplace</p>
            <h1 style={{ margin: "10px 0 0", fontSize: 46, letterSpacing: -1.8 }}>All products</h1>
          </div>
          <button type="button" style={{ border: "none", background: "#111827", color: "#fff", borderRadius: 999, padding: "12px 18px", fontWeight: 700 }}>
            Filter & sort
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 20 }}>
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
    </main>
  );
}
