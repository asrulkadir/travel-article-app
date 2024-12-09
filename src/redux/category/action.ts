import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApp, { handleAxiosError } from "../../utils/axios";
import { ICategory, ICategoryData, ICategoryDataDetail, ICategoryPayload } from "./types";

export const getCategories = createAsyncThunk<ICategoryData, string | undefined>("category/getCategories", async (_, {rejectWithValue}) => {
  try {
    const response = await axiosApp.get<ICategoryData>(`categories`);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const getCategory = createAsyncThunk<ICategoryDataDetail, string>("category/getCategory", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosApp.get<ICategoryDataDetail>(`categories/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const createCategory = createAsyncThunk<ICategoryDataDetail, Partial<ICategoryPayload>>("category/createCategory", async (category, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosApp.post<ICategoryDataDetail>(`categories`, {
      data: {
        name: category.name,
        description: category.description
      }
    });
    await dispatch(getCategories());
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const updateCategory = createAsyncThunk<ICategoryDataDetail, Partial<ICategoryPayload>>("category/updateCategory", async (category, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosApp.put<ICategoryDataDetail>(`categories/${category.documentId}`, {
      data: {
        name: category.name,
        description: category.description
      }
    });
    await dispatch(getCategories());
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const deleteCategory = createAsyncThunk<void, string>("category/deleteCategory", async (id, { dispatch, rejectWithValue }) => {
  try {
    await axiosApp.delete<ICategory>(`categories/${id}`);
    await dispatch(getCategories());
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});