import { createBrowserRouter, Outlet, redirect } from "react-router-dom";

import {
  UserAddPage,
  UserLoginPage,
  UserUpdatePage,
  NovelPage,
  ReviewCreatePage,
  ReviewPage,
  MyReviewPage,
  MyReviewUpdatePage,
} from "../views";
import Layout from "../layouts/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    loader: () => {
      return localStorage.getItem("token") ? redirect("/jobs") : null;
    },
    children: [
      {
        path: "login",
        element: <UserLoginPage />,
      },
      {
        path: "add-user",
      },
    ],
  },
  {
    path: "/cms",
    element: <Layout />,
    loader: () => {
      return !localStorage.getItem("token") ? redirect("/login") : null;
    },
    children: [
      {
        path: "users",
        element: <Outlet />,
        children: [
          {
            path: "new",
            element: <UserAddPage />,
          },
          {
            path: "update",
            element: <UserUpdatePage />,
          },
        ],
      },
      {
        path: "novels",
        element: <NovelPage />,
      },
      {
        path: "reviews",
        element: <Outlet />,
        children: [
          {
            path: "new",
            element: <ReviewCreatePage />,
          },
          {
            path: "list",
            element: <ReviewPage />,
          },
          {
            path: "my",
            element: <MyReviewPage />,
          },
          {
            path: "my/:id",
            element: <MyReviewUpdatePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
