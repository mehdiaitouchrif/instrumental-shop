import React from "react";
import ReactDOM from "react-dom/client";
import CollectionContextProvider from "./context/collections/CollectionContext";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CollectionContextProvider>
      <App />
    </CollectionContextProvider>
  </React.StrictMode>
);
