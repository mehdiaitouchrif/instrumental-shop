import * as types from "../types";

const cartReducer = (state, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      const item = action.payload;
      let itemsToStore;

      const existItem = state.cartItems.find((i) => i.pid === item.pid);
      if (existItem) {
        itemsToStore = state.cartItems.map((i) =>
          i.pid === existItem.pid ? item : i
        );
        localStorage.setItem("cartItems", JSON.stringify(itemsToStore));
        return {
          ...state,
          cartItems: itemsToStore,
          total: Number(
            itemsToStore
              .map((item) => item.price * item.qty)
              .reduce((partial, accum) => partial + accum, 0)
          ).toFixed(2),
        };
      } else {
        itemsToStore = [...state.cartItems, item];
        localStorage.setItem("cartItems", JSON.stringify(itemsToStore));
        return {
          ...state,
          cartItems: itemsToStore,
          total: Number(
            itemsToStore
              .map((item) => item.price)
              .reduce((partial, accum) => partial + accum, 0)
          ).toFixed(2),
        };
      }
    case types.CLEAR_CART:
      return { ...state, cartItems: [], total: 0 };
    default:
      return state;
  }
};

export default cartReducer;
