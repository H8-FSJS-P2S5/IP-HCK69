import { createSlice } from "@reduxjs/toolkit";
import { serverRequest } from "../../utils/axios";

const initialState = {
  list: [],
  detail: null,
};

export const manhwaSlice = createSlice({
  name: "manhwa",
  initialState,
  reducers: {
    stateBulkManhwa: (state, { payload }) => {
      state.list = payload;
    },
    stateManhwa: (state, { payload }) => {
      state.detail = payload;
    },
    removeStateManhwa: (state) => {
      state.detail = null;
    },
  },
});

export const { stateBulkManhwa, stateManhwa } = manhwaSlice.actions;

export function fetchManhwa() {
  return async (dispatch) => {
    try {
      const { data } = await serverRequest.get("/manhwa", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });

      dispatch(stateBulkManhwa(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchManhwaById(id) {
  return async (dispatch) => {
    try {
      const { data } = await serverRequest.get("/manhwa/" + id, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });

      dispatch(stateManhwa(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function createManhwa(body) {
  return async () => {
    try {
      await serverRequest.post("/manhwa", body, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const manhwaReducer = manhwaSlice.reducer;
