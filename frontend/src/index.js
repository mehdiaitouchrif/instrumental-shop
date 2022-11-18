import React from "react";
import ReactDOM from "react-dom/client";
import CollectionContextProvider from "./context/collections/CollectionContext";
import "./index.css";
import App from "./App";
import ProductContextProvider from "./context/products/ProductContext";
import { AuthContextProvider } from "./context/auth/AuthContext";
import CartContextProvider from "./context/cart/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <CollectionContextProvider>
            <App />
          </CollectionContextProvider>
        </CartContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
