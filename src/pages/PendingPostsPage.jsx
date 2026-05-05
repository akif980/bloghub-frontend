import { useEffect, useState } from "react";
import { getAllPosts, approvePost, rejectPost } from "../services/postServices";

function PendingPostsPage() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
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

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllPosts();

      const pendingPosts = data.filter((post) => post.approved === false);
      setPosts(pendingPosts);
    } catch (error) {
      console.error("Pending posts error:", error);
      setMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleApprove = async (postId) => {
    try {
      setActionLoadingId(postId);
      await approvePost(postId);

      setPosts((prev) => prev.filter((post) => post.id !== postId));
      setMessage("Post approved successfully.");
    } catch (error) {
      console.error("Approve error:", error);
      setMessage(getErrorMessage(error));
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (postId) => {
    try {
      setActionLoadingId(postId);
      await rejectPost(postId);

      setPosts((prev) => prev.filter((post) => prev.id !== postId));
      
      setMessage("Post rejected successfully.");
    } catch (error) {
      console.error("Reject error:", error);
      setMessage(getErrorMessage(error));
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Pending Moderation</h1>

        {message && (
          <div className="profile-card" style={{ marginBottom: "20px" }}>
            <p style={{ color: "#2563eb", fontWeight: 600 }}>{message}</p>
          </div>
        )}

        {loading ? (
          <div className="profile-card">
            <p>Loading pending posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="profile-card">
            <p>No pending posts found.</p>
          </div>
        ) : (
          <div className="list-stack">
            {posts.map((post) => (
              <div key={post.id} className="post-row">
                <div className="post-meta">
                  <span>Post ID: {post.id}</span>
                  <span>Pending Review</span>
                </div>

                <h3>{post.title}</h3>
                <p>{post.content}</p>

                <div className="action-row">
                  <button
                    className="btn"
                    onClick={() => handleApprove(post.id)}
                    disabled={actionLoadingId === post.id}
                  >
                    {actionLoadingId === post.id ? "Processing..." : "Approve"}
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleReject(post.id)}
                    disabled={actionLoadingId === post.id}
                  >
                    {actionLoadingId === post.id ? "Processing..." : "Reject"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PendingPostsPage;
