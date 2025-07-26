/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { usePosts } from "../hooks/usePosts";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export interface Post {
  _id?: string;
  title: string;
  content: string;
  file: File | string | null;
  fileUrl?: string;
  subject: string;
  course: string;
}

const ManagePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(!!postId);
  const postHook = usePosts();
  const { userId } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const data: any = await postHook?.getPostById(postId);
          setInitialValues(data);
        } catch (error) {
          console.error("Error fetching post:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (data: Post) => {
    try {
      if (postId) {
        await postHook.updatePost(postId, data);
        toast.success("Post Created");
      } else {
        await postHook.createPost(data);
        toast.success("Post Updated");
      }
      navigate("/posts");
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

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

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-6">
      {userId && (
        <PostForm
          initialValues={initialValues || undefined}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ManagePost;
