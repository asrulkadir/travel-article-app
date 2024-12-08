import { createSlice } from "@reduxjs/toolkit";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "./action";
import { ICategoryState } from "./types";
// import { Dispatch } from "redux";

const initialState: ICategoryState = {
  categories: {
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
  category: {
    id: 0,
    documentId: "",
    name: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    publishedAt: "",
    locale: null
  },
  loading: false,
  error: null
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //  get categories
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });

    // get category
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.category = action.payload;
      state.loading = false;
      state.error = null;
    })
    builder.addCase(getCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });

    // create category
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.data.push(action.payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });

    // update category
    builder.addCase(updateCategory.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });

    // delete category
    builder.addCase(deleteCategory.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  }
});

export default categorySlice.reducer;
