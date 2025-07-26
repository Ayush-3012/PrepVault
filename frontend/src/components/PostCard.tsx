const PostCard = ({ post }: { post: any }) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-blue-600">{post.fileUrl}</h2>
      <p className="text-gray-600 mt-2">{post.content}</p>
      {/* <div className="text-sm text-gray-500 mt-3">
        Posted by <span className="font-medium">{post.author}</span> on{" "}
        {new Date(post.date).toLocaleDateString()}
      </div> */}
    </>
  );
};

export default PostCard;
