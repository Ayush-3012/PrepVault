import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { userId } = useSelector((state: any) => state.auth);
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md px-6 top-0 sticky py-3 flex justify-between items-center max-md:flex-col">
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">PrepVault</Link>
      </div>
      <ul className="flex space-x-6 max-sm:space-x-4 text-gray-700 font-medium">
        {userId ? (
          <>
            <Link to="/posts" className="hover:text-blue-500 transition">
              Posts
            </Link>

            <Link to="/create" className="hover:text-blue-500 transition">
              Create Post
            </Link>

            <Link to="/profile" className="hover:text-blue-500 transition">
              Profile
            </Link>

            <button
              className="hover:text-blue-500 transition cursor-pointer"
              onClick={async (e) => {
                e.preventDefault();
                const res = await auth.logout();
                toast.success(res);
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="hover:text-blue-500 transition">
              Register
            </Link>

            <Link to="/login" className="hover:text-blue-500 transition">
              Login
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
