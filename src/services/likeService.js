import axiosInstance from "./axiosInstance";

export const likePost = async (postId) => {
  const response = await axiosInstance.post("/likes/", {
    post_id: Number(postId),
  });
  return response.data;
};

export const getLikeCount = async (postId) => {
  const response = await axiosInstance.get(`/likes/count/${postId}`);
  return response.data;
};
