import { createBrowserRouter, redirect } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import NewsPage from "./pages/NewsPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/detail/:id",
            element: <Detail />,
          },
          {
            path: "/booking/:id",
            element: <Booking />,
          },
          {
            path: "/news",
            element: <NewsPage />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
        loader: () => {
          if (localStorage.access_token) {
            return redirect("/");
          }
          return null;
        },
      },
])

export default router;