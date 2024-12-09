import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApp, { handleAxiosError } from "../../utils/axios";
import { IArticleData, IArticleDataDetail, IArticlePayload } from "./types";

export const fetchArticles = createAsyncThunk<IArticleData, string | undefined>("articles/fetchAllArticles", async (params, { rejectWithValue }) => {
  try {
    const response = await axiosApp.get<IArticleData>(`articles${params ? `?${params}` : ""}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const fetchArticle = createAsyncThunk<IArticleDataDetail, string>("articles/fetchArticle", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosApp.get<IArticleDataDetail>(`articles/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

interface UploadResponse {
  data: { url: string }[];
  length: number;
  [index: number]: { url: string };
}

const uploadImage = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append("files", image);

  const responseUpload = await axiosApp.post<UploadResponse>(`upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
  });

  return responseUpload.data && responseUpload.data.length > 0 ? responseUpload.data[0].url : '';
};

export const createArticle = createAsyncThunk<IArticleDataDetail, { article: Partial<IArticlePayload>, params: string }>(
  "articles/createArticle",
  async ({ article, params }, { dispatch, rejectWithValue }) => {
    try {
      let coverImageUrl = '';
      if (article.image && article.image.length > 0 && article.image[0]) {
        coverImageUrl = await uploadImage(article.image[0]);
      }

      const response = await axiosApp.post<IArticleDataDetail>(`articles`, {
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
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const updateArticle = createAsyncThunk<IArticleDataDetail, { article: Partial<IArticlePayload>, id: string }>("articles/updateArticle", async ({article, id}, { rejectWithValue }) => {
  try {
    let coverImageUrl = '';
    if (article.image && article.image.length > 0 && article.image[0]) {
      coverImageUrl = await uploadImage(article.image[0]);
    }

    const response = await axiosApp.put<IArticleDataDetail>(`${id}`, {
      data: {
        title: article.title,
        description: article.description,
        category: Number(article.category),
        cover_image_url: coverImageUrl ? coverImageUrl : article.cover_image_url,
      }
    });
    alert('Article updated successfully');
    window.location.reload();
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const deleteArticle = createAsyncThunk<void, string>("articles/deleteArticle", async (id, {rejectWithValue}) => {
  try {
    await axiosApp.delete(`articles/${id}`);
    alert('Article deleted successfully');
    window.location.reload();
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});