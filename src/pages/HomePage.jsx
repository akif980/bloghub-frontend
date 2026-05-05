// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { getMyProfile } from "../services/authService";
// import { getAllPosts } from "../services/postServices";
// 
// function HomePage() {
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);
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
//     return "Something went wrong.";
//   };
// 
//   useEffect(() => {
//     const loadHomeData = async () => {
//       try {
//         setLoading(true);
//         setMessage("");
// 
//         const [profileData, postsData] = await Promise.all([
//           getMyProfile(),
//           getAllPosts(),
//         ]);
// 
//         setUser(profileData);
//         setPosts(postsData);
//       } catch (error) {
//         console.error("Home page error:", error);
//         setMessage(getErrorMessage(error));
//       } finally {
//         setLoading(false);
//       }
//     };
// 
//     loadHomeData();
//   }, []);
// 
//   const filteredPosts = useMemo(() => {
//     const keyword = search.trim().toLowerCase();
// 
//     if (!keyword) return posts;
// 
//     return posts.filter((post) => {
//       const title = post.title?.toLowerCase() || "";
//       const content = post.content?.toLowerCase() || "";
//       return title.includes(keyword) || content.includes(keyword);
//     });
//   }, [posts, search]);
// 
//   return (
//     <div className="page">
//       <div className="container">
//         <section className="hero">
//           <span className="hero-badge">Welcome to BlogHub</span>
// 
//           <h1>{user ? `Hello, ${user.username}` : "Welcome to BlogHub"}</h1>
// 
//           <p>
//             {user
//               ? `You are logged in as ${user.role}. Explore posts, manage your content, and continue your blogging workflow.`
//               : "Explore posts, write content, and manage your blogging workflow."}
//           </p>
// 
//           <div className="hero-actions">
//             <Link to="/create-post" className="btn">
//               Create Post
//             </Link>
// 
//             <Link to="/my-posts" className="btn btn-secondary">
//               My Posts
//             </Link>
// 
//             <Link to="/posts" className="btn btn-secondary">
//               All Posts
//             </Link>
//           </div>
//         </section>
// 
//         {message && (
//           <div className="profile-card" style={{ marginBottom: "20px" }}>
//             <p style={{ color: "crimson", fontWeight: 600 }}>{message}</p>
//           </div>
//         )}
// 
//         {user && (
//           <div className="content-layout" style={{ marginBottom: "24px" }}>
//             <div className="main-content">
//               <div className="sidebar-card">
//                 <h3>Account Overview</h3>
//                 <div className="post-meta">
//                   <span>Username: {user.username}</span>
//                   <span>Email: {user.email}</span>
//                   <span>Role: {user.role}</span>
//                 </div>
//               </div>
//             </div>
// 
//             <aside className="sidebar">
//               <div className="sidebar-card">
//                 <h3>Quick Stats</h3>
//                 <ul className="sidebar-list">
//                   <li>
//                     <strong>Total visible posts:</strong> {posts.length}
//                   </li>
//                   <li>
//                     <strong>Current role:</strong> {user.role}
//                   </li>
//                   <li>
//                     <strong>Search ready:</strong> Yes
//                   </li>
//                 </ul>
//               </div>
// 
//               <div className="sidebar-card">
//                 <h3>Quick Actions</h3>
//                 <div className="action-row">
//                   <Link to="/profile" className="btn btn-secondary">
//                     Profile
//                   </Link>
//                   {user.role === "admin" && (
//                     <Link to="/moderation/pending" className="btn">
//                       Moderation
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             </aside>
//           </div>
//         )}
// 
//         <div className="toolbar">
//           <h2 className="section-title" style={{ marginBottom: 0 }}>
//             Latest Posts
//           </h2>
// 
//           <input
//             className="inline-input"
//             type="text"
//             placeholder="Search by title or content..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
// 
//         {loading ? (
//           <div className="profile-card">
//             <p>Loading homepage...</p>
//           </div>
//         ) : filteredPosts.length === 0 ? (
//           <div className="profile-card">
//             <p>No posts found.</p>
//           </div>
//         ) : (
//           <div className="list-stack">
//             {filteredPosts.map((post) => (
//               <div key={post.id} className="post-row">
//                 <div className="post-meta">
//                   <span>Post ID: {post.id}</span>
//                   {post.owner_id && <span>Owner ID: {post.owner_id}</span>}
//                   {post.approved !== undefined && (
//                     <span>{post.approved ? "Approved" : "Pending"}</span>
//                   )}
//                 </div>
// 
//                 <h3>{post.title}</h3>
//                 <p>{post.content}</p>
// 
//                 <div className="action-row">
//                   <Link to={`/posts/${post.id}`} className="btn btn-secondary">
//                     View
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// 
// export default HomePage;

// 
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getMyProfile } from "../services/authService";
// import { getAllPosts } from "../services/postServices";
// 
// function HomePage() {
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);
// 
//   const getErrorMessage = (error) => {
//     const detail = error?.response?.data?.detail;
// 
//     if (Array.isArray(detail)) {
//       return detail.map((item) => item.msg).join(", ");
//     }
// 
//     return detail || error?.response?.data?.message || "Something went wrong.";
//   };
// 
//   useEffect(() => {
//     loadHomeData();
//   }, []);
// 
//   const loadHomeData = async () => {
//     try {
//       setLoading(true);
//       setMessage("");
// 
//       const profileData = await getMyProfile();
//       const postsData = await getAllPosts();
// 
//       setUser(profileData);
//       setPosts(postsData);
//     } catch (error) {
//       console.error("Home page error:", error);
//       setMessage(getErrorMessage(error));
//     } finally {
//       setLoading(false);
//     }
//   };
// 
//   const keyword = search.trim().toLowerCase();
// 
//   const myLatestPosts = posts
//     .filter((post) => post.owner_id === user?.id)
//     .filter((post) => {
//       if (!keyword) return true;
// 
//       const title = post.title?.toLowerCase() || "";
//       const content = post.content?.toLowerCase() || "";
// 
//       return title.includes(keyword) || content.includes(keyword);
//     })
//     .slice(0, 5);
// 
//   return (
//     <div className="page">
//       <div className="container">
//         <section className="hero">
//           <span className="hero-badge">Welcome to BlogHub</span>
// 
//           <h1>{user ? `Hello, ${user.username}` : "Welcome to BlogHub"}</h1>
// 
//           <p>
//             {user
//               ? `You are logged in as ${user.role}.`
//               : "Explore posts and manage your blogging workflow."}
//           </p>
// 
//           <div className="hero-actions">
//             <Link to="/create-post" className="btn">
//               Create Post
//             </Link>
// 
//             <Link to="/my-posts" className="btn btn-secondary">
//               My Posts
//             </Link>
//           </div>
//         </section>
// 
//         {message && (
//           <div className="profile-card" style={{ marginBottom: "20px" }}>
//             <p style={{ color: "crimson", fontWeight: 600 }}>{message}</p>
//           </div>
//         )}
// 
//         <div className="toolbar">
//           <h2 className="section-title" style={{ marginBottom: 0 }}>
//             My Latest Posts
//           </h2>
// 
//           <input
//             className="inline-input"
//             type="text"
//             placeholder="Search your posts..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
// 
//         {loading && (
//           <div className="profile-card">
//             <p>Loading posts...</p>
//           </div>
//         )}
// 
//         {!loading && myLatestPosts.length === 0 && (
//           <div className="profile-card">
//             <p>No posts found.</p>
//           </div>
//         )}
// 
//         {!loading && myLatestPosts.length > 0 && (
//           <div className="list-stack">
//             {myLatestPosts.map((post) => (
//               <div key={post.id} className="post-row">
//                 <div className="post-meta">
//                   <span>Post ID: {post.id}</span>
// 
//                   {post.approved !== undefined && (
//                     <span>{post.approved ? "Approved" : "Pending"}</span>
//                   )}
//                 </div>
// 
//                 <h3>{post.title}</h3>
//                 <p>{post.content}</p>
// 
//                 <div className="action-row">
//                   <Link to={`/posts/${post.id}`} className="btn btn-secondary">
//                     View
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default HomePage;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProfile } from "../services/authService";
import { getAllPosts } from "../services/postServices";

function HomePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const getErrorMessage = (error) => {
    const detail = error?.response?.data?.detail;

    if (Array.isArray(detail)) {
      return detail.map((item) => item.msg).join(", ");
    }

    return detail || error?.response?.data?.message || "Something went wrong.";
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      setMessage("");

      const profileData = await getMyProfile();
      const postsData = await getAllPosts();

      setUser(profileData);
      setPosts(postsData);
    } catch (error) {
      console.error("Home page error:", error);
      setMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const keyword = search.trim().toLowerCase();

  const myPosts = posts.filter((post) => post.owner_id === user?.id);

  const myLatestPosts = myPosts
    .filter((post) => {
      if (!keyword) return true;

      const title = post.title?.toLowerCase() || "";
      const content = post.content?.toLowerCase() || "";

      return title.includes(keyword) || content.includes(keyword);
    })
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  const approvedPosts = myPosts.filter((post) => post.approved === true).length;
  const pendingPosts = myPosts.filter((post) => post.approved === false).length;

  return (
    <div className="home-page">
      <div className="home-bg-orb home-bg-orb-one"></div>
      <div className="home-bg-orb home-bg-orb-two"></div>

      <div className="container">
        <section className="home-hero">
          <div className="home-hero-grid"></div>
          <div className="home-hero-glow"></div>

          <div className="home-hero-content">
            <div className="home-hero-left">
              <span className="home-kicker">
                <span></span>
                BlogHub Workspace
              </span>

              <h1>
                {user ? (
                  <>
                    Write new stories,{" "}
                    <strong>{user.username}</strong>
                  </>
                ) : (
                  "Welcome to BlogHub"
                )}
              </h1>

              <p>
                {user
                  ? `You are signed in as ${user.role}. Create posts, manage your content, and track your publishing status from one modern dashboard.`
                  : "Create, manage, and explore content through a clean modern blogging experience."}
              </p>

              <div className="home-hero-actions">
                <Link to="/create-post" className="home-primary-btn">
                  <span>+</span>
                  Create New Post
                </Link>

                <Link to="/my-posts" className="home-secondary-btn">
                  View My Posts
                </Link>
              </div>
            </div>

            <div className="home-hero-panel">
              <div className="home-profile-mini">
                <div className="home-avatar">
                  {user?.username?.charAt(0)?.toUpperCase() || "B"}
                </div>

                <div>
                  <h3>{user?.username || "BlogHub User"}</h3>
                  <p>{user?.role || "User"}</p>
                </div>
              </div>

              <div className="home-stat-feature">
                <span>Total Personal Posts</span>
                <strong>{myPosts.length}</strong>
              </div>

              <div className="home-mini-stats">
                <div>
                  <strong>{approvedPosts}</strong>
                  <span>Approved</span>
                </div>

                <div>
                  <strong>{pendingPosts}</strong>
                  <span>Pending</span>
                </div>
              </div>
            </div>
          </div>

          <div className="home-hero-watermark">BLOGHUB</div>
        </section>

        {message && (
          <div className="home-alert">
            <p>{message}</p>
          </div>
        )}

        <section className="home-post-section">
          <div className="home-section-header">
            <div>
              <span>Recent Activity</span>
              <h2>My Latest Posts</h2>
            </div>

            <input
              className="home-search"
              type="text"
              placeholder="Search your posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading && (
            <div className="home-empty-card">
              <p>Loading posts...</p>
            </div>
          )}

          {!loading && myLatestPosts.length === 0 && (
            <div className="home-empty-card">
              <h3>No posts found</h3>
              <p>Create your first BlogHub post or try another search keyword.</p>
              <Link to="/create-post" className="home-primary-btn">
                <span>+</span>
                Create Post
              </Link>
            </div>
          )}

          {!loading && myLatestPosts.length > 0 && (
            <div className="home-post-grid">
              {myLatestPosts.map((post) => (
                <article key={post.id} className="home-post-card">
                  <div className="home-post-top">
                    <span>#{post.id}</span>

                    {post.approved !== undefined && (
                      <span
                        className={
                          post.approved
                            ? "home-status approved"
                            : "home-status pending"
                        }
                      >
                        {post.approved ? "Approved" : "Pending"}
                      </span>
                    )}
                  </div>

                  <h3>{post.title}</h3>

                  <p>{post.content}</p>

                  <div className="home-post-footer">
                    <span>BlogHub Post</span>

                    <Link to={`/posts/${post.id}`} className="home-view-link">
                      View Post →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default HomePage;
