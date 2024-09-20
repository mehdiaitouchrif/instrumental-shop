import React from "react";
import ReactDOM from "react-dom/client";
import CollectionContextProvider from "./context/collections/CollectionContext";
import App from "./App";
import ProductContextProvider from "./context/products/ProductContext";
import { AuthContextProvider } from "./context/auth/AuthContext";
import CartContextProvider from "./context/cart/CartContext";
import OrderContextProvider from "./context/orders/OrdersContext";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";
import "swiper/css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { register } from "swiper/element/bundle";
import { HelmetProvider } from "react-helmet-async";
// register Swiper custom elements
register();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <OrderContextProvider>
            <CollectionContextProvider>
              <PayPalScriptProvider deferLoading={true}>
                <HelmetProvider>
                  <App />
                </HelmetProvider>
              </PayPalScriptProvider>
            </CollectionContextProvider>
          </OrderContextProvider>
        </CartContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
