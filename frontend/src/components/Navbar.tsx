import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { usePosts } from "../hooks/usePosts";

const Navbar = () => {
  const { userId } = useSelector((state: any) => state.auth);
  const auth = useAuth();
  usePosts();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">PrepVault</Link>
      </div>

      <ul className="flex space-x-6 text-gray-700 font-medium">
        {userId ? (
          <>
            <li>
              <Link to="/posts" className="hover:text-blue-500 transition">
                Posts
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-blue-500 transition">
                Profile
              </Link>
            </li>
            <li>
              <button
                className="hover:text-blue-500 transition cursor-pointer"
                onClick={async (e) => {
                  e.preventDefault();
                  await auth.logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register" className="hover:text-blue-500 transition">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-500 transition">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
