import { configureStore } from "@reduxjs/toolkit";
import { reviewReducer } from "./features/review/reviewSlice";
import { manhwaReducer } from "./features/manhwa/manhwaSlice";
import { userReducer } from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    reviews: reviewReducer,
    manhwas: manhwaReducer,
  },
});
