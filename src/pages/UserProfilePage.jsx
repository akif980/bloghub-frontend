import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserProfileById } from "../services/authService";

function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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

    return "Failed to load user profile.";
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setMessage("");
        const data = await getUserProfileById(id);
        setUser(data);
      } catch (error) {
        console.error("User profile error:", error);
        setMessage(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <div className="profile-card">
            <p>Loading user profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (message) {
    return (
      <div className="page">
        <div className="container">
          <div className="profile-card">
            <h1 className="page-title">User profile</h1>
            <p style={{ color: "crimson", fontWeight: 600 }}>{message}</p>
            <Link to="/users" className="btn">
              Back to Users
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page">
        <div className="container">
          <div className="profile-card">
            <h1 className="page-title">User not found</h1>
            <p className="empty-text">No user found for this profile page.</p>
            <Link to="/users" className="btn">
              Back to Users
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="profile-card profile-spotlight">
          <div className="profile-avatar">
            {(user.username || user.email || "U").charAt(0).toUpperCase()}
          </div>

          <div className="profile-info-block">
            <div className="post-meta">
              <span>User ID: {user.id}</span>
              <span className="badge badge-approved">{user.role}</span>
            </div>

            <h1 className="page-title" style={{ marginBottom: "10px" }}>
              {user.username || "Unnamed User"}
            </h1>

            <p className="empty-text" style={{ marginBottom: "22px" }}>
              Admin profile view for BlogHub user account details.
            </p>

            <div className="profile-details-grid">
              <div className="profile-detail-item">
                <span>Username</span>
                <strong>{user.username || "Not available"}</strong>
              </div>

              <div className="profile-detail-item">
                <span>Email</span>
                <strong>{user.email || "Not available"}</strong>
              </div>

              <div className="profile-detail-item">
                <span>Role</span>
                <strong>{user.role || "Not available"}</strong>
              </div>

              <div className="profile-detail-item">
                <span>User ID</span>
                <strong>{user.id}</strong>
              </div>
            </div>

            <div className="profile-actions">
              <Link to="/users" className="btn secondary-btn">
                Back to Users
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
