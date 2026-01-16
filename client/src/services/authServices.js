import axios from "axios";

const API = import.meta.env.VITE_SERVER_URL + "/api";

export const loginService = async (validatedData) => {
  return await axios.post(`${API}/login`, validatedData, {
    withCredentials: true,
  });
};

export const registerService = async (validatedData) => {
  return await axios.post(`${API}/register`, validatedData, {
    withCredentials: true,
  });
};


export const verifyToken = async ()=>{
  return await axios.get(`${API}/login/verify`);

}