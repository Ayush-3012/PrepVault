import API from "./axios";

export const getAllPosts = () => API.get("/posts");
export const getPostById = (id: string) => API.get(`/posts/${id}`);
export const createPost = (data: any) => API.post("/posts", data);
export const deletePost = (id: string) => API.delete(`/posts/${id}`);
export const updatePost = (id: string, data: any) =>
  API.put(`/posts/${id}`, data);
