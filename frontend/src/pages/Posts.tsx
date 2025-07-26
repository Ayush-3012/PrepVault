import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

const Posts = () => {
  const { posts } = useSelector((state: any) => state.post);
  const { userId } = useSelector((state: any) => state.auth);

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
    <>
      <div className="max-w-5xl mx-auto min-h-screen overflow-hidden px-4 py-10 max-sm:mx-0">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          📚 All Posts
        </h1>
        {posts?.length === 0 ? (
          <p className="text-center text-gray-500 text-3xl">Loading posts...</p>
        ) : (
          <div className="overflow-y-auto p-5">
            {posts?.map((post: any) => (
              <Link key={post._id} to={`/posts/${post._id}`}>
                <div className="bg-slate-200 p-4 cursor-pointer hover:scale-[1.03] duration-200 transition-all ease-in-out rounded-lg mb-4">
                  <PostCard post={post} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Posts;
