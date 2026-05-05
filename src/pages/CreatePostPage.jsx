// function CreatePostPage() {
//   return (
//     <div className="page">
//       <div className="container">
//         <h1 className="page-title">Create Post</h1>
// 
//         <div className="form-box">
//           <div className="form-group">
//             <label>Title</label>
//             <input type="text" placeholder="Enter post title" />
//           </div>
// 
//           <div className="form-group">
//             <label>Content</label>
//             <textarea rows="6" placeholder="Write your post content"></textarea>
//           </div>
// 
//           <button className="btn">Publish</button>
//         </div>
//       </div>
//     </div>
//   );
// }
// 
// export default CreatePostPage;

import { useState } from "react";
import { createPost } from "../services/postServices";

function CreatePostPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

    return "Failed to create post.";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.title || !formData.content) {
      setMessage("Please fill in title and content.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: formData.title,
        content: formData.content,
      };

      const data = await createPost(payload);
      console.log("Create post success:", data);

      setMessage("Post created successfully.");
      setFormData({
        title: "",
        content: "",
      });
    } catch (error) {
      console.error("Create post error:", error);
      setMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Write a New Post</h1>

        <form className="form-box" onSubmit={handleCreatePost}>
          <div className="form-group">
            <label>Post Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter your post title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Post Content</label>
            <textarea
              name="content"
              rows="8"
              placeholder="Write your thoughts, story, or article here..."
              value={formData.content}
              onChange={handleChange}
            />
          </div>

          {message && (
            <p style={{ marginBottom: "14px", color: "#2563eb", fontWeight: 600 }}>
              {message}
            </p>
          )}

          <div className="action-row">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPage;