import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { Home } from "./components/Home.jsx";
import { MovieDetail } from "./components/MovieDetail.jsx";
import { ErrorPage } from "./components/ErrorPage.jsx";
import { Search } from "./components/Search.jsx";
import { Category } from "./components/Category.jsx";

import { createBrowserRouter, RouterProvider } from "react-router";

// 페이지 경로 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "movie/:id", element: <MovieDetail /> },
      { path: "search", element: <Search /> },
      { path: "category/:type", element: <Category /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
