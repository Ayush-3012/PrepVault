import API from "./axios";

export const register = (data: any) => API.post("/users/register", data);
export const login = (data: any) => API.post(`/users/login`, data);
export const profile = (id: string) => API.get(`/users/profile${id}`);
export const logout = () => API.post(`/users/logout`);
