import { PresenceAvatars } from "../../components/presence/PresenceAvatars";
import { WorkspaceCard } from "../../components/workspace/WorkspaceCard";

const members = [
  { id: "m1", name: "Ava Thompson", role: "Product lead" },
  { id: "m2", name: "Noah Kim", role: "Designer" },
  { id: "m3", name: "Priya Shah", role: "Engineer" },
  { id: "m4", name: "Olivia Chen", role: "Research" },
];

const cards = [
  { title: "Product direction", subtitle: "A shared source of truth for roadmap planning and collaborative decisions.", meta: "live", accent: "#deedc3", icon: "✦" },
  { title: "Launch notes", subtitle: "Shared updates, blockers, and key decisions keep the team aligned.", meta: "updated", accent: "#f9e8bf", icon: "☰" },
  { title: "Sprint check-in", subtitle: "Daily progress stays visible without creating another status meeting.", meta: "focus", accent: "#dfe7ff", icon: "◌" },
];

export default function WorkspacePage() {
  return (
    <main style={{ background: "#f4f5f1", minHeight: "100vh", padding: 32 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ margin: 0, color: "#5d645f", letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 700, fontSize: 12 }}>
              Workspace
            </p>
            <h1 style={{ margin: "10px 0 0", fontSize: 42, letterSpacing: -1.6 }}>Gather / Product team</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <PresenceAvatars members={members} />
            <button style={{ border: "none", background: "#1f2520", color: "#fff", borderRadius: 999, padding: "12px 18px", fontWeight: 700 }}>
              Invite people
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20 }}>
          {cards.map((card) => (
            <WorkspaceCard key={card.title} title={card.title} subtitle={card.subtitle} meta={card.meta} accent={card.accent} icon={card.icon} />
          ))}
        </div>
      </div>
    </main>
  );
}
