import Home from "./Home"
import ErrorPage from "./ErrorPage";
import React from "react";
import App, { hightResImageLoader } from "../components/App"

const routes = [
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    loader: hightResImageLoader,
     HydrateFallback: () => null,
     children: [
        { index: true, element: <Home />},
    ],
  },
];

export default routes;