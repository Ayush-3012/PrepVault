/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const auth = useAuth();
  const { userId, userDetails } = useSelector((state: any) => state.auth);
  const { posts } = useSelector((state: any) => state.post);

  const getTotalPosts = () => {
    const totalPosts = posts?.filter((post: any) => post.author._id === userId);
    return totalPosts?.length;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) await auth?.profile(userId);
    };
    fetchProfile();
  }, [userId]);

  if (!userId) {
    return (
      <div className="min-h-screen flex flex-col gap-2 items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-xl font-semibold">
          User Not LoggedIn...{"  "}
          <Link
            to={"/login"}
            className="text-blue-500 font-bold hover:text-blue-600 text-xl"
          >
            Login Now
          </Link>
        </p>
      </div>
    );
  }

  return (
    userDetails && (
      <div className="min-h-screen bg-gray-200 py-10 flex items-start justify-center">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-[0_0_10px] p-8 text-center">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${userDetails.name}`}
            alt="Profile Avatar"
            className="w-24 h-24 mx-auto rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {userDetails.name}
          </h2>
          <p className="text-gray-600 mb-4">{userDetails.email}</p>

          <div className="text-left mt-6">
            <p className="text-gray-700">
              <span className="font-semibold">
                Total Posts: {getTotalPosts()}
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
