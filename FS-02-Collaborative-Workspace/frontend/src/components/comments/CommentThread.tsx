export function CommentThread() {
  const comments = [
    {
      id: "1",
      author: "Maya",
      time: "2m ago",
      text: "I’d tighten the opening sentence and make the action list easier to scan.",
    },
    {
      id: "2",
      author: "Leo",
      time: "14m ago",
      text: "Looks strong. We should add the QA checklist before sharing the draft.",
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #edf0ea",
        borderRadius: 18,
        padding: 18,
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: 18 }}>Comments</h3>
      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{
            padding: "12px 0",
            borderTop: "1px solid #eef0eb",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              color: "#5d645f",
              fontSize: 13,
            }}
          >
            <strong style={{ color: "#1d231d" }}>{comment.author}</strong>
            <span>{comment.time}</span>
          </div>
          <p style={{ margin: 0, color: "#536052", lineHeight: 1.6 }}>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}
