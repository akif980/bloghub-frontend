import { Link } from "react-router-dom";
import logo from "../assets/logo.PNG";
function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          <img src={logo} alt="BlogHub Logo" className="logo-img" />
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/create-post">Write</Link>
          <Link to="/my-posts">My Posts</Link>
          <Link to="/posts">All Posts</Link>
          <Link to="/users">Users</Link>
          <Link to="/moderation/pending">Moderation</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          {/* <Link to="/posts">All Posts</Link> */}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
