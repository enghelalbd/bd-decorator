import React from "react";
import ReactDOM from "react-dom/client";
// import { createBrowserRouter } from "react-router";
// import { RouterProvider } from "react-router/dom";
import Coverage from "../Pages/Coverage";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "coverage",
    Component: Coverage,
    loader: () => fetch("/Servicecenter.json").then((res) => res.json()),
  },
]);

// const root = document.getElementById("root");

// ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
export default router;
