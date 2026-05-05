import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost, getMyPosts } from "../services/postServices";

function MyPostsPage() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

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

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const data = await getMyPosts();
      setPosts(data);
    } catch (error) {
      console.error("My posts error:", error);
      setMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (!confirmed) return;

    try {
      setDeletingId(postId);
      await deletePost(postId);

      setPosts((prev) => prev.filter((post) => post.id !== postId));
      setMessage("Post deleted successfully.");
    } catch (error) {
      console.error("Delete post error:", error);
      setMessage(getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="toolbar">
          <h1 className="page-title" style={{ marginBottom: 0 }}>
            My Posts
          </h1>

          <Link to="/create-post" className="btn">
            Write New Post
          </Link>
        </div>

        {message && (
          <div className="profile-card" style={{ marginBottom: "20px" }}>
            <p style={{ color: "#2563eb", fontWeight: 600 }}>{message}</p>
          </div>
        )}

        {loading ? (
          <div className="profile-card">
            <p>Loading your posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="profile-card">
            <p>You have no posts yet.</p>
          </div>
        ) : (
          <div className="list-stack">
            {posts.map((post) => (
              <div key={post.id} className="post-row">
                <div className="post-meta">
                  <span>Post ID: {post.id}</span>
                  {post.approved !== undefined && (
                    <span>{post.approved ? "Approved" : "Pending"}</span>
                  )}
                </div>

                <h3>{post.title}</h3>
                <p>{post.content}</p>

                <div className="action-row">
                  <Link to={`/posts/${post.id}`} className="btn btn-secondary">
                    View
                  </Link>

                  <Link to={`/posts/edit/${post.id}`} className="btn">
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeletePost(post.id)}
                    disabled={deletingId === post.id}
                  >
                    {deletingId === post.id ? "Deleting..." : "Delete"}
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

export default MyPostsPage;
