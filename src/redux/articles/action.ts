import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApp, { handleAxiosError } from "../../utils/axios";
import { IArticle, IArticleData, IArticlePayload } from "./types";

export const fetchArticles = createAsyncThunk<IArticleData, string | undefined>("articles/fetchAllArticles", async (params) => {
  try {
    const response = await axiosApp.get(`articles${params ? `?${params}` : ""}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});

export const fetchArticle = createAsyncThunk<IArticle, string>("articles/fetchArticle", async (id) => {
  try {
    const response = await axiosApp.get(`articles/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});

const uploadImage = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append("files", image);

  const responseUpload = await axiosApp.post(`upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
  });

  return responseUpload.data?.[0]?.url || '';
};

export const createArticle = createAsyncThunk<IArticle, { article: Partial<IArticlePayload>, params: string }>(
  "articles/createArticle",
  async ({ article, params }, { dispatch }) => {
    try {
      let coverImageUrl = '';
      if (article.image && article.image.length > 0 && article.image[0]) {
        coverImageUrl = await uploadImage(article.image[0]);
      }

      const response = await axiosApp.post(`articles`, {
        data: {
          title: article.title,
          description: article.description,
          category: article.category,
          cover_image_url: coverImageUrl,
        }
      });

      alert('Article created successfully');

      await dispatch(fetchArticles(params));
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);

export const updateArticle = createAsyncThunk<IArticle, { article: Partial<IArticlePayload>, id: string }>("articles/updateArticle", async ({article, id}) => {
  try {
    let coverImageUrl = '';
    if (article.image && article.image.length > 0 && article.image[0]) {
      coverImageUrl = await uploadImage(article.image[0]);
    }

    const response = await axiosApp.put(`${id}`, {
      data: {
        title: article.title,
        description: article.description,
        category: article.category,
        cover_image_url: coverImageUrl ? coverImageUrl : article.cover_image_url,
      }
    });
    alert('Article updated successfully');
    window.location.reload();
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});

export const deleteArticle = createAsyncThunk<IArticle, string>("articles/deleteArticle", async (id) => {
  try {
    const response = await axiosApp.delete(`articles/${id}`);
    alert('Article deleted successfully');
    window.location.reload();
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});