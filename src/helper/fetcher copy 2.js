import axios from "axios";
import config from "../../config";

export const axiosInstance = axios.create({
  baseURL: config.api.url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // console.log("FIRST interceptor proc")
    config.metadata = { startTime: new Date() };
    // console.log("Request:", config);
    return config;
}, function (error) {
    console.error("Request Error:", error);
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
      // console.log("SECOND interceptor proc")
    const endTime = new Date();
    response.config.metadata.endTime = endTime;
    response.duration = endTime - response.config.metadata.startTime;
    // console.log("Response:", response);
    return response;
  }, function (error) {
    console.error("Response Error:", error);
    return Promise.reject(error);
  });

const fetcher = {};

fetcher.get = async (endpoint, params = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, { params });
    // response.data.duration = response.duration;
    return response.data;
  } catch (error) {
    console.error(error);
    return { data: null, result: false, message: error.message };
  }
};


fetcher.post = async (endpoint, body = {}, params = {}) => {
  try {
    const response = await axiosInstance.post(endpoint, body, { params });
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
    return response.data;
  } catch (error) {
    console.error(error);
    return { data: null, result: false, message: error.message };
  }
};

fetcher.put = async (endpoint, body = {}, params = {}) => {
  try {
    const response = await axiosInstance.put(endpoint, body, { params });
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
    return response.data;
  } catch (error) {
    console.error(error);
    return { data: null, result: false, message: error.message };
  }
};

fetcher.patch = async (endpoint, body = {}, params = {}) => {
  try {
    const response = await axiosInstance.patch(endpoint, body, { params });
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
    return response.data;
  } catch (error) {
    console.error(error);
    return { data: null, result: false, message: error.message };
  }
};

fetcher.delete = async (endpoint, body = {}, params = {}) => {
  try {
    const response = await axiosInstance.delete(endpoint, {
      data: body,
      params,
    });
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
    return response.data;
  } catch (error) {
    console.error(error);
    return { data: null, result: false, message: error.message };
  }
};


export default fetcher;
