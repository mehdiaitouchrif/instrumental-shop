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
      } else {
        itemsToStore = [...state.cartItems, item];
      }

      localStorage.setItem(
        "instrumental_cart_items",
        JSON.stringify(itemsToStore)
      );

      // Recalculate subtotal
      const subtotal = Number(
        itemsToStore
          .map((item) => item.price * item.qty)
          .reduce((partial, accum) => partial + accum, 0)
      ).toFixed(2);

      // Shipping price logic: free if subtotal > 1000, otherwise 20$
      const shippingPrice = subtotal > 1000 ? 0 : 20;

      // Tax is 20% of the subtotal (already included in price)
      const taxRate = 0.2;
      const taxPrice = Number(subtotal * taxRate).toFixed(2);

      // Final total
      const total = Number(subtotal) + Number(shippingPrice);

      return {
        ...state,
        cartItems: itemsToStore,
        subtotal,
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice,
        total: total.toFixed(2),
      };

    case types.CLEAR_CART:
      return { ...state, cartItems: [], total: 0 };
    case types.SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case types.SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
