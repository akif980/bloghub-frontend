import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyProfile } from "../services/authService";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

    return "Failed to load profile.";
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setMessage("");

        const data = await getMyProfile();
        setUser(data);
      } catch (error) {
        console.error("Profile error:", error);
        setMessage(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bloghub_token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="profile-modern-page">
        <div className="profile-shell">
          <div className="profile-loader-card">
            <div className="profile-loading-avatar"></div>
            <div>
              <h3>Loading profile...</h3>
              <p>Please wait while we prepare your BlogHub profile.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-modern-page">
      <div className="profile-orb profile-orb-one"></div>
      <div className="profile-orb profile-orb-two"></div>

      <div className="profile-shell">
        {message ? (
          <div className="profile-alert">{message}</div>
        ) : (
          <>
            <section className="profile-hero-card">
              <div className="profile-cover">
                <div className="profile-grid-pattern"></div>
                <div className="profile-cover-glow"></div>

                <div className="profile-cover-content">
                  <span className="profile-cover-badge">
                    BlogHub Account
                  </span>

                  <h2>My Profile</h2>
                  <p>Manage your identity, account role, and BlogHub presence.</p>
                </div>

                <div className="profile-avatar-xl">
                  {user?.username?.charAt(0)?.toUpperCase() || "U"}
                </div>
              </div>

              <div className="profile-main-content">
                <div className="profile-title-block">
                  <span className="profile-kicker">Authenticated User</span>
                  <h1>{user?.username || "BlogHub User"}</h1>
                  <p>{user?.email || "No email found"}</p>
                </div>

                <div className="profile-action-area">
                  {/* <div className="profile-role-pill">
                    {user?.role || "user"}
                  </div> */}

                  <Link to="/profile/update" className="profile-update-btn">
                    Update Profile
                  </Link>

                  <button
                    type="button"
                    className="profile-logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </section>

            <section className="profile-info-grid">
              <div className="profile-info-card highlight">
                <span>Account ID</span>
                <strong>#{user?.id}</strong>
                <p>Your unique BlogHub identity.</p>
              </div>

              <div className="profile-info-card">
                <span>Username</span>
                <strong>{user?.username || "N/A"}</strong>
                <p>Name displayed across posts and comments.</p>
              </div>

              <div className="profile-info-card">
                <span>Email Address</span>
                <strong>{user?.email || "N/A"}</strong>
                <p>Used for login and account communication.</p>
              </div>

              <div className="profile-info-card">
                <span>Role</span>
                <strong>{user?.role || "user"}</strong>
                <p>Your permission level inside BlogHub.</p>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;