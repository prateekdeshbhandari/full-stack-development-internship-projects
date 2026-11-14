"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "../../components/ProductCard";

const products = [
  { title: "Summit Pro Lamp", vendor: "Luma Studio", price: 149, tag: "L", rating: 4.9, category: "Lighting" },
  { title: "Harbor Chair", vendor: "North & Pine", price: 219, tag: "C", rating: 4.8, category: "Furniture" },
  { title: "Aster Speaker", vendor: "Volt Labs", price: 189, tag: "S", rating: 4.7, category: "Electronics" },
  { title: "Arc Desk Mat", vendor: "Field & Form", price: 64, tag: "M", rating: 4.9, category: "Accessories" },
  { title: "Drift Bottle Set", vendor: "Oakrise", price: 89, tag: "B", rating: 4.8, category: "Home" },
  { title: "Monarch Lamp", vendor: "Cinder House", price: 176, tag: "P", rating: 4.9, category: "Lighting" },
  { title: "Quill Table", vendor: "The Grove Co.", price: 320, tag: "T", rating: 4.7, category: "Furniture" },
  { title: "Horizon Vase", vendor: "Moss & Co.", price: 58, tag: "V", rating: 4.8, category: "Home" },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [cartCount, setCartCount] = useState(0);
  const [cartMessage, setCartMessage] = useState("");

  const categories = [...new Set(products.map((product) => product.category))].sort();
  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.vendor.toLowerCase().includes(query);
      const matchesCategory = category === "all" || product.category === category;
      return matchesSearch && matchesCategory;
    });

    if (sort === "price-low") {
      filtered.sort((first, second) => first.price - second.price);
    } else if (sort === "price-high") {
      filtered.sort((first, second) => second.price - first.price);
    } else if (sort === "rating") {
      filtered.sort((first, second) => second.rating - first.rating);
    }

    return filtered;
  }, [category, search, sort]);

  return (
    <main style={{ background: "#f5f5f2", minHeight: "100vh", padding: 32 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap" }}>
          <div>
            <p style={{ margin: 0, letterSpacing: 1.2, textTransform: "uppercase", color: "#56646c", fontWeight: 700, fontSize: 12 }}>Marketplace</p>
            <h1 style={{ margin: "10px 0 0", fontSize: 46, letterSpacing: -1.8 }}>All products</h1>
          </div>
          <div aria-live="polite" style={{ borderRadius: 999, background: "#fff", padding: "12px 18px", fontWeight: 700, color: "#1d2b2a" }}>
            Cart: {cartCount}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(220px, 2fr) repeat(2, minmax(160px, 1fr))", gap: 12, marginBottom: 16 }}>
          <label style={{ display: "grid", gap: 6, color: "#445159", fontSize: 13, fontWeight: 700 }}>
            Search products
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or seller"
              style={{ width: "100%", boxSizing: "border-box", border: "1px solid #dfe5e1", borderRadius: 12, padding: "12px 14px", fontSize: 15 }}
            />
          </label>
          <label style={{ display: "grid", gap: 6, color: "#445159", fontSize: 13, fontWeight: 700 }}>
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              style={{ width: "100%", boxSizing: "border-box", border: "1px solid #dfe5e1", borderRadius: 12, padding: "12px 14px", fontSize: 15, background: "#fff" }}
            >
              <option value="all">All categories</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label style={{ display: "grid", gap: 6, color: "#445159", fontSize: 13, fontWeight: 700 }}>
            Sort by
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              style={{ width: "100%", boxSizing: "border-box", border: "1px solid #dfe5e1", borderRadius: 12, padding: "12px 14px", fontSize: 15, background: "#fff" }}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>

        <p aria-live="polite" style={{ minHeight: 24, margin: "0 0 16px", color: "#56646c" }}>
          {cartMessage || `${visibleProducts.length} products`}
        </p>

        {visibleProducts.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 20 }}>
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.title}
                {...product}
                onAdd={() => {
                  setCartCount((count) => count + 1);
                  setCartMessage(`${product.title} added to your cart.`);
                }}
              />
            ))}
          </div>
        ) : (
          <div style={{ border: "1px solid #edf0ee", borderRadius: 18, background: "#fff", padding: 32, color: "#53606d" }}>
            No products match those filters. Try another search or category.
          </div>
        )}
      </div>
    </main>
  );
}
