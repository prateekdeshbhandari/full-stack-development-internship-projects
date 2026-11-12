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
  return (
    <main style={{ padding: 32, background: "#f6f6f1", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 24, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase", color: "#5c635d", fontWeight: 700 }}>
              Product / Launch brief
            </div>
            <h1 style={{ margin: "10px 0 0", fontSize: 38, letterSpacing: -1.4 }}>Q3 launch direction</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <PresenceAvatars members={members} />
            <button style={{ border: "none", background: "#20261f", color: "#fff", borderRadius: 999, padding: "11px 18px", fontWeight: 700 }}>
              Share
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.8fr", gap: 24 }}>
          <CollaborativeEditor />
          <CommentThread />
        </div>
      </div>
    </main>
  );
}

