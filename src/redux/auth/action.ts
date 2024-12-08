import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApp, { handleAxiosError } from "../../utils/axios";
import { IAuthData, ILoginPayload, IRegisterPayload } from "./types";
import Cookies from "js-cookie";

export const loginReq = createAsyncThunk<IAuthData | undefined, ILoginPayload>(
  "auth/loginReq",
  async (payload) => {
    try {
      const response = await axiosApp.post<IAuthData>(`auth/local`, payload);
      Cookies.set("auth-test", response.data.jwt);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);

export const registerReq = createAsyncThunk<IAuthData | undefined, IRegisterPayload>(
  "auth/registerReq",
  async (payload) => {
    try {
      const response = await axiosApp.post<IAuthData>(`auth/local/register`, payload);
      alert("User registered successfully");
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);

export const logoutReq = createAsyncThunk("auth/logoutReq", async () => {
  try {
    Cookies.remove("auth-test");
    localStorage.removeItem("user");
  } catch (error) {
    handleAxiosError(error);
  }
});