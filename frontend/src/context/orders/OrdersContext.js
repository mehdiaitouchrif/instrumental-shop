import { createContext, useReducer } from "react";
import ordersReducer from "./OrdersReducer";
import * as types from "../types";
import API_URL from "../../utils/setupApi";

export const OrdersContext = createContext();

const OrderContextProvider = ({ children }) => {
  const initialState = {
    order: null,
    orders: null,
    userOrders: null,
    loading: false,
    success: false,
    error: null,
  };

  const [state, dispatch] = useReducer(ordersReducer, initialState);

  // Create order
  const createOrder = async (orderData) => {
    dispatch({ type: types.SET_LOADING });
    const res = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const { success, data, error } = await res.json();

    if (success) {
      dispatch({ type: types.CREATE_ORDER, payload: data });
    }

    if (error) {
      dispatch({ type: types.SET_ERROR, payload: error });
    }
  };

  // Get order by id
  const getOrder = async (id) => {
    dispatch({ type: types.SET_LOADING });
    const res = await fetch(`${API_URL}/api/orders/${id}`, {
      credentials: "include",
    });
    const { data, success, error } = await res.json();

    if (success) {
      dispatch({ type: types.SET_ORDER, payload: data });
    }

    if (error) {
      dispatch({ type: types.SET_ERROR, payload: error });
    }
  };

  // Fetch user orders
  const getUserOrders = async () => {
    dispatch({ type: types.SET_LOADING });
    const res = await fetch(`${API_URL}/api/orders/myorders`, {
      credentials: "include",
    });

    const { data, success, error } = await res.json();

    if (success) {
      dispatch({ type: types.SET_USER_ORDERS, payload: data });
    }
    if (error) {
      dispatch({ type: types.SET_ERROR, payload: error });
    }
  };

  // Create payment session with Stripe
  const createStripeSession = async (id) => {
    dispatch({ type: types.ORDER_PAY_LOADING });
    const res = await fetch(
      `${API_URL}/api/orders/${id}/create-stripe-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await res.json();
    window.location = data;
  };

  // Get paypal client id
  const getPaypalClientID = async () => {
    dispatch({ type: types.PAYPAL_CLIENT_ID_LOADING });
    const res = await fetch(`${API_URL}/api/config/paypal`);
    const data = await res.json();

    dispatch({ type: types.SET_PAYPAL_CLIENT_ID, payload: data });
  };

  // Update order to paid
  const updateToPaid = async (id) => {
    dispatch({ type: types.ORDER_PAY_LOADING });
    const res = await fetch(`${API_URL}/api/orders/${id}/pay`, {
      method: "PUT",
      credentials: "include",
    });

    const { data, success, error } = await res.json();

    if (success) {
      dispatch({ type: types.ORDER_PAY_SUCCESS, payload: data });
    }
    if (error) {
      dispatch({ type: types.SET_ERROR, payload: error });
    }
  };

  // Cancel order
  const deleteOrder = async (id) => {
    dispatch({ type: types.SET_LOADING });
    const res = await fetch(`${API_URL}/api/orders/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    await res.json();
    dispatch({ type: types.DELETE_ORDER, payload: id });
  };

  // Get all orders
  const getOrders = async (page = null, pageSize = null) => {
    let endpoint = `${API_URL}/api/orders`;

    if (page || pageSize) {
      endpoint += `?page=${page}&pageSize=${pageSize}`;
    }

    dispatch({ type: types.SET_LOADING });
    const res = await fetch(endpoint, {
      credentials: "include",
    });
    const { data, success, error } = await res.json();
    if (success) {
      dispatch({ type: types.GET_ALL_ORDERS, payload: data });
    }

    if (error) {
      dispatch({ type: types.SET_ERROR, payload: error });
    }
  };

  //  Handle order status (delivered / not delivered)
  const toggleDeliveryStatus = async (order) => {
    try {
      const res = await fetch(`${API_URL}/api/orders/${order._id}/deliver`, {
        method: "PUT",
        body: JSON.stringify({
          orderId: order._id,
          isDelivered: !order.isDelivered,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const { error, success, data } = await res.json();

      if (success) {
        dispatch({ type: types.TOGGLE_DELIVERY_STATUS, payload: data });
      }

      if (error) {
        dispatch({ type: types.SET_ERROR, payload: error });
      }
    } catch (error) {
      dispatch({ type: types.SET_ERROR, payload: error });
      console.error("Error updating order status:", error);
    }
  };

  const toggleOrderExpanded = (orderId) => {
    dispatch({ type: types.EXPAND_ORDER_TOGGLE, payload: { orderId } });
  };

  const resetOrderState = () => {
    dispatch({ type: types.RESET_ORDERS_STATE });
  };
  return (
    <OrdersContext.Provider
      value={{
        ...state,
        createOrder,
        getOrder,
        getUserOrders,
        createStripeSession,
        getPaypalClientID,
        updateToPaid,
        getOrders,
        toggleDeliveryStatus,
        toggleOrderExpanded,
        deleteOrder,
        resetOrderState,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrderContextProvider;
