import { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePosts } from "../hooks/usePosts";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PostDetails = () => {
  const postHook = usePosts();
  const navigate = useNavigate();
  const { id } = useParams();
  const { postDetails } = useSelector((state: any) => state.post);
  const { userId } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const fetchPostDetails = async () => {
      await postHook?.getPostById(id);
    };

    fetchPostDetails();
  }, []);

  const handleDownload = async () => {
    const response = await axios.get(
      `http://localhost:5000${postDetails.fileUrl}`,
      {
        responseType: "blob",
        withCredentials: true,
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${postDetails.title.replace(/\s+/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Pdf Downloaded");
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

  if (!postDetails) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl flex flex-col items-center mx-auto p-6 shadow-[0px_0px_10px] shadow-black rounded-md bg-slate-200 mt-4 max-sm:p-4 max-sm:mx-2">
      <div className="flex max-md:flex-col max-md:items-center max-md:gap-2 border-b-2 border-slate-800 pb-4 w-full justify-between">
        <img
          src={
            "https://t3.ftcdn.net/jpg/04/17/28/20/240_F_417282083_X0pybvfs7bqvoNjDOjM3iDklGJ3lTU4q.jpg"
          }
          className="w-72 "
        />
        {userId === postDetails?.author?._id && (
          <div className="flex  items-start gap-4">
            <Link
              to={`/edit/${postDetails._id}`}
              className="bg-emerald-400 hover:bg-green-600 hover:scale-110 rounded-lg cursor-pointer duration-150 transition-all px-4 py-2"
            >
              Edit
            </Link>
            <button
              className="bg-red-400 hover:bg-red-600 hover:scale-110 rounded-lg cursor-pointer duration-150 transition-all px-4 py-2"
              onClick={async () => {
                await postHook?.deletePost(postDetails?._id);
                toast.success("Post Deleted");
                navigate("/posts");
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="mt-2 p-4 self-starts">
        <h1 className="text-3xl font-bold mb-4 max-md:text-2xl max-sm:text-xl">
          {postDetails.title}
        </h1>
        <p className="mb-2">
          <strong>Author:</strong> {postDetails.author?.name}
        </p>
        <p className="mb-2">
          <strong>Subject:</strong> {postDetails.subject}
        </p>
        <p className="mb-2">
          <strong>Course:</strong> {postDetails.course}
        </p>
        <p className="mb-4 whitespace-pre-line">{postDetails.content}</p>
      </div>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-600 cursor-pointer hover:scale-110 transition-all duration-150 hover:bg-blue-700 text-white rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default PostDetails;
