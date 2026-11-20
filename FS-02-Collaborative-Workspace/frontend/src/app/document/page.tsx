"use client";

import Link from "next/link";
import { useState } from "react";
import { CollaborativeEditor } from "../../components/editor/CollaborativeEditor";
import { CommentThread } from "../../components/comments/CommentThread";
import { PresenceAvatars } from "../../components/presence/PresenceAvatars";

const members = [
  { id: "m1", name: "Ava Thompson", role: "Product lead" },
  { id: "m2", name: "Noah Kim", role: "Designer" },
  { id: "m3", name: "Priya Shah", role: "Engineer" },
  { id: "m4", name: "Olivia Chen", role: "Research" },
];

export default function DocumentPage() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main style={{ padding: "24px 32px", background: "#f6f6f1", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        {/* Navigation Bar */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, paddingBottom: 16, borderBottom: "1px solid #e5e8de" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Link href="/dashboard" style={{ fontSize: 20, fontWeight: 800, color: "#1c241a", textDecoration: "none", letterSpacing: -0.5 }}>
              ⚡ CollabSpace
            </Link>
            <span style={{ color: "#d2d8c7" }}>/</span>
            <Link href="/workspace" style={{ fontSize: 14, color: "#5c635d", textDecoration: "none", fontWeight: 600 }}>Workspaces</Link>
            <span style={{ color: "#d2d8c7" }}>/</span>
            <span style={{ fontSize: 14, color: "#1c241a", fontWeight: 700 }}>Launch Brief</span>
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <Link href="/dashboard" style={{ color: "#4f574d", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Dashboard</Link>
            <Link href="/login" style={{ background: "#e8ede0", color: "#222c1e", borderRadius: 999, padding: "8px 16px", textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
              Account
            </Link>
          </div>
        </header>

        {/* Document Header */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 24, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase", color: "#546b38", fontWeight: 700, background: "#e8f2d5", padding: "4px 8px", borderRadius: 6 }}>
                Live Workspace
              </span>
              <span style={{ fontSize: 13, color: "#747c72" }}>Last synced moments ago</span>
            </div>
            <h1 style={{ margin: "10px 0 0", fontSize: 36, letterSpacing: -1.4, color: "#1a2119" }}>Q3 Product Direction & Roadmap</h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: "#616b5d", fontWeight: 600 }}>Active Now:</span>
              <PresenceAvatars members={members} />
            </div>
            <button
              type="button"
              onClick={handleShare}
              style={{
                border: "none",
                background: "#20261f",
                color: "#fff",
                borderRadius: 999,
                padding: "10px 18px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {copied ? "Link Copied!" : "Share Document"}
            </button>
          </div>
        </div>

        {/* Content & Comments Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.55fr 0.85fr", gap: 24 }}>
          <CollaborativeEditor />
          <CommentThread />
        </div>
      </div>
    </main>
  );
}
