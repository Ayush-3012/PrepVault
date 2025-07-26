import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Register from "./auth/Register";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import ManagePost from "./pages/ManagePost";
import { useAuth } from "./hooks/useAuth";
import { usePosts } from "./hooks/usePosts";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

function App() {
  useAuth();
  usePosts();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/create" element={<ManagePost />} />
        <Route path="/edit/:postId" element={<ManagePost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
