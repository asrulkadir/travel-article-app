import { createSlice } from "@reduxjs/toolkit";
import { loginReq, logoutReq, registerReq } from "./action";
import { IAuthState } from "./types";
import Cookies from "js-cookie";
// import { Dispatch } from "redux";

const initialState: IAuthState = {
  authData: {
    jwt: Cookies.get("auth-test") || "",
    user: JSON.parse(localStorage.getItem("user") || "{}")
  },
  loading: false,
  error: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //  login request
    builder.addCase(loginReq.fulfilled, (state, action) => {
      if (action.payload) {
        state.authData = action.payload;
      }
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginReq.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginReq.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });

    //  register request
    builder.addCase(registerReq.fulfilled, (state, action) => {
      if (action.payload) {
        state.authData = action.payload;
      }
      state.loading = false;
      state.error = null;
    }
    );
    builder.addCase(registerReq.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerReq.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });

    //  logout request
    builder.addCase(logoutReq.fulfilled, (state) => {
      state.authData = {
        jwt: "",
        user: {
          id: 0,
          documentId: "",
          username: "",
          email: "",
          provider: "",
          confirmed: false,
          blocked: false,
          createdAt: "",
          updatedAt: "",
          publishedAt: "",
          locale: null
        }
      };
      state.loading = false;
      state.error = null;
    });
  }
});

export default authSlice.reducer;
