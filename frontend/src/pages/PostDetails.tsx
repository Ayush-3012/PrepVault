import { useSelector } from "react-redux";

const PostDetails = () => {
  const { postDetails } = useSelector((state: any) => state.post);
  console.log(postDetails);
  return <div>PostDetails</div>;
};

export default PostDetails;
