import { formatPrice } from "../lib/utils";

type ProductCardProps = {
  title: string;
  vendor: string;
  price: number;
  tag: string;
  rating: number;
};

export function ProductCard({ title, vendor, price, tag, rating }: ProductCardProps) {
  return (
    <article
      style={{
        background: "#fff",
        border: "1px solid #edf0ee",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 14px 30px rgba(17, 24, 39, 0.04)",
      }}
    >
      <div
        style={{
          height: 180,
          background: "linear-gradient(135deg, #edf3d8 0%, #dfeeff 100%)",
          display: "grid",
          placeItems: "center",
          fontSize: 40,
          fontWeight: 700,
          color: "#1d2b2a",
        }}
      >
        {tag}
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
          <span style={{ color: "#5c685f", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>
            {vendor}
          </span>
          <span style={{ color: "#a06d0a", fontWeight: 700 }}>★ {rating}</span>
        </div>
        <h3 style={{ margin: "0 0 12px", fontSize: 22, letterSpacing: -0.7 }}>{title}</h3>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong style={{ fontSize: 26, letterSpacing: -0.8 }}>{formatPrice(price)}</strong>
          <button
            type="button"
            style={{
              border: "none",
              background: "#1d2b2a",
              color: "#fff",
              borderRadius: 999,
              padding: "10px 16px",
              fontWeight: 700,
            }}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
