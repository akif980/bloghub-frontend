import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
} from "../services/commentService";
import { getMyProfile } from "../services/authService";

function CommentsSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const getErrorMessage = (error) => {
    const detail = error?.response?.data?.detail;

    if (Array.isArray(detail)) {
      return detail.map((item) => item.msg).join(", ");
    }

    if (typeof detail === "string") {
      return detail;
    }

    if (typeof error?.response?.data?.message === "string") {
      return error.response.data.message;
    }

    return "Something went wrong.";
  };

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await getCommentsByPost(postId);
      setComments(data);
    } catch (error) {
      console.error("Load comments error:", error);
      setMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentUser = async () => {
    try {
      const user = await getMyProfile();
      setCurrentUser(user);
    } catch (error) {
      console.error("Current user load error:", error);
    }
  };

  useEffect(() => {
    loadComments();
    loadCurrentUser();
  }, [postId]);

  const handleCreateComment = async (text, resetForm) => {
    if (!text.trim()) {
      setMessage("Comment text is required.");
      return;
    }

    try {
      setCreateLoading(true);
      setMessage("");

      const payload = {
        text,
        post_id: Number(postId),
      };

      const newComment = await createComment(payload);
      setComments((prev) => [newComment, ...prev]);
      resetForm();
      setMessage("Comment posted successfully.");
    } catch (error) {
      console.error("Create comment error:", error);
      setMessage(getErrorMessage(error));
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdateComment = async (commentId, text) => {
    if (!text.trim()) {
      setMessage("Comment text is required.");
      return;
    }

    try {
      setActionLoadingId(commentId);
      setMessage("");

      const existing = comments.find((c) => c.id === commentId);
      const payload = {
        text,
        post_id: existing?.post_id || Number(postId),
      };

      await updateComment(commentId, payload);

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? { ...comment, text } : comment,
        ),
      );

      setMessage("Comment updated successfully.");
    } catch (error) {
      console.error("Update comment error:", error);
      setMessage(getErrorMessage(error));
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?",
    );
    if (!confirmed) return;

    try {
      setActionLoadingId(commentId);
      setMessage("");

      await deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      setMessage("Comment deleted successfully.");
    } catch (error) {
      console.error("Delete comment error:", error);
      setMessage(getErrorMessage(error));
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <section className="comments-section">
      <h2 className="section-title">Comments</h2>

      {message && (
        <div className="profile-card" style={{ marginBottom: "18px" }}>
          <p style={{ color: "#2563eb", fontWeight: 600 }}>{message}</p>
        </div>
      )}

      <CommentForm onSubmit={handleCreateComment} loading={createLoading} />

      {loading ? (
        <p className="empty-text">Loading comments...</p>
      ) : comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            onUpdate={handleUpdateComment}
            onDelete={handleDeleteComment}
            actionLoadingId={actionLoadingId}
          />
        ))
      ) : (
        <p className="empty-text">No comments yet. Be the first to comment.</p>
      )}
    </section>
  );
}

export default CommentsSection;
