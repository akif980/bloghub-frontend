import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p className="empty-text" style={{ marginBottom: "18px" }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="btn">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
