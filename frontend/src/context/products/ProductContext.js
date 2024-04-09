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

  // Get products
  const fetchProducts = async (latest = false, limit = null) => {
    dispatch({ type: types.SET_LOADING });
    let apiUrl = `${API_URL}/api/products`;

    if (latest && limit) {
      apiUrl += `?latest=true&limit=${limit}`;
    }

    try {
      const res = await fetch(apiUrl);
      const { data } = await res.json();
      dispatch({ type: types.SET_PRODUCT_LIST, payload: data });
    } catch (error) {
      console.error("Error fetching products:", error);
      dispatch({ type: types.SET_ERROR, payload: error });
    }
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
  const uploadMainImage = async (formdata) => {
    dispatch({ type: types.UPLOAD_MAIN_IMAGE_LOADING });
    const res = await fetch(`${API_URL}/api/uploads/main_image`, {
      method: "POST",
      body: formdata,
      headers: {
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("instrumental_auth_token")
        )}`,
      },
    });

    const { data } = await res.json();
    console.log("Context", data);
    dispatch({ type: types.UPLOAD_MAIN_IMAGE, payload: data });
  };

  // Main image
  const uploadSecondaryImages = async (formdata) => {
    dispatch({ type: types.UPLOAD_SECONDARY_IMAGES_LOADING });
    const res = await fetch(`${API_URL}/api/uploads/secondary_images`, {
      method: "POST",
      body: formdata,
      headers: {
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("instrumental_auth_token")
        )}`,
      },
    });

    const { data } = await res.json();
    console.log("Context SECONDARY", data);
    dispatch({ type: types.UPLOAD_SECONDARY_IMAGES, payload: data });
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
        uploadSecondaryImages,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
