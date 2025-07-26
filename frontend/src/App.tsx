import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Register from "./auth/Register";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";

function App() {
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
      </Routes>
    </>
  );
}

export default App;
