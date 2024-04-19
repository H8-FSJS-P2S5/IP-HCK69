import { createSlice } from "@reduxjs/toolkit";
import { serverRequest } from "../../utils/axios";

const initialState = {
  detail: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    stateUser: (state, { payload }) => {
      state.detail = payload;
    },
    removeStateUser: (state) => {
      state.detail = null;
    },
  },
});

export const { stateUser } = userSlice.actions;

export function login(body) {
  return async () => {
    try {
      const { data } = await serverRequest.post("/users/login", body, {});

      localStorage.setItem("token", data.access_token);
    } catch (error) {
      console.log(error);
    }
  };
}

export function createUser(body) {
  return async () => {
    try {
      await serverRequest.post("/users/add-user", body, {});
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchUser() {
  return async (dispatch) => {
    try {
      const { data } = await serverRequest.get("/users", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });

      dispatch(stateUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateUser(body) {
  return async () => {
    try {
      await serverRequest.put("/users", body, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function patchUser() {
  return async () => {
    try {
      await serverRequest.patch("/users", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const userReducer = userSlice.reducer;
