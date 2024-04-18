import { createSlice } from "@reduxjs/toolkit";
import { serverRequest } from "../../utils/axios";

const initialState = {
  list: [],
  detail: null,
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    stateBulkReview: (state, { payload }) => {
      state.list = payload;
    },
    stateReview: (state, { payload }) => {
      state.detail = payload;
    },
    removeStateReview: (state) => {
      state.detail = null;
    },
  },
});

export const { stateBulkReview, stateReview } = reviewSlice.actions;

export function fetchReview() {
  return async (dispatch) => {
    try {
      const { data } = await serverRequest.get("/reviews", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });

      dispatch(stateBulkReview(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchReviewById(id) {
  return async (dispatch) => {
    try {
      const { data } = await serverRequest.get("/reviews/" + id, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });

      dispatch(stateReview(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function createReview(body) {
  return async () => {
    try {
      await serverRequest.post("/reviews", body, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateReview(body, id) {
  return async () => {
    try {
      await serverRequest.put("/reviews/" + id, body, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteReview(id) {
  return async () => {
    try {
      await serverRequest.delete("/reviews/" + id, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const reviewReducer = reviewSlice.reducer;
