import { createContext, useReducer } from "react";
import cartReducer from "./CartReducer";
import * as types from "../types";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const itemsFromLS =
    JSON.parse(localStorage.getItem("instrumental_cart_items")) || [];
  const initialState = {
    cartItems: itemsFromLS,
    total:
      Number(
        itemsFromLS
          .map((item) => item.price)
          .reduce((partial, accum) => partial + accum, 0)
      ).toFixed(2) || 0,
    shippingAddress:
      JSON.parse(localStorage.getItem("instrumental_shipping_address")) || {},
    paymentMethod:
      JSON.parse(localStorage.getItem("instrumental_payment_method")) ||
      "PayPal",
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (data, qty) => {
    // Update state
    const cartItem = {
      fullData: data,
      pid: data._id,
      product: data._id,
      slug: data.slug,
      name: data.name,
      image: data.mainImage,
      price: data.price,
      qty,
    };
    dispatch({
      type: types.ADD_TO_CART,
      payload: cartItem,
    });
  };

  // Save shipping address
  const saveShippingAddress = (data) => {
    localStorage.setItem("instrumental_shipping_address", JSON.stringify(data));
    dispatch({ type: types.SAVE_SHIPPING_ADDRESS, payload: data });
  };

  // Save payment method
  const savePaymentMethod = (method) => {
    localStorage.setItem("instrumental_payment_method", JSON.stringify(method));
    dispatch({ type: types.SAVE_PAYMENT_METHOD, payload: method });
  };

  // Clear cart
  const clearCart = () => {
    localStorage.removeItem("instrumental_cart_items");
    dispatch({ type: types.CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        clearCart,
        saveShippingAddress,
        savePaymentMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
