"use client";

import { useState } from "react";

type Comment = {
  id: string;
  author: string;
  time: string;
  text: string;
};

const initialComments: Comment[] = [
  {
    id: "1",
    author: "Maya Lin",
    time: "2m ago",
    text: "I’d tighten the opening sentence and make the action list easier to scan.",
  },
  {
    id: "2",
    author: "Leo Vance",
    time: "14m ago",
    text: "Looks strong! Let's ensure the conflict resolution spec is aligned.",
  },
];

export function CommentThread() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newText, setNewText] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newComment: Comment = {
      id: String(Date.now()),
      author: "Alex Morgan (You)",
      time: "Just now",
      text: newText.trim(),
    };

    setComments((prev) => [newComment, ...prev]);
    setNewText("");
  };

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e7ebe1",
        borderRadius: 20,
        padding: 20,
        boxShadow: "0 10px 30px rgba(25, 30, 20, 0.04)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontSize: 16, color: "#1c241a" }}>Team Discussion ({comments.length})</h3>
        <span style={{ fontSize: 11, background: "#f0f3eb", color: "#546b38", padding: "3px 8px", borderRadius: 999, fontWeight: 700 }}>
          Real-time
        </span>
      </div>

      <form onSubmit={handleAddComment} style={{ display: "grid", gap: 8 }}>
        <textarea
          rows={2}
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Leave a comment or question..."
          style={{
            border: "1px solid #dce2d4",
            borderRadius: 12,
            padding: "10px 12px",
            fontSize: 14,
            outline: "none",
            resize: "none",
            fontFamily: "inherit",
          }}
        />
        <button
          type="submit"
          disabled={!newText.trim()}
          style={{
            border: "none",
            background: "#20261f",
            color: "#fff",
            borderRadius: 8,
            padding: "8px 14px",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            justifySelf: "end",
            opacity: newText.trim() ? 1 : 0.5,
          }}
        >
          Post Comment
        </button>
      </form>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 380, overflowY: "auto" }}>
        {comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              padding: "12px",
              background: "#fafbf9",
              borderRadius: 12,
              border: "1px solid #edf0ea",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                fontSize: 12,
                color: "#606b5d",
              }}
            >
              <strong style={{ color: "#1c241a" }}>{comment.author}</strong>
              <span>{comment.time}</span>
            </div>
            <p style={{ margin: 0, color: "#3f4a3c", fontSize: 13, lineHeight: 1.5 }}>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
