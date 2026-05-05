import { useState } from "react";

function CommentForm({
  onSubmit,
  loading,
  initialValue = "",
  submitText = "Post Comment",
}) {
  const [text, setText] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text, () => setText(""));
  };

  return (
    <form className="comment-box" onSubmit={handleSubmit}>
      <h3
        className="section-title"
        style={{ fontSize: "20px", marginBottom: "12px" }}
      >
        Leave a Comment
      </h3>

      <textarea
        placeholder="Write your comment here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="action-row">
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Processing..." : submitText}
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
