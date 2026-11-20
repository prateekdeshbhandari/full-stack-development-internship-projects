"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "../../components/ProductCard";

type ProductItem = {
  id?: string;
  title: string;
  vendor: string;
  price: number;
  tag: string;
  rating: number;
  category: string;
};

const initialProducts: ProductItem[] = [
  { id: "everyday-tote", title: "Everyday Canvas Tote", vendor: "Northstar Goods", price: 24.99, tag: "T", rating: 4.8, category: "Accessories" },
  { id: "ceramic-mug", title: "Hand-thrown Ceramic Mug", vendor: "Clay & Kiln", price: 18.5, tag: "M", rating: 4.9, category: "Home" },
  { id: "desk-notebook", title: "Recycled Paper Notebook", vendor: "Paper Trail Studio", price: 12.0, tag: "N", rating: 4.7, category: "Stationery" },
  { id: "summit-lamp", title: "Summit Pro Lamp", vendor: "Luma Studio", price: 149.0, tag: "L", rating: 4.9, category: "Lighting" },
  { id: "harbor-chair", title: "Harbor Chair", vendor: "North & Pine", price: 219.0, tag: "C", rating: 4.8, category: "Furniture" },
  { id: "aster-speaker", title: "Aster Speaker", vendor: "Volt Labs", price: 189.0, tag: "S", rating: 4.7, category: "Electronics" },
];

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000").replace(/\/+$/, "");

export default function ProductsPage() {
  const [productList, setProductList] = useState<ProductItem[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState<{ product: ProductItem; quantity: number }[]>([]);
  const [cartMessage, setCartMessage] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/products`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.products) && data.products.length > 0) {
          const mapped: ProductItem[] = data.products.map((p: any) => ({
            id: p.id,
            title: p.name || p.title,
            vendor: p.vendor || "Verified Seller",
            price: Number(p.price) || 0,
            tag: (p.name || p.title || "P").charAt(0).toUpperCase(),
            rating: 4.8,
            category: p.category || "General",
          }));
          setProductList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const categories = useMemo(() => {
    return [...new Set(productList.map((product) => product.category))].sort();
  }, [productList]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = productList.filter((product) => {
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
  }, [productList, category, search, sort]);

  const handleAddToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartMessage(`Added "${product.title}" to cart!`);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    setCartMessage("Placing your order...");

    try {
      const items = cart.map((item) => ({
        productId: item.product.id || "everyday-tote",
        quantity: item.quantity,
      }));

      const res = await fetch(`${apiBaseUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Checkout failed");
      }

      setCart([]);
      setCartMessage(`Order placed successfully! Order ID: ${data.order?.id?.slice(0, 8) || "placed"}`);
    } catch (err: unknown) {
      setCartMessage(err instanceof Error ? err.message : "Could not complete order.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main style={{ background: "#f5f5f2", minHeight: "100vh", padding: 32 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Link href="/" style={{ color: "#111827", textDecoration: "none", fontWeight: 800 }}>← MarketHub</Link>
              <span style={{ letterSpacing: 1.2, textTransform: "uppercase", color: "#56646c", fontWeight: 700, fontSize: 12 }}>Marketplace</span>
            </div>
            <h1 style={{ margin: "10px 0 0", fontSize: 46, letterSpacing: -1.8 }}>All products</h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div aria-live="polite" style={{ borderRadius: 999, background: "#fff", padding: "12px 18px", fontWeight: 700, color: "#1d2b2a", border: "1px solid #e2e5e1" }}>
              Cart: {totalCartCount} items
            </div>
            {totalCartCount > 0 && (
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isCheckingOut}
                style={{
                  border: "none",
                  background: "#111827",
                  color: "#fff",
                  borderRadius: 999,
                  padding: "12px 20px",
                  fontWeight: 700,
                  cursor: "pointer",
                  opacity: isCheckingOut ? 0.7 : 1,
                }}
              >
                {isCheckingOut ? "Processing..." : "Checkout Now"}
              </button>
            )}
          </div>
        </header>

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

        <p aria-live="polite" style={{ minHeight: 24, margin: "0 0 16px", color: cartMessage.includes("success") ? "#2e7d32" : "#56646c", fontWeight: cartMessage ? 600 : 400 }}>
          {cartMessage || `${visibleProducts.length} products`}
        </p>

        {visibleProducts.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 20 }}>
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id || product.title}
                {...product}
                onAdd={() => handleAddToCart(product)}
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
