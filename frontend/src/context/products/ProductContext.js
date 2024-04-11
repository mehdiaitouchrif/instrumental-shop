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
  const fetchProducts = async (options = {}) => {
    dispatch({ type: types.SET_LOADING });

    let apiUrl = `${API_URL}/api/products`;

    const { latest, limit, page, pageSize } = options;

    // Construct query parameters
    const queryParams = new URLSearchParams();
    if (latest && limit) {
      queryParams.append("latest", true);
      queryParams.append("limit", limit);
    }
    if (page && pageSize) {
      queryParams.append("page", page);
      queryParams.append("pageSize", pageSize);
    }
    if (queryParams.toString()) {
      apiUrl += `?${queryParams.toString()}`;
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
        credentials: "include",
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
      credentials: "include",
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
      credentials: "include",
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
      credentials: "include",
    });

    const { data } = await res.json();
    dispatch({ type: types.UPLOAD_MAIN_IMAGE, payload: data });
  };

  // Main image
  const uploadSecondaryImages = async (formdata) => {
    dispatch({ type: types.UPLOAD_SECONDARY_IMAGES_LOADING });
    const res = await fetch(`${API_URL}/api/uploads/secondary_images`, {
      method: "POST",
      body: formdata,
      credentials: "include",
    });

    const { data } = await res.json();
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
