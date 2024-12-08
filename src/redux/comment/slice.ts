import { createSlice } from "@reduxjs/toolkit";
import { createComment, deleteComment, getComments, getComment, updateComment } from "./action";
import { ICommentState } from "./types";

const initialState: ICommentState = {
  comments: {
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
  comment: {
    id: 0,
    documentId: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    publishedAt: "",
    locale: null,
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
  },
  loading: false,
  error: null,
  loadingUpdate: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //  get comments
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });

    // get comment
    builder.addCase(getComment.fulfilled, (state, action) => {
      state.comment = action.payload;
      state.loading = false;
      state.error = null;
    })
    builder.addCase(getComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });

    // create comment
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.comments.data.push(action.payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });

    // update comment
    builder.addCase(updateComment.fulfilled, (state) => {
      state.loadingUpdate = false;
      state.error = null;
    });
    builder.addCase(updateComment.pending, (state) => {
      state.loadingUpdate = true;
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.loadingUpdate = false;
      state.error = action.error.message || null;
    });

    // delete comment
    builder.addCase(deleteComment.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  }
});

export default commentSlice.reducer;
