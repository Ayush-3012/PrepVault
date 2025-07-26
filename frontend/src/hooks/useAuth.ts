import { useEffect } from "react";
import API from "../api/axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, setUserDetails, setUserInfo } from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const checkStatus = async () => {
      const res = await API.get(`/users/auth-status`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) dispatch(setUserInfo(res?.data?.userId));
    };
    checkStatus();
  }, [dispatch, token]);

  const login = async (data: any) => {
    const res = await API.post(`/users/login`, data);

    if (res.status === 200) {
      localStorage.setItem("token", res?.data?.token);
      dispatch(setUserInfo(res?.data?.user?.id));
      navigate("/");
    }
  };

  const register = async (data: any) => {
    const res = await API.post("/users/register", data);
    if (res.status === 201) navigate("/login");
  };

  const profile = async (id: string) => {
    const res = await API.get(`/users/profile/${id}`);

    if (res.status === 200) dispatch(setUserDetails(res?.data?.user));
  };

  const logout = async () => {
    const res = await API.post(`/users/logout`, {});
    if (res.status === 200) {
      localStorage.removeItem("token");
      dispatch(logoutUser());
    }
    return res?.data?.message;
  };

  return { login, register, logout, profile };
};
