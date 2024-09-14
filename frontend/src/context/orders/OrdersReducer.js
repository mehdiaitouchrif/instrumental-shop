import * as types from "../types";

const ordersReducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return { ...state, loading: true, error: false, success: false };
    case types.CREATE_ORDER:
      return {
        ...state,
        order: action.payload,
        error: null,
        loading: false,
        isOrderCreated: true,
      };
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
    case types.GET_ALL_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        count: action.payload.count,
        page: action.payload.page,
        error: null,
        loading: false,
        success: true,
      };
    case types.DELETE_ORDER:
      return {
        ...state,
        loading: false,
        userOrders: state.userOrders.filter(
          (order) => order._id !== action.payload
        ),
      };
    case types.EXPAND_ORDER_TOGGLE:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload.orderId
            ? { ...order, expanded: !order.expanded }
            : order
        ),
      };
    case types.TOGGLE_DELIVERY_STATUS:
      const updatedOrders = state.orders.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
      return {
        ...state,
        orders: updatedOrders,
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
        isPaymentSuccessful: true,
        paymentLoading: false,
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
    case types.RESET_ORDERS_STATE:
      return {
        order: null,
        orders: null,
        userOrders: null,
        isOrderCreated: false,
        loading: false,
        success: false,
        error: null,
        paymentSuccess: false,
        paymentLoading: false,
      };
    default:
      return state;
  }
};

export default ordersReducer;
