import axios from "axios";

export const httpService = axios.create({
  baseURL: "",
});

httpService.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
