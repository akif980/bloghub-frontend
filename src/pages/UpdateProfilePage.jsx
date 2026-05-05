import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile, updateMyProfile } from "../services/authService";

function UpdateProfilePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const getErrorMessage = (error) => {
    const detail = error?.response?.data?.detail;

    if (Array.isArray(detail)) {
      return detail.map((item) => item.msg).join(", ");
    }

    return detail || error?.response?.data?.message || "Something went wrong.";
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setMessage("");

      const profile = await getMyProfile();

      setForm({
        username: profile.username || "",
        email: profile.email || "",
        password: "",
      });
    } catch (error) {
      console.error("Profile load error:", error);
      setMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      const payload = {
        username: form.username,
        email: form.email,
      };

      if (form.password.trim()) {
        payload.password = form.password;
      }

      await updateMyProfile(payload);

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="update-profile-page">
        <div className="update-profile-card">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="update-profile-page">
      <div className="update-profile-orb update-profile-orb-one"></div>
      <div className="update-profile-orb update-profile-orb-two"></div>

      <div className="update-profile-card">
        <div className="update-profile-header">
          <span>Account Settings</span>
          <h1>Update Profile</h1>
          <p>Change your username, email, or password.</p>
        </div>

        {message && <div className="update-profile-alert">{message}</div>}

        <form onSubmit={handleUpdate} className="update-profile-form">
          <div className="update-profile-field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="update-profile-field">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="update-profile-field">
            <label>New Password</label>
            <input
              type="password"
              name="password"
              placeholder="Leave blank if you do not want to change"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="update-profile-actions">
            <button
              type="button"
              className="update-profile-secondary-btn"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="update-profile-primary-btn"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfilePage;
