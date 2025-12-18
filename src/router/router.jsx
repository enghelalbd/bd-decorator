import React from "react";
import ReactDOM from "react-dom/client";
// import { createBrowserRouter } from "react-router";
// import { RouterProvider } from "react-router/dom";
import Coverage from "../Pages/Coverage";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
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
