import { createContext, useReducer } from "react";
import productReducer from "./ProductReducer";
import * as types from "../types";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const initialState = {
    products: null,
    product: null,
    loading: null,
    error: null,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  // Get last products
  const fetchProducts = async () => {
    dispatch({ type: types.SET_LOADING });
    const res = await fetch(`http://localhost:5000/api/products`);
    const { data } = await res.json();

    dispatch({ type: types.SET_PRODUCT_LIST, payload: data });
  };

  // Get single product
  const fetchProduct = async (slug) => {
    dispatch({ type: types.SET_LOADING });
    const res = await fetch(`http://localhost:5000/api/products/${slug}`);
    const { data } = await res.json();

    dispatch({ type: types.SET_PRODUCT, payload: data });
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        fetchProduct,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
