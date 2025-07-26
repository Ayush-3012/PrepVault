import axios from "axios";
const token = localStorage.getItem("token");

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: { Authorization: `Bearer ${token}` },
  withCredentials: true,
});

export default API;
