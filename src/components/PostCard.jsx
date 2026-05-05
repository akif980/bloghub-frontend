import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <article className="post-card">
      <div className="post-meta">
        <span>By {post.author}</span>
        <span>{post.date}</span>
        <span>{post.category}</span>
      </div>

      <h3>{post.title}</h3>

      <div className="post-tags">
        {post.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <p>{post.content.slice(0, 180)}...</p>

      <div className="post-meta">
        <span>👍 {post.likes} Likes</span>
        <span>🔁 {post.shares} Shares</span>
      </div>

      <Link to={`/posts/${post.id}`} className="btn">
        Read Full Post
      </Link>
    </article>
  );
}

export default PostCard;
