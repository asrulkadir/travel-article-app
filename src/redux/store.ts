import { configureStore } from "@reduxjs/toolkit";
import articles from "./articles/slice";
import auth from "./auth/slice";
import category from "./category/slice";
import comment from "./comment/slice";
export const store = configureStore({
  reducer: {
    articles,
    auth,
    category,
    comment
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;