import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import { usePosts } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const { posts } = useSelector((state: any) => state.post);
  const postHook = usePosts();
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">All Posts</h1>
        {posts?.length === 0 ? (
          <p className="text-gray-500">Loading posts...</p>
        ) : (
          posts?.map((post: any) => (
            <div
              key={post._id}
              onClick={async () => {
                await postHook?.getPostById(post._id);
                navigate(`/posts/${post._id}`);
              }}
              className="bg-white p-5 shadow-md cursor-pointer hover:scale-105 duration-200 transition-all ease-in-out rounded-lg mb-6 border border-gray-100"
            >
              <PostCard post={post} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Posts;
