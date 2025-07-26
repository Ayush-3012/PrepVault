const PostCard = ({ post }: { post: any }) => {
  return (
    <>
      <div className="flex justify-between gap-4 items-center max-md:flex-col">
        <img
          src={
            "https://t3.ftcdn.net/jpg/04/17/28/20/240_F_417282083_X0pybvfs7bqvoNjDOjM3iDklGJ3lTU4q.jpg"
          }
          className="w-40 md:border-r-2 border-black pr-4"
        />
        <div className="flex flex-col w-full p-4 max-md:p-2 max-md:border-t-2 max-md:border-black max-md:mt-2">
          <h2 className="text-2xl font-semibold text-blue-600 max-md:text-xl">
            {post.title}
          </h2>
          <h4 className="text-xl font-semibold text-blue-800 max-md:text-lg">
            Subject: {post.subject}
          </h4>
          <h4 className="text-xl font-semibold text-blue-800 max-md:text-lg">
            Course: {post.course}
          </h4>
          <p className="text-gray-600 mt-2">
            {post.content.split(" ").splice(0, 7).join(" ") + "..."}
          </p>
        </div>
      </div>
      <div className="text-base text-gray-500 text-end">
        Posted by <span className="font-medium">{post.author.name}</span> on{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </div>
    </>
  );
};

export default PostCard;
