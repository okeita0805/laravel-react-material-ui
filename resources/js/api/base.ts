import axios, { AxiosError } from "axios";

export const isAxiosError = (error: any): error is AxiosError => {
  return !!error.isAxiosError;
};

const instance = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  responseType: "json",
});

export default instance;
