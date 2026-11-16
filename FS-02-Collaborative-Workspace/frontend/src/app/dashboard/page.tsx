"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import { PresenceAvatars } from "../../components/presence/PresenceAvatars";
import { WorkspaceCard } from "../../components/workspace/WorkspaceCard";

const members = [
  { id: "m1", name: "Ava", role: "Product lead" },
  { id: "m2", name: "Noah", role: "Design" },
  { id: "m3", name: "Priya", role: "Engineering" },
  { id: "m4", name: "Lena", role: "Marketing" },
];

const workspaceCards = [
  { title: "Launch roadmap", subtitle: "Three milestones are lined up for the next sprint and all tasks are moving together.", meta: "active", accent: "#e9f6d6", icon: "🗺️" },
  { title: "Research notes", subtitle: "Customer calls and insights are organized into the latest product opportunities.", meta: "updated", accent: "#fdeec7", icon: "✦" },
  { title: "Decision log", subtitle: "Recent product decisions and trade-offs are captured in one reviewable place.", meta: "in review", accent: "#dfe6ff", icon: "✓" },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, authError, logout } = useAuth();

  return (
    <main style={{ background: "#f5f6f2", minHeight: "100vh", padding: 32 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, gap: 16, flexWrap: "wrap" }}>
          <div>
            <p style={{ margin: 0, color: "#5d645f", letterSpacing: 1.2, fontSize: 12, textTransform: "uppercase", fontWeight: 700 }}>
              Overview
            </p>
            <h1 style={{ margin: "10px 0 0", fontSize: 42, letterSpacing: -1.6 }}>Team dashboard</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: "#5d645f", fontSize: 13 }}>
              {isLoading ? "Loading account..." : user ? `Hi, ${user.name}` : <Link href="/login">Sign in</Link>}
            </span>
            <PresenceAvatars members={members} />
            {user ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.replace("/login");
                }}
                style={{ border: "none", background: "#212820", color: "#fff", borderRadius: 999, padding: "12px 18px", fontWeight: 700 }}
              >
                Sign out
              </button>
            ) : (
              <button type="button" style={{ border: "none", background: "#212820", color: "#fff", borderRadius: 999, padding: "12px 18px", fontWeight: 700 }}>
                New workspace
              </button>
            )}
          </div>
        </div>

        {authError && (
          <p role="alert" style={{ background: "#fff3f1", borderRadius: 12, color: "#a33227", margin: "0 0 20px", padding: 14 }}>
            Your session could not be verified. Please sign in again.
          </p>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20, marginBottom: 28 }}>
          {[
            { label: "Open tasks", value: "24" },
            { label: "Active docs", value: "12" },
            { label: "Shared notes", value: "89" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#fff", border: "1px solid #eaece4", borderRadius: 20, padding: 20 }}>
              <div style={{ color: "#5c635d", fontSize: 12, letterSpacing: 0.7, textTransform: "uppercase" }}>{stat.label}</div>
              <div style={{ marginTop: 10, fontSize: 38, fontWeight: 800, letterSpacing: -1.5 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20 }}>
          {workspaceCards.map((card) => (
            <WorkspaceCard key={card.title} title={card.title} subtitle={card.subtitle} meta={card.meta} accent={card.accent} icon={card.icon} />
          ))}
        </div>
      </div>
    </main>
  );
}
