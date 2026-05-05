import axiosInstance from "./axiosInstance";
export const createPost = async (payload) => {
  const response = await axiosInstance.post("/posts/CreatePost", payload);
  return response.data;
};

export const getMyPosts = async (payload) => {
  const response = await axiosInstance.get("/posts/my/", payload);
  return response.data;
};

export const getAllPosts = async () => {
  const response = await axiosInstance.get("/posts/listpost");
  return response.data;
};

export const approvePost = async (postId) => {
  const response = await axiosInstance.put(`/posts/approve/${postId}`);
  return response.data;
};

export const rejectPost = async (postId) => {
  const response = await axiosInstance.put(`/posts/reject/${postId}`);
  return response.data;
};

export const updatePost = async (postId, payload) => {
  const response = await axiosInstance.put(`/posts/${postId}`, payload);
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`/posts/${postId}`);
  return response.data;
};


export const getPostById = async (postId) => {
  const response = await axiosInstance.get(`/posts/getsinglepost/${postId}`);
  return response.data;
};




