import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const add = (newItem) => {
  const request = axios.post(baseUrl, newItem);
  return request.then((response) => response.data);
};
const update = (id, updateItem) => {
  const request = axios.put(`${baseUrl}/${id}`, updateItem);
  console.log(`${baseUrl}/${id}`, updateItem);
  return request.then((response) => response.data);
};
const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, add, update, remove };
