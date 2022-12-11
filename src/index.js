import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import "leaflet/dist/leaflet.css";
import "./index.css";

import App from "./App";
import Add from "./components/Add";
import Graveyards from "./components/Graveyards";
import Graveyard from "./components/Graveyard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/graveyards",
    element: <Graveyards />,
  },
  {
    path: "/graveyard/:graveyardId",
    element: <Graveyard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
