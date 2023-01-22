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

  // Create product
  const createProduct = async (product, collectionRef) => {
    const res = await fetch(
      `${API_URL}/api/collections/${collectionRef}/products`,
      {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",

          authorization: `Bearer ${JSON.parse(
            localStorage.getItem("instrumental_auth_token")
          )}`,
        },
      }
    );

    const { data, success, error } = await res.json();
    if (success) {
      dispatch({ type: types.CREATE_PRODUCT, payload: data });
    }
    if (error) {
      dispatch({ type: types.SET_ERROR, payload: error });
    }
  };

  // Update product
  const updateProduct = async (id, updates) => {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("instrumental_auth_token")
        )}`,
      },
    });
    const { data, success, error } = await res.json();
    if (success) {
      dispatch({ type: types.UPDATE_PRODUCT, payload: data });
    }
    if (error) {
      dispatch({ type: types.SET_ERROR, payload: error });
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("instrumental_auth_token")
        )}`,
      },
    });
    await res.json();
    dispatch({ type: types.DELETE_PRODUCT, payload: id });
  };

  // Main image
  const uploadMainImage = async (id, formdata) => {
    dispatch({ type: types.SET_LOADING });
    const res = await fetch(`${API_URL}/api/products/${id}/main_image`, {
      method: "PUT",
      body: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("instrumental_auth_token")
        )}`,
      },
    });

    const { data } = await res.json();
    dispatch({ type: types.UPLOAD_MAIN_IMAGE, payload: data });
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        fetchProduct,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        uploadMainImage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
