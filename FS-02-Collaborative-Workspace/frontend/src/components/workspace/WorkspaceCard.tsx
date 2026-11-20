import Link from "next/link";
import type { ReactNode } from "react";

export function WorkspaceCard({
  title,
  subtitle,
  meta,
  accent,
  icon,
}: {
  title: string;
  subtitle: string;
  meta: string;
  accent: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href="/document"
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        background: "#ffffff",
        border: "1px solid #edf0ea",
        borderRadius: 20,
        padding: 22,
        boxShadow: "0 18px 40px rgba(23, 32, 17, 0.04)",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: accent,
            fontSize: 18,
          }}
        >
          {icon}
        </div>
        <span
          style={{
            color: "#566457",
            background: "#f4f7ef",
            borderRadius: 999,
            padding: "7px 10px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.6,
            textTransform: "uppercase",
          }}
        >
          {meta}
        </span>
      </div>
      <h3 style={{ margin: "0 0 8px", fontSize: 20, letterSpacing: -0.6, color: "#1c241a" }}>{title}</h3>
      <p style={{ margin: 0, color: "#586259", lineHeight: 1.6, fontSize: 14 }}>{subtitle}</p>
      <div style={{ marginTop: 14, fontSize: 13, color: "#4f6e24", fontWeight: 700 }}>
        Open in Editor →
      </div>
    </Link>
  );
}
