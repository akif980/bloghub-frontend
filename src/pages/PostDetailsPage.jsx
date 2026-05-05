import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/postServices";
import SocialActions from "../components/SocialActions";
import CommentsSection from "../components/CommentsSection";

function PostDetailsPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
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

    return "Failed to load post.";
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Post details error:", error);
        setMessage(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <div className="details-card">
            <p>Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (message) {
    return (
      <div className="page">
        <div className="container">
          <div className="details-card">
            <h1 className="page-title">Post Details</h1>
            <p style={{ color: "crimson", fontWeight: 600 }}>{message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="details-card">
          <div className="post-meta">
            {post?.id && <span>Post ID: {post.id}</span>}
            {post?.owner_id && <span>Owner ID: {post.owner_id}</span>}
            {post?.approved !== undefined && (
              <span>{post.approved ? "Approved" : "Pending"}</span>
            )}
          </div>

          <h1 className="page-title">{post?.title}</h1>

          <p style={{ marginTop: "10px", color: "#374151", lineHeight: "1.8" }}>
            {post?.content}
          </p>

          <SocialActions postId={id} />

          <CommentsSection postId={id} />
        </div>
      </div>
    </div>
  );
}

export default PostDetailsPage;
