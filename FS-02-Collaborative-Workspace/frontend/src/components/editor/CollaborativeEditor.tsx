"use client";

import { useState } from "react";

const starterContent = `# Q3 Product Launch Direction

- [x] Finalize stakeholder and user feedback loop
- [x] Align onboarding flow with product milestones
- [ ] Implement multi-instance session caching with Redis
- [ ] Share final release notes before Friday sprint review

> "Keep the document concise and clear so anyone on the team can pick up right where the last person left off."

### Technical Priorities
1. CRDT & Yjs conflict-free document replication
2. Real-time WebSocket synchronization across clients
3. Colored cursor presence & live user indicators`;

export function CollaborativeEditor() {
  const [content, setContent] = useState(starterContent);
  const [savedStatus, setSavedStatus] = useState("All changes saved");

  const handleChange = (newVal: string) => {
    setContent(newVal);
    setSavedStatus("Syncing live...");
    setTimeout(() => {
      setSavedStatus("All changes saved");
    }, 600);
  };

  const insertFormatting = (prefix: string, suffix: string = "") => {
    setContent((prev) => `${prev}\n${prefix} `);
  };

  return (
    <div
      style={{
        background: "#fafaf7",
        border: "1px solid #e2e5dc",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(25, 30, 20, 0.04)",
      }}
    >
      {/* Editor Header & Toolbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px 18px",
          borderBottom: "1px solid #ebeee4",
          background: "#f4f6ef",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <strong style={{ fontSize: 14, color: "#1c221a" }}>Document Editor</strong>
          <span style={{ color: "#717a6d", fontSize: 12 }}>• {savedStatus}</span>
        </div>

        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button
            type="button"
            onClick={() => insertFormatting("### ")}
            style={{ border: "1px solid #dbe2d2", background: "#fff", borderRadius: 6, padding: "4px 8px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
            title="Heading"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("- [ ] ")}
            style={{ border: "1px solid #dbe2d2", background: "#fff", borderRadius: 6, padding: "4px 8px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
            title="Task list"
          >
            ☑ Task
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("> ")}
            style={{ border: "1px solid #dbe2d2", background: "#fff", borderRadius: 6, padding: "4px 8px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
            title="Quote"
          >
            “ Quote
          </button>
          <span
            style={{
              background: "#e4f0d4",
              color: "#466013",
              padding: "4px 10px",
              borderRadius: 999,
              fontSize: 11,
              letterSpacing: 0.7,
              textTransform: "uppercase",
              fontWeight: 800,
              marginLeft: 8,
            }}
          >
            ● Live Sync
          </span>
        </div>
      </div>

      {/* Editor Area */}
      <textarea
        value={content}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Type Markdown or notes here..."
        style={{
          width: "100%",
          minHeight: 340,
          border: 0,
          resize: "vertical",
          background: "transparent",
          padding: "20px 24px",
          fontSize: 15,
          lineHeight: 1.75,
          color: "#22271f",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          outline: "none",
          boxSizing: "border-box",
        }}
      />

      {/* Footer Info */}
      <div
        style={{
          padding: "8px 20px",
          borderTop: "1px solid #f0f3eb",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: "#7e887a",
          background: "#fafaf7",
        }}
      >
        <span>Markdown enabled</span>
        <span>{content.length} characters • {content.split(/\s+/).filter(Boolean).length} words</span>
      </div>
    </div>
  );
}
