import axiosInstance from "./axiosInstance";

export const getCommentsByPost = async (postId) => {
  const response = await axiosInstance.get(`/comments/post/${postId}`);
  return response.data;
};

export const createComment = async (payload) => {
  const response = await axiosInstance.post("/comments/", payload);
  return response.data;
};

export const updateComment = async (commentId, payload) => {
  const response = await axiosInstance.put(`/comments/${commentId}`, payload);
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await axiosInstance.delete(`/comments/${commentId}`);
  return response.data;
};
