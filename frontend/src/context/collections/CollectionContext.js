import { createContext, useReducer } from "react";
import collectionReducer from "./CollectionReducer";
import * as types from "../types";

export const CollectionContext = createContext();

const CollectionContextProvider = ({ children }) => {
  const initialState = {
    collections: null,
    collectionProducts: null,
    loading: null,
    error: null,
  };

  const [state, dispatch] = useReducer(collectionReducer, initialState);

  // Get all collections
  const fetchCollections = async () => {
    dispatch({ type: types.SET_LOADING });
    const res = await fetch("http://localhost:5000/api/collections");
    const { success, data } = await res.json();

    if (success) {
      dispatch({ type: types.SET_COLLECTIONS, payload: data });
    }
  };

  // Get single collection/products
  const fetchCollectionProducts = async (slug) => {
    dispatch({ type: types.SET_LOADING });
    const res = await fetch(`http://localhost:5000/api/collections/${slug}`);
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
