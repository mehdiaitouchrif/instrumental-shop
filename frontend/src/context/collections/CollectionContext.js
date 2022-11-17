import { createContext, useReducer } from "react";
import collectionReducer from "./CollectionReducer";
import * as types from "../types";
import API_URL from "../../utils/setupApi";

export const CollectionContext = createContext();

const CollectionContextProvider = ({ children }) => {
  const initialState = {
    collectionProducts: null,
    collections: null,
    loading: null,
    error: null,
  };

  const [state, dispatch] = useReducer(collectionReducer, initialState);

  // Get all collections
  const fetchCollections = async () => {
    dispatch({ type: types.SET_LOADING });
    const res = await fetch(`${API_URL}/api/collections`);
    const { success, data } = await res.json();

    if (success) {
      dispatch({ type: types.SET_COLLECTIONS, payload: data });
    }
  };

  // Get single collection/products
  const fetchCollectionProducts = async (slug) => {
    dispatch({ type: types.SET_LOADING });
    const res = await fetch(`${API_URL}/api/collections/${slug}`);
    const { data } = await res.json();

    dispatch({ type: types.SET_COLLECTION_PRODUCTS, payload: data });
  };

  return (
    <CollectionContext.Provider
      value={{
        ...state,
        fetchCollections,
        fetchCollectionProducts,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionContextProvider;
