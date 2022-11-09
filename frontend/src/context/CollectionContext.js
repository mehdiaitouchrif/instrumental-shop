import { createContext, useReducer } from "react";
import * as types from "./types";

export const CollectionContext = createContext();

export const collectionReducer = (state, action) => {
  switch (action.type) {
    case types.SET_COLLECTIONS:
      return {
        collections: action.payload,
        loading: false,
      };
    case types.SET_LOADING:
      return {
        loading: true,
      };
    default:
      return state;
  }
};

const CollectionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(collectionReducer, {
    collections: [],
    loading: false,
  });

  return (
    <CollectionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionContextProvider;
