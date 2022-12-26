import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import tralations from "./translation.json";

import "leaflet/dist/leaflet.css";
import "react-medium-image-zoom/dist/styles.css";
import "./index.css";

import App from "./App";
import Add from "./components/Add";
import Graveyards from "./components/Graveyards";
import Graveyard from "./components/Graveyard";
import Search from "./components/Search";

const router = createHashRouter([
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
  {
    path: "/search",
    element: <Search />,
  },
]);

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: tralations,
    lng: "pl", // if you're using a language detector, do not define the lng option
    fallbackLng: "pl",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

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