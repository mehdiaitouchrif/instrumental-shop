import { OrdersContext } from "../context/orders/OrdersContext";
import { useContext } from "react";

const useOrdersContext = () => {
  const context = useContext(OrdersContext);

  if (!context) {
    throw Error(
      "useOrdersContext must be used inside an OrdersContextProvider"
    );
  }

  return context;
};

export default useOrdersContext;
