import { configureStore } from "@reduxjs/toolkit";
import { reviewReducer } from "./features/review/reviewSlice";
import { manhwaReducer } from "./features/manhwa/manhwaSlice";

export const store = configureStore({
  reducer: {
    reviews: reviewReducer,
    manhwas: manhwaReducer,
  },
});
