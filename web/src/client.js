import Axios from "axios";
import { createBrowserHistory } from "history";

const client = Axios.create({
  baseURL: "http://156.17.226.48:8000"
});

client.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

client.interceptors.request.use(config => {
  return {
    ...config,
    headers: {
      Authorization: `Bearer google-oauth2 ${localStorage.getItem("token")}`
    }
  };
});

export default client;
