import * as types from "../types";

const productReducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        loading: true,
      };
    case types.SET_ERROR:
      return {
        loading: false,
        error: action.payload,
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
    case types.CREATE_PRODUCT:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case types.UPDATE_PRODUCT:
      return {
        loading: false,
        product: action.payload,
        success: true,
      };
    case types.DELETE_PRODUCT:
      return {
        ...state,
        loading: false,
        products: state.products.filter((prod) => prod._id !== action.payload),
      };
    case types.UPLOAD_MAIN_IMAGE:
      return {
        product: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
