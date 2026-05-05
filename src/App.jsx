import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import MyPostsPage from "./pages/MyPostsPage";
import PendingPostsPage from "./pages/PendingPostsPage";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/UsersPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import AllPostsPage from "./pages/AllPostsPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/update" element={<UpdateProfilePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/posts/:id" element={<PostDetailsPage />} />
        <Route path="/posts/edit/:id" element={<EditPostPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/my-posts" element={<MyPostsPage />} />
        <Route path="/moderation/pending" element={<PendingPostsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserProfilePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/posts" element={<AllPostsPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/posts/edit/:id" element={<EditPostPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;