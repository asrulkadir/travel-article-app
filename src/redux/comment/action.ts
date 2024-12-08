import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApp, { handleAxiosError } from "../../utils/axios";
import { IComment, ICommentData, ICommentPayload} from "./types";

export const getComments = createAsyncThunk<ICommentData, string | undefined>("comment/getcomments", async (params) => {
  try {
    const response = await axiosApp.get(`comments${params ? `?${params}` : ""}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});

export const getComment = createAsyncThunk<IComment, string>("comment/getComment", async (id) => {
  try {
    const response = await axiosApp.get(`comments/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});

export const createComment = createAsyncThunk<IComment, {payload: ICommentPayload, params: string}>("comment/createComment", async ({payload, params}, { dispatch }) => {
  try {
    const response = await axiosApp.post(`comments`, {
      data: {
        content: payload.content,
        article: payload.article
      }
    });
    dispatch(getComments(params));
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});

export const updateComment = createAsyncThunk<IComment, {payload: Partial<ICommentPayload>, params: string}>("comment/updateComment", async ({payload, params}, { dispatch }) => {
  try {
    const response = await axiosApp.put(`comments/${payload.documentId}`, {
      data: {
        content: payload.content,
      }
    });
    dispatch(getComments(params));
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});

export const deleteComment = createAsyncThunk<IComment, {id: string, params: string}>("comment/deleteComment", async ({id, params}, { dispatch }) => {
  try {
    const response = await axiosApp.delete(`comments/${id}`);
    dispatch(getComments(params));
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});