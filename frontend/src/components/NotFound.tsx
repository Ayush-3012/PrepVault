import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-200">
      <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
      <p className="text-2xl font-semibold mt-4 text-gray-800">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to={"/"}
        className="mt-6 px-6 py-3 bg-blue-600 text-gray-200 font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
