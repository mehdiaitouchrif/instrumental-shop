import React from "react";
import ReactDOM from "react-dom/client";
import CollectionContextProvider from "./context/collections/CollectionContext";
import "./index.css";
import App from "./App";
import ProductContextProvider from "./context/products/ProductContext";
import { AuthContextProvider } from "./context/auth/AuthContext";
import CartContextProvider from "./context/cart/CartContext";
import OrderContextProvider from "./context/orders/OrdersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <OrderContextProvider>
            <CollectionContextProvider>
              <App />
            </CollectionContextProvider>
          </OrderContextProvider>
        </CartContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
