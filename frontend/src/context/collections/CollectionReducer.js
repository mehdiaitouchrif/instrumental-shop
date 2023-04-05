import * as types from "../types";

const collectionReducer = (state, action) => {
  switch (action.type) {
    case types.SET_COLLECTIONS:
      return {
        loading: false,
        collections: action.payload,
      };
    case types.SET_COLLECTION_PRODUCTS:
      return {
        loading: false,
        collectionProducts: action.payload.products,
        collectionSlug: action.payload.slug,
      };
    case types.SET_LOADING:
      return {
        loading: true,
      };
    default:
      return state;
  }
};

export default collectionReducer;
