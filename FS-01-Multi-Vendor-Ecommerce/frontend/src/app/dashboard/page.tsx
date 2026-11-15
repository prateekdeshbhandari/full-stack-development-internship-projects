"use client";

import { useEffect, useState, type FormEvent } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  vendor: string;
  inventory: number;
};

type ProductForm = {
  name: string;
  description: string;
  price: string;
  category: string;
  vendor: string;
  inventory: string;
};

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000").replace(/\/+$/, "");
const emptyForm: ProductForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  vendor: "",
  inventory: "0",
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : `Request failed with status ${response.status}.`;
    throw new Error(message);
  }

  return payload as T;
}

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "The request could not be completed.";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    request<{ products: Product[] }>("/api/products", { signal: controller.signal })
      .then(({ products: loadedProducts }) => setProducts(loadedProducts))
      .catch((loadError: unknown) => {
        if (!controller.signal.aborted) setError(getErrorMessage(loadError));
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setIsSaving(true);

    try {
      const { product } = await request<{ product: Product }>("/api/products", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          inventory: Number(form.inventory),
        }),
      });
      setProducts((current) => [product, ...current]);
      setForm(emptyForm);
      setShowForm(false);
      setNotice(`${product.name} was added to your inventory.`);
    } catch (saveError) {
      setError(getErrorMessage(saveError));
    } finally {
      setIsSaving(false);
    }
  };

  const stats = [
    { label: "Products", value: products.length.toLocaleString() },
    { label: "Units in stock", value: products.reduce((total, product) => total + product.inventory, 0).toLocaleString() },
    { label: "Vendors", value: new Set(products.map((product) => product.vendor)).size.toLocaleString() },
  ];

  return (
    <main style={{ background: "#f5f5f2", minHeight: "100vh", padding: 32 }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ margin: 0, color: "#4c5a62", textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700, fontSize: 12 }}>Overview</p>
            <h1 style={{ margin: "10px 0 0", fontSize: 46, letterSpacing: -1.8 }}>Seller dashboard</h1>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowForm((visible) => !visible);
              setError("");
              setNotice("");
            }}
            style={{ border: "none", background: "#111827", color: "#fff", borderRadius: 999, padding: "12px 18px", fontWeight: 700 }}
          >
            {showForm ? "Cancel" : "Add product"}
          </button>
        </div>

        {error && <p role="alert" style={{ color: "#b42318", margin: "0 0 16px" }}>{error}</p>}
        {notice && <p role="status" style={{ color: "#226b3a", margin: "0 0 16px" }}>{notice}</p>}

        {showForm && (
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14, marginBottom: 26, padding: 24, background: "#fff", border: "1px solid #edf0ee", borderRadius: 22 }}>
            <label style={{ display: "grid", gap: 6, color: "#445159", fontSize: 13, fontWeight: 700 }}>
              Product name
              <input required maxLength={120} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} style={{ border: "1px solid #dfe5e1", borderRadius: 10, padding: "11px 12px", fontSize: 15 }} />
            </label>
            <label style={{ display: "grid", gap: 6, color: "#445159", fontSize: 13, fontWeight: 700 }}>
              Vendor
              <input required maxLength={120} value={form.vendor} onChange={(event) => setForm({ ...form, vendor: event.target.value })} style={{ border: "1px solid #dfe5e1", borderRadius: 10, padding: "11px 12px", fontSize: 15 }} />
            </label>
            <label style={{ display: "grid", gap: 6, color: "#445159", fontSize: 13, fontWeight: 700 }}>
              Category
              <input required maxLength={80} value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} style={{ border: "1px solid #dfe5e1", borderRadius: 10, padding: "11px 12px", fontSize: 15 }} />
            </label>
            <label style={{ display: "grid", gap: 6, color: "#445159", fontSize: 13, fontWeight: 700 }}>
              Price (USD)
              <input required type="number" min="0" step="0.01" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} style={{ border: "1px solid #dfe5e1", borderRadius: 10, padding: "11px 12px", fontSize: 15 }} />
            </label>
            <label style={{ display: "grid", gap: 6, color: "#445159", fontSize: 13, fontWeight: 700 }}>
              Inventory
              <input required type="number" min="0" step="1" value={form.inventory} onChange={(event) => setForm({ ...form, inventory: event.target.value })} style={{ border: "1px solid #dfe5e1", borderRadius: 10, padding: "11px 12px", fontSize: 15 }} />
            </label>
            <label style={{ display: "grid", gap: 6, color: "#445159", fontSize: 13, fontWeight: 700, gridColumn: "1 / -1" }}>
              Description
              <textarea maxLength={2000} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={3} style={{ border: "1px solid #dfe5e1", borderRadius: 10, padding: "11px 12px", fontSize: 15, resize: "vertical" }} />
            </label>
            <button disabled={isSaving} type="submit" style={{ justifySelf: "start", border: "none", background: "#1d2b2a", color: "#fff", borderRadius: 999, padding: "12px 18px", fontWeight: 700, opacity: isSaving ? 0.7 : 1 }}>
              {isSaving ? "Saving..." : "Save product"}
            </button>
          </form>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 26 }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ background: "#fff", border: "1px solid #edf0ee", borderRadius: 22, padding: 24 }}>
              <div style={{ color: "#5b6873", fontSize: 12, letterSpacing: 0.8, textTransform: "uppercase", fontWeight: 700 }}>{stat.label}</div>
              <div style={{ marginTop: 12, fontSize: 40, fontWeight: 800, letterSpacing: -1.4 }}>{isLoading ? "—" : stat.value}</div>
            </div>
          ))}
        </div>

        <section style={{ background: "#fff", border: "1px solid #edf0ee", borderRadius: 22, padding: 24 }}>
          <h2 style={{ margin: "0 0 18px", fontSize: 24, letterSpacing: -0.8 }}>Product inventory</h2>
          {isLoading ? (
            <p style={{ color: "#53606d" }}>Loading products...</p>
          ) : error && products.length === 0 ? (
            <p style={{ color: "#53606d" }}>Products could not be loaded. Check that the API is running, then refresh this page.</p>
          ) : products.length === 0 ? (
            <p style={{ color: "#53606d" }}>No products yet. Add your first product to get started.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ color: "#5b6873", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.6 }}>
                    <th scope="col" style={{ padding: "12px 10px", borderBottom: "1px solid #edf0ee" }}>Product</th>
                    <th scope="col" style={{ padding: "12px 10px", borderBottom: "1px solid #edf0ee" }}>Vendor</th>
                    <th scope="col" style={{ padding: "12px 10px", borderBottom: "1px solid #edf0ee" }}>Category</th>
                    <th scope="col" style={{ padding: "12px 10px", borderBottom: "1px solid #edf0ee" }}>Price</th>
                    <th scope="col" style={{ padding: "12px 10px", borderBottom: "1px solid #edf0ee" }}>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td style={{ padding: "14px 10px", borderBottom: "1px solid #edf0ee", fontWeight: 700 }}>{product.name}</td>
                      <td style={{ padding: "14px 10px", borderBottom: "1px solid #edf0ee" }}>{product.vendor}</td>
                      <td style={{ padding: "14px 10px", borderBottom: "1px solid #edf0ee" }}>{product.category}</td>
                      <td style={{ padding: "14px 10px", borderBottom: "1px solid #edf0ee" }}>{formatPrice(product.price)}</td>
                      <td style={{ padding: "14px 10px", borderBottom: "1px solid #edf0ee" }}>{product.inventory}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
