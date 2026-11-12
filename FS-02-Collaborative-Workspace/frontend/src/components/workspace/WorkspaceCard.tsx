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
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #edf0ea",
        borderRadius: 20,
        padding: 22,
        boxShadow: "0 18px 40px rgba(23, 32, 17, 0.04)",
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
      <h3 style={{ margin: "0 0 8px", fontSize: 22, letterSpacing: -0.8 }}>{title}</h3>
      <p style={{ margin: 0, color: "#586259", lineHeight: 1.6 }}>{subtitle}</p>
    </div>
  );
}
