// function LoginPage() {
//   return (
//     <div className="page">
//       <div className="container">
//         <h1 className="page-title">Welcome Back</h1>
//
//         <div className="form-box">
//           <div className="form-group">
//             <label>Email</label>
//             <input type="email" placeholder="Enter your email" />
//           </div>
//
//           <div className="form-group">
//             <label>Password</label>
//             <input type="password" placeholder="Enter your password" />
//           </div>
//
//           <div className="action-row">
//             <button className="btn">Login</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default LoginPage;




// 
// import { useState } from "react";
// import { loginUser } from "../services/authService";
// 
// function LoginPage() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
// 
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
// 
//   const getErrorMessage = (error) => {
//     const detail = error?.response?.data?.detail;
// 
//     if (Array.isArray(detail)) {
//       return detail.map((item) => item.msg).join(", ");
//     }
// 
//     if (typeof detail === "string") {
//       return detail;
//     }
// 
//     if (typeof error?.response?.data?.message === "string") {
//       return error.response.data.message;
//     }
// 
//     return "Login failed.";
//   };
// 
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
// 
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage("");
// 
//     if (!formData.email || !formData.password) {
//       setMessage("Please enter email and password.");
//       return;
//     }
// 
//     try {
//       setLoading(true);
// 
//       const data = await loginUser({
//         email: formData.email,
//         password: formData.password,
//       });
// 
//       const token = data?.access_token;
// 
//       if (token) {
//         localStorage.setItem("bloghub_token", token);
//       }
// 
//       setMessage("Login successful.");
//       console.log("Login response:", data);
//     } catch (error) {
//       console.error("Login error:", error);
//       console.error("Response data:", error?.response?.data);
//       setMessage(getErrorMessage(error));
//     } finally {
//       setLoading(false);
//     }
//   };
// 
//   return (
//     <div className="page">
//       <div className="container">
//         <h1 className="page-title">Welcome Back</h1>
// 
//         <form className="form-box" onSubmit={handleLogin}>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>
// 
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
// 
//           {message && (
//             <p
//               style={{
//                 marginBottom: "14px",
//                 color: "#2563eb",
//                 fontWeight: 600,
//               }}
//             >
//               {message}
//             </p>
//           )}
// 
//           <div className="action-row">
//             <button type="submit" className="btn" disabled={loading}>
//               {loading ? "Logging In..." : "Login"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// 
// export default LoginPage;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (error) => {
    const detail = error?.response?.data?.detail;

    if (Array.isArray(detail)) {
      return detail.map((item) => item.msg).join(", ");
    }

    return detail || error?.response?.data?.message || "Login failed.";
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setMessage("");

    await loginUser(form);

    alert("Login successful! Welcome back to BlogHub.");

    navigate("/");
  } catch (error) {
    console.error("Login error:", error);
    setMessage(getErrorMessage(error));
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-modern-page">
      <div className="login-bg-line login-bg-line-1"></div>
      <div className="login-bg-line login-bg-line-2"></div>
      <div className="login-bg-line login-bg-line-3"></div>

      <div className="login-modern-wrap">
        <div className="login-modern-header">
          <h1>Welcome Back</h1>
          <p>Continue your journey with BlogHub</p>
        </div>

        <div className="login-modern-card">
          {message && <div className="login-modern-alert">{message}</div>}

          <form onSubmit={handleLogin} className="login-modern-form">
            <div className="login-modern-field">
              <label>Email Address</label>
              <div className="login-modern-input">
                <span className="login-input-icon">✉</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="login-modern-field">
              <div className="login-modern-label-row">
                <label>Password</label>
                <Link to="#" className="login-modern-forgot">
                  Forgot?
                </Link>
              </div>

              <div className="login-modern-input">
                <span className="login-input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "" : "👁"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-modern-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>

          <div className="login-modern-divider">
            <span>or continue with</span>
          </div>

          <div className="login-modern-socials">
            <button type="button" className="login-social-btn">
              <span></span> Google
            </button>

            <button type="button" className="login-social-btn">
              <span></span> Apple
            </button>
          </div>

          <p className="login-modern-signup">
            Don't have an account? <Link to="/signup">Sign up for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;