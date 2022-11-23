import { createContext, useReducer } from "react";
import cartReducer from "./CartReducer";
import * as types from "../types";
import API_URL from "../../utils/setupApi";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const itemsFromLS = JSON.parse(localStorage.getItem("cartItems")) || [];
  const initialState = {
    cartItems: itemsFromLS,
    total: 0,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add to cart
  const addToCart = async (slug, qty) => {
    // Find product
    const res = await fetch(`${API_URL}/api/products/${slug}`);
    const { data } = await res.json();

    // Update state
    const cartItem = {
      pid: data._id,
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

  // Clear cart
  const clearCart = () => {
    localStorage.removeItem("cartItems");
    dispatch({ type: types.CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
