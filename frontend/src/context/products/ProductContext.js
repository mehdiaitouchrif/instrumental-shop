import { createContext, useReducer } from "react";
import productReducer from "./ProductReducer";
import * as types from "../types";
import API_URL from "../../utils/setupApi";

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
    const res = await fetch(`${API_URL}/api/products`);
    const { data } = await res.json();

    dispatch({ type: types.SET_PRODUCT_LIST, payload: data });
  };

  // Get single product
  const fetchProduct = async (slug) => {
    dispatch({ type: types.SET_LOADING });
    const res = await fetch(`${API_URL}/api/products/${slug}`);
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
