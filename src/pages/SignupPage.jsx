// function SignupPage() {
//   return (
//     <div className="page">
//       <div className="container">
//         <h1 className="page-title">Create Your Account</h1>
//
//         <div className="form-box">
//           <div className="form-group">
//             <label>Username</label>
//             <input type="text" placeholder="Enter your username " />
//           </div>
//
//           <div className="form-group">
//             <label>Email</label>
//             <input type="email" placeholder="Enter your email" />
//           </div>
//
//           <div className="form-group">
//             <label>Password</label>
//             <input type="password" placeholder="Create a password" />
//           </div>
//
//
//           <div className="form -group">
//             <label>Role</label>
//             <input type ="text" placeholder="enter your role"/>
//           </div>
//
//
//           <div className="action-row">
//             <button className="btn">Create Account</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default SignupPage;
// 
// import { useState } from "react";
// import { signupUser } from "../services/authService";
// 
// function SignupPage() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "",
//   });
// 
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
// 
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
// 
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setMessage("");
// 
//     if (
//       !formData.username ||
//       !formData.email ||
//       !formData.password ||
//       !formData.role
//     ) {
//       setMessage("Please fill in all fields.");
//       return;
//     }
// 
//     try {
//       setLoading(true);
// 
//       const payload = {
//         username: formData.username,
//         email: formData.email,
//         password: formData.password,
//         role: formData.role,
//       };
// 
//       const data = await signupUser(payload);
//       console.log("Signup success:", data);
// 
//       setMessage("Signup successful.");
// 
//       setFormData({
//         username: "",
//         email: "",
//         password: "",
//         role: "",
//       });
//     } catch (error) {
//       console.error(error);
//       setMessage(
//         error?.response?.data?.detail ||
//           error?.response?.data?.message ||
//           "Signup failed.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
// 
//   return (
//     <div className="page">
//       <div className="container">
//         <h1 className="page-title">Create Your Account</h1>
// 
//         <form className="form-box" onSubmit={handleSignup}>
//           <div className="form-group">
//             <label>Username</label>
//             <input
//               type="text"
//               name="username"
//               placeholder="Enter your username"
//               value={formData.username}
//               onChange={handleChange}
//             />
//           </div>
// 
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
//               placeholder="Create your password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
// 
//           <div className="form-group">
//             <label>Role</label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               style={{
//                 width: "100%",
//                 border: "1px solid #d1d5db",
//                 borderRadius: "12px",
//                 padding: "12px 14px",
//                 background: "#fff",
//                 outline: "none",
//               }}
//             >
//               <option value="">Select role</option>
//               <option value="user">user</option>
//               <option value="admin">admin</option>
//             </select>
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
//               {loading ? "Signing Up..." : "Create Account"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// 
// export default SignupPage;




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService";

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (error) => {
    const detail = error?.response?.data?.detail;

    if (Array.isArray(detail)) {
      return detail.map((item) => item.msg).join(", ");
    }

    return detail || error?.response?.data?.message || "Signup failed.";
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSignup = async (e) => {
  e.preventDefault();

  if (!agreed) {
    setMessage("Please agree to the Terms of Service and Privacy Policy.");
    return;
  }

  try {
    setLoading(true);
    setMessage("");

    await signupUser(form);

    alert("Registration successful! Welcome to BlogHub.");

    navigate("/login");
  } catch (error) {
    console.error("Signup error:", error);
    setMessage(getErrorMessage(error));
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-page">
      <div className="auth-bg auth-bg-one"></div>
      <div className="auth-bg auth-bg-two"></div>

      <div className="signup-card">
        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Join our community of modern writers.</p>
        </div>

        {message && <div className="signup-alert">{message}</div>}

        <form onSubmit={handleSignup} className="signup-form">
          <div className="signup-field">
            <label>Username</label>
            <div className="signup-input-wrap">
              <span className="signup-icon">♙</span>
              <input
                type="text"
                name="username"
                placeholder="text"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-field">
            <label>Email Address</label>
            <div className="signup-input-wrap">
              <span className="signup-icon">✉</span>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-field">
            <label>Password</label>
            <div className="signup-input-wrap">
              <span className="signup-icon">▣</span>
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-field">
            <label>Account Role</label>
            <div className="signup-input-wrap">
              <span className="signup-icon">▤</span>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </div>

          <label className="signup-check">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>
              I agree to the <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </span>
          </label>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="signup-divider"></div>

        <p className="signup-login">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;