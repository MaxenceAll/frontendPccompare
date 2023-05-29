import axios from "axios";
import config from "../../config";

export const axiosInstance = axios.create({
  baseURL: config.api.url,
  withCredentials: true,
});

const fetcher = {};

fetcher.get = async (endpoint, params = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    return { data: null, result: false, message: error.response.data.message , error: error.message};
  }
};


fetcher.post = async (endpoint, body = {}, params = {}) => {
  try {
    let headers = { "Content-Type": "application/json" };
    if (body instanceof FormData) {
      headers = { "Content-Type": "multipart/form-data" };
    }
    const response = await axiosInstance.post(endpoint, body, {
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return { data: null, result: false, message: error.response.data.message , error: error.message};
  }
};

fetcher.put = async (endpoint, body = {}, params = {}) => {
  try {
    let headers = { "Content-Type": "application/json" };
    if (body instanceof FormData) {
      // If body is a FormData object, set Content-Type to multipart/form-data
      headers = { "Content-Type": "multipart/form-data" };
    }
    const response = await axiosInstance.put(endpoint, body, {
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return { data: null, result: false, message: error.response.data.message , error: error.message};
  }
};

fetcher.patch = async (endpoint, body = {}, params = {}) => {
  try {
    let headers = { "Content-Type": "application/json" };
    if (body instanceof FormData) {
      // If body is a FormData object, set Content-Type to multipart/form-data
      headers = { "Content-Type": "multipart/form-data" };
    }
    const response = await axiosInstance.patch(endpoint, body, {
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return { data: null, result: false, message: error.response.data.message , error: error.message};
  }
};

fetcher.delete = async (endpoint, body = {}, params = {}) => {
  try {
    let headers = { "Content-Type": "application/json" };
    if (body instanceof FormData) {
      // If body is a FormData object, set Content-Type to multipart/form-data
      headers = { "Content-Type": "multipart/form-data" };
    }
    const response = await axiosInstance.delete(endpoint, {
      headers,
      data: body,
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return { data: null, result: false, message: error.response.data.message , error: error.message};
  }
};

export default fetcher;