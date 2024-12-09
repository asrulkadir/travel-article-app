import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApp, { handleAxiosError } from "../../utils/axios";
import {ICommentData, ICommentDataDetail, ICommentPayload} from "./types";

export const getComments = createAsyncThunk<ICommentData, string | undefined>("comment/getcomments", async (params, { rejectWithValue }) => {
  try {
    const response = await axiosApp.get<ICommentData>(`comments${params ? `?${params}` : ""}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const getComment = createAsyncThunk<ICommentDataDetail, string>("comment/getComment", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosApp.get<ICommentDataDetail>(`comments/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const createComment = createAsyncThunk<ICommentDataDetail, {payload: ICommentPayload, params: string}>("comment/createComment", async ({payload, params}, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosApp.post<ICommentDataDetail>(`comments`, {
      data: {
        content: payload.content,
        article: payload.article
      }
    });
    await dispatch(getComments(params));
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const updateComment = createAsyncThunk<ICommentDataDetail, {payload: Partial<ICommentPayload>, params: string}>("comment/updateComment", async ({payload, params}, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosApp.put<ICommentDataDetail>(`comments/${payload.documentId}`, {
      data: {
        content: payload.content,
      }
    });
    await dispatch(getComments(params));
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const deleteComment = createAsyncThunk<void, {id: string, params: string}>("comment/deleteComment", async ({id, params}, { dispatch, rejectWithValue }) => {
  try {
    await axiosApp.delete(`comments/${id}`);
    await dispatch(getComments(params));
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});