import axiosInstance from "./axiosInstance";

export const sharePost = async (postId) => {
  const response = await axiosInstance.post("/shares/", {
    post_id: Number(postId),
  });
  return response.data;
};

export const getShareCount = async (postId) => {
  const response = await axiosInstance.get(`/shares/count/${postId}`);
  return response.data;
};
