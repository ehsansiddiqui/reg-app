import axios from "axios";
import notify from "@/composables/notify";
import { useUserStore } from "../stores/user";

const axiosApiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {},
});
axiosApiClient.interceptors.request.use(
  (config) => {

    const userStore = useUserStore();
    if (userStore.user.token) {
      config.headers['Authorization'] = `Bearer ${userStore.user.token}`;
    }

    return config;

  }, (error) => {
    return Promise.reject(error);
  });


axiosApiClient.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // Do something with request error
  console.log(error.response.data.errors);
  if (error.response.status == 422) {
    for (const [key, value] of Object.entries(error.response.data.errors)) {
      key
      notify(value, 'negative', 'error');
    }
  } else {
    notify(error.message, 'negative', 'error');
  }

  throw error;
})

export default axiosApiClient;