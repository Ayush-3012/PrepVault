import { useEffect } from "react";
import API from "../api/axios";
import { useDispatch } from "react-redux";
import { setPostDetails, setPosts } from "../store/postSlice";

export const usePosts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const checkPosts = async () => {
      const res = await API.get("/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) dispatch(setPosts(res?.data));
    };

    checkPosts();
  }, []);

  const getPostById = async (id: string | undefined) => {
    const res = await API.get(`/posts/${id}`);
    if (res.status === 200) dispatch(setPostDetails(res?.data));

    return res?.data;
  };
  const createPost = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("subject", data.subject);
    formData.append("course", data.course);
    formData.append("file", data.file);

    await API.post("/posts", formData);
  };
  const deletePost = async (id: string) => {
    const res = await API.delete(`/posts/${id}`);
    console.log(res);
  };
  const updatePost = async (id: string, data: any) => {
    const res = await API.put(`/posts/${id}`, data);
    console.log(res);
  };

  return { getPostById, createPost, deletePost, updatePost };
};
