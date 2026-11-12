"use client";

import { useState } from "react";

const starterContent = `# Launch plan

- Finalize stakeholder feedback loop
- Align onboarding flow with product goals
- Share final notes before Friday review

> Keep the document concise and clear so everyone can pick up where the last person left off.`;

export function CollaborativeEditor() {
  const [content, setContent] = useState(starterContent);

  return (
    <div
      style={{
        background: "#fafaf7",
        border: "1px solid #e7e9e1",
        borderRadius: 18,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: "1px solid #ecefe7",
          background: "#f3f6ef",
          alignItems: "center",
        }}
      >
        <div>
          <strong style={{ fontSize: 14 }}>Launch brief</strong>
        </div>
        <span
          style={{
            background: "#e4f0d4",
            color: "#466013",
            padding: "6px 10px",
            borderRadius: 999,
            fontSize: 11,
            letterSpacing: 0.7,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Live
        </span>
      </div>

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        style={{
          width: "100%",
          minHeight: 260,
          border: 0,
          resize: "vertical",
          background: "transparent",
          padding: 18,
          fontSize: 15,
          lineHeight: 1.7,
          color: "#232821",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          outline: "none",
        }}
      />
    </div>
  );
}
