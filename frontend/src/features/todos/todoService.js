
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos/";

const getConfig = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    headers: { Authorization: `Bearer ${user?.token}` },
  };
};

const getTodos = async () => {
  const res = await axios.get(API_URL, getConfig());
  return res.data;
};

const addTodo = async (text) => {
  const res = await axios.post(API_URL, { text }, getConfig());
  return res.data;
};

const updateTodo = async (id, data) => {
  const res = await axios.put(API_URL + id, data, getConfig());
  return res.data;
};

const deleteTodo = async (id) => {
  const res = await axios.delete(API_URL + id, getConfig());
  return res.data;
};

export default { getTodos, addTodo, updateTodo, deleteTodo };