import axios from 'axios'

const apiConfig = {
  baseURL: "https://api.github.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const api = axios.create(apiConfig);

export const get = async (url: string, params: object = {}) => {
  const getData = await api.get(url, {
    params,
  });
  return getData.data;
};

export const post = async (url: string, data: object = {}) => {
  const postData = await api.post(url, data);
  return postData.data;
}
