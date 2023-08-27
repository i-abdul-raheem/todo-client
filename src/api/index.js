import axios from 'axios';

const url =
  process.env.REACT_APP_NODE_ENV === 'local'
    ? 'http://localhost:5000'
    : 'https://todo-api-virid.vercel.app';

export const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data?.data)
    .catch(() => []);
};

export const getOne = (id) => {
  return axios
    .get(url + '/' + id)
    .then((res) => {
      return res.data?.data;
    })
    .catch(() => {});
};

export const addOne = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((err) => {
      return { message: err };
    });
};

export const updateOne = (id, data) => {
  return axios
    .put(url + '/' + id, data)
    .then((res) => res.data)
    .catch(() => []);
};

export const deleteOne = (id) => {
  return axios
    .delete(url + '/' + id)
    .then((res) => res.data)
    .catch((err) => {
      return { message: err };
    });
};
