import { CartContext } from "../context/cart/CartContext";
import { useContext } from "react";

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw Error("useCartContext must be used inside an ACartContextProvider");
  }

  return context;
};
