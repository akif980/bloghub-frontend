// import { Link } from "react-router-dom";
// import dummyUsers from "../data/dummyUsers";
// 
// function UsersPage() {
//   return (
//     <div className="page">
//       <div className="container">
//         <div className="toolbar">
//           <h1 className="page-title" style={{ marginBottom: 0 }}>
//             Users
//           </h1>
// 
//           <input
//             className="inline-input"
//             type="text"
//             placeholder="Search users..."
//           />
//         </div>
// 
//         <div className="user-grid">
//           {dummyUsers.map((user) => (
//             <div key={user.id} className="user-card">
//               <h3>{user.name}</h3>
//               <p>{user.email}</p>
// 
//               <div className="post-meta">
//                 <span>{user.role}</span>
//               </div>
// 
//               <p>{user.bio}</p>
// 
//               <Link to={`/users/${user.id}`} className="btn">
//                 View Profile
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// 
// export default UsersPage;



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../services/authService";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

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

    return "Failed to load users.";
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("All users error:", error);
        setMessage(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="toolbar">
          <h1 className="page-title" style={{ marginBottom: 0 }}>
            All Users
          </h1>
        </div>

        {loading ? (
          <div className="profile-card">
            <p>Loading users..</p>
          </div>
        ) : message ? (
          <div className="profile-card">
            <p style={{ color: "crimson", fontWeight: 600 }}>{message}</p>
          </div>
        ) : users.length === 0 ? (
          <div className="profile-card">
            <p>No users found.</p>
          </div>
        ) : (
          <div className="user-grid">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <h3>{user.username}</h3>
                <p>{user.email}</p>

                <div className="post-meta">
                  <span>Role: {user.role}</span>
                  <span>ID: {user.id}</span>
                  

                </div>

                <Link to={`/users/${user.id}`} className="btn">
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersPage;