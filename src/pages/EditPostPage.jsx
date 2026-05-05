import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMyPosts, updatePost } from "../services/postServices";

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

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

  useEffect(() => {
    const fetchMyPost = async () => {
      try {
        setLoading(true);
        const data = await getMyPosts();
        const post = data.find((item) => item.id === Number(id));

        if (!post) {
          setMessage("Post not found or you are not allowed to edit it.");
          return;
        }

        setFormData({
          title: post.title || "",
          content: post.content || "",
        });
      } catch (error) {
        console.error("Edit page load error:", error);
        setMessage(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchMyPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.title || !formData.content) {
      setMessage("Please fill in title and content.");
      return;
    }

    try {
      setUpdating(true);

      const payload = {
        title: formData.title,
        content: formData.content,
      };

      await updatePost(id, payload);
      setMessage("Post updated successfully.");

      setTimeout(() => {
        navigate("/my-posts");
      }, 1000);
    } catch (error) {
      console.error("Update post error:", error);
      setMessage(getErrorMessage(error));
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <div className="profile-card">
            <p>Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Edit Post</h1>

        <form className="form-box" onSubmit={handleUpdatePost}>
          <div className="form-group">
            <label>Post Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
            />
          </div>

          <div className="form-group">
            <label>Post Content</label>
            <textarea
              name="content"
              rows="8"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your content"
            />
          </div>

          {message && (
            <p
              style={{
                marginBottom: "14px",
                color: "#2563eb",
                fontWeight: 600,
              }}
            >
              {message}
            </p>
          )}

          <div className="action-row">
            <button type="submit" className="btn" disabled={updating}>
              {updating ? "Updating..." : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPostPage;
