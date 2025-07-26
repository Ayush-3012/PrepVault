import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const { userId } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (userId) {
      navigate("/");
    }
  }, [navigate, userId]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");

      return;
    }

    try {
      await auth?.register({ name, email, password });
      toast.success("User Registered");

      setError("");
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
            onSubmit={handleRegister}
            className="bg-white p-8 rounded-xl shadow-md w-96 max-lg:w-80 max-md:w-72 flex flex-col gap-2"
          >
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-4 underline">
              Register
            </h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <input
              type="text"
              placeholder="Enter your name"
              className="border p-2 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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
                className="border p-2 w-full rounded-lg"
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

            <div className="relative flex items-center">
              <input
                type={viewConfirmPassword ? "text" : "password"}
                placeholder="Confirm your Password"
                className="border w-full p-2 rounded-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {viewConfirmPassword ? (
                <FaEyeSlash
                  className="text-3xl text-blue-500 absolute right-2 cursor-pointer transition duration-150 hover:text-blue-600 hover:-translate-y-1"
                  onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
                />
              ) : (
                <FaEye
                  className="text-3xl text-blue-500 absolute right-2  cursor-pointer transition duration-150 hover:text-blue-600 hover:-translate-y-1"
                  onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-green-500 cursor-pointer hover:scale-x-105 duration-200 transition-all text-white py-2 rounded-lg hover:bg-green-600"
            >
              Register
            </button>

            <div className="flex items-center justify-center gap-2">
              <h2>Already Have an account? Login Now: </h2>
              <Link
                to={"/login"}
                className="text-blue-400 hover:text-blue-600 hover:underline"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
