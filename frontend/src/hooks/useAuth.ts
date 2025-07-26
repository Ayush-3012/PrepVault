import { useEffect, useState } from "react";
import API from "../api/axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, setUserDetails, setUserInfo } from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tokenChanged, setTokenChanged] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const checkStatus = async () => {
      try {
        const res = await API.get(`/users/auth-status`);
        if (res.status === 200) {
          dispatch(setUserInfo(res?.data?.userId));
        }
      } catch (err: any) {
        console.log(err);
        localStorage.removeItem("token");
        dispatch(logoutUser());
      }
    };
    checkStatus();
  }, [dispatch, tokenChanged]);

  const login = async (data: any) => {
    const res = await API.post(`/users/login`, data);

    if (res.status === 200) {
      localStorage.setItem("token", res?.data?.token);
      dispatch(setUserInfo(res?.data?.user?.id));
      setTokenChanged((prev) => prev + 1);
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
      setTokenChanged((prev) => prev + 1);
    }
    return res?.data?.message;
  };

  return { login, register, logout, profile };
};
