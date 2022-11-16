import * as types from "../types";

const productReducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        loading: true,
      };
    case types.SET_PRODUCT_LIST:
      return {
        loading: false,
        products: action.payload,
      };
    case types.SET_PRODUCT:
      return {
        loading: false,
        product: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
