import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">PrepVault</Link>
      </div>

      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li>
          <Link to="/posts" className="hover:text-blue-500 transition">
            Posts
          </Link>
        </li>
        <li>
          <Link to="/create" className="hover:text-blue-500 transition">
            Create
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:text-blue-500 transition">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
