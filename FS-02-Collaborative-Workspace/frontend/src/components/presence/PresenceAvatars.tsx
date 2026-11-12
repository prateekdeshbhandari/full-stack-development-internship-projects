import { getInitials } from "../../lib/formatters";

export type PresenceMember = {
  id: string;
  name: string;
  role: string;
  status?: "online" | "idle" | "reviewing";
};

export function PresenceAvatars({ members }: { members: PresenceMember[] }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {members.slice(0, 4).map((member, index) => (
        <div
          key={member.id}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: index % 2 === 0 ? "#d8e1ff" : "#d8f5d1",
            border: "2px solid #fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 700,
            color: "#1f2a37",
            marginLeft: index === 0 ? 0 : -8,
          }}
          title={`${member.name} • ${member.role}`}
          aria-label={`${member.name} ${member.role}`}
        >
          {getInitials(member.name)}
        </div>
      ))}
    </div>
  );
}

