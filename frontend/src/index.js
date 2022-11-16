import React from "react";
import ReactDOM from "react-dom/client";
import CollectionContextProvider from "./context/collections/CollectionContext";
import "./index.css";
import App from "./App";
import ProductContextProvider from "./context/products/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductContextProvider>
      <CollectionContextProvider>
        <App />
      </CollectionContextProvider>
    </ProductContextProvider>
  </React.StrictMode>
);
