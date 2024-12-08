import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApp, { handleAxiosError } from "../../utils/axios";
import { ICategory, ICategoryData, ICategoryPayload } from "./types";

export const getCategories = createAsyncThunk<ICategoryData, string | undefined>("category/getCategories", async () => {
  try {
    const response = await axiosApp.get(`categories`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});

export const getCategory = createAsyncThunk<ICategory, string>("category/getCategory", async (id) => {
  try {
    const response = await axiosApp.get(`categories/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});

export const createCategory = createAsyncThunk<ICategory, Partial<ICategoryPayload>>("category/createCategory", async (category, { dispatch }) => {
  try {
    const response = await axiosApp.post(`categories`, {
      data: {
        name: category.name,
        description: category.description
      }
    });
    dispatch(getCategories());
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});

export const updateCategory = createAsyncThunk<ICategory, Partial<ICategoryPayload>>("category/updateCategory", async (category, { dispatch }) => {
  try {
    const response = await axiosApp.put(`categories/${category.documentId}`, {
      data: {
        name: category.name,
        description: category.description
      }
    });
    dispatch(getCategories());
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});

export const deleteCategory = createAsyncThunk<ICategory, string>("category/deleteCategory", async (id, { dispatch }) => {
  try {
    const response = await axiosApp.delete(`categories/${id}`);
    dispatch(getCategories());
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});