import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../services/postServices";

function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

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

    return "Failed to load posts.";
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("All posts error:", error);
        setMessage(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="toolbar">
          <h1 className="page-title" style={{ marginBottom: 0 }}>
            All Posts
          </h1>

          <Link to="/create-post" className="btn">
            Write New Post
          </Link>
        </div>

        {loading ? (
          <div className="profile-card">
            <p>Loading posts...</p>
          </div>
        ) : message ? (
          <div className="profile-card">
            <p style={{ color: "crimson", fontWeight: 600 }}>{message}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="profile-card">
            <p>No posts found.</p>
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllPostsPage;
