import { useState } from "react";

function CommentItem({
  comment,
  currentUser,
  onUpdate,
  onDelete,
  actionLoadingId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const isOwner = currentUser && currentUser.id === comment.owner_id;
  const isAdmin = currentUser && currentUser.role === "admin";
  const canDelete = isOwner || isAdmin;
  const canEdit = isOwner;

  const handleUpdate = async () => {
    await onUpdate(comment.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="comment-author">
          {comment.owner?.username || `User ${comment.owner_id ?? ""}`}
        </span>
        <span className="comment-time">Comment ID: {comment.id}</span>
      </div>

      {isEditing ? (
        <>
          <textarea
            style={{
              width: "100%",
              minHeight: "90px",
              border: "1px solid #d1d5db",
              borderRadius: "12px",
              padding: "12px 14px",
              resize: "vertical",
              outline: "none",
              marginBottom: "12px",
            }}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <div className="action-row">
            <button
              className="btn"
              onClick={handleUpdate}
              disabled={actionLoadingId === comment.id}
            >
              {actionLoadingId === comment.id ? "Updating..." : "Update"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setIsEditing(false);
                setEditText(comment.text);
              }}
              type="button"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="comment-text">{comment.text}</p>

          {(canEdit || canDelete) && (
            <div className="action-row" style={{ marginTop: "12px" }}>
              {canEdit && (
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}

              {canDelete && (
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => onDelete(comment.id)}
                  disabled={actionLoadingId === comment.id}
                >
                  {actionLoadingId === comment.id ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CommentItem;
