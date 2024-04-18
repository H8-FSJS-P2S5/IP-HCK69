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
      await serverRequest.post("/users/add-user", body, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchUserById(id) {
  return async (dispatch) => {
    try {
      const { data } = await serverRequest.get("/users/" + id, {
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

export function updateUser(body, id) {
  return async () => {
    try {
      await serverRequest.put("/users/" + id, body, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function patchUser(body, id) {
  return async () => {
    try {
      await serverRequest.patch("/users/" + id, {
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
