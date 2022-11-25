import * as types from "../types";

const ordersReducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return { ...state, loading: true, error: false, success: false };
    case types.CREATE_ORDER:
    case types.SET_ORDER:
      return {
        ...state,
        order: action.payload,
        error: null,
        loading: false,
        success: true,
      };
    case types.SET_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload,
        error: null,
        loading: false,
        success: true,
      };
    case types.ORDER_PAY_LOADING:
      return {
        ...state,
        paymentLoading: true,
        error: null,
      };
    case types.ORDER_PAY_SUCCESS:
      return {
        ...state,
        paymentSuccess: true,
        order: action.payload,
      };
    case types.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
        paymentSuccess: false,
        paymentLoading: false,
      };
    default:
      return state;
  }
};

export default ordersReducer;
