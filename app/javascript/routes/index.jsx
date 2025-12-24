import React from "react";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import App, { hightResImageLoader } from "../components/App";
import Game from "./Game";
const routes = [
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    loader: hightResImageLoader,
     HydrateFallback: () => null,
     children: [
        { index: true, element: <Home />},
        { path: "/games/:id", element: <Game />},
    ],
  },
];

export default routes;