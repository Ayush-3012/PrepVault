import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [error, setError] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  const { userId } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (userId) {
      navigate("/");
    }
  }, [navigate, userId]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      toast.error("All fields are required");
      return;
    }

    try {
      await auth?.login({ email, password });
      setError("");
      toast.success("User Logged In");
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      {!userId && (
        <div className="flex justify-center items-center py-8 bg-gray-100">
          <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-xl shadow-md w-96 max-lg:w-80 max-md:w-72 flex flex-col gap-2"
          >
            <h2 className="text-2xl font-bold text-center text-green-500 mb-4 underline">
              Login
            </h2>

            <input
              type="email"
              placeholder="Enter your Email"
              className="border p-2 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative flex items-center">
              <input
                type={viewPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="border rounded-lg p-2 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {viewPassword ? (
                <FaEyeSlash
                  className="text-3xl text-blue-500 absolute right-2 cursor-pointer transition duration-150 hover:text-blue-600 hover:-translate-y-1"
                  onClick={() => setViewPassword(!viewPassword)}
                />
              ) : (
                <FaEye
                  className="text-3xl text-blue-500 absolute right-2 cursor-pointer transition duration-150 hover:text-blue-600 hover:-translate-y-1"
                  onClick={() => setViewPassword(!viewPassword)}
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 cursor-pointer hover:scale-x-105 duration-200 transition-all text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>

            <div className="flex items-center justify-center gap-2">
              <h2>New User? Register Now: </h2>
              <Link
                to={"/register"}
                className="text-blue-400 hover:text-blue-600 hover:underline"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
