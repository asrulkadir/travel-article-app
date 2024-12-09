import { createSlice } from "@reduxjs/toolkit";
import { createArticle, deleteArticle, fetchArticle, fetchArticles, updateArticle } from "./action";
import { IArticleState } from "./types";
// import { Dispatch } from "redux";

const initialState: IArticleState = {
  articles: {
    data: [],
    meta: {
      pagination: {
        page: 0,
        pageSize: 0,
        pageCount: 0,
        total: 0
      }
    }
  },
  article: {
    data: {

      id: 0,
      documentId: "",
      title: "",
      description: "",
      cover_image_url: "",
      createdAt: "",
      updatedAt: "",
      publishedAt: "",
      locale: null,
      comments: [],
      category: {
        id: 0,
        documentId: "",
        description: "",
        name: "",
        createdAt: "",
        updatedAt: "",
        publishedAt: "",
        locale: null
      }
    }
  },
  loading: false,
  error: null
};

export const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //  get articles
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'An error occurred';
    });

    // get article
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.article = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'An error occurred';
    });

    //  create article
    builder.addCase(createArticle.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createArticle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'An error occurred';
    });

    //  update article
    builder.addCase(updateArticle.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message ?? 'An error occurred';
    });

    //  delete article
    builder.addCase(deleteArticle.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'An error occurred';
    });
  }
});

export default articleSlice.reducer;
