


import axiosInstance from "./axiosInstance";

export const signupUser = async (payload) => {
  const response = await axiosInstance.post("/users/signup", payload);
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const response = await axiosInstance.post("/users/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  localStorage.setItem("bloghub_token", response.data.access_token);

  return response.data;
};

export const getMyProfile = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};

export const updateMyProfile = async (data) => {
  const response = await axiosInstance.put("/users/me/update", data);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/users/allusers");
  return response.data;
};

export const getUserProfileById = async (userId) => {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data;
};