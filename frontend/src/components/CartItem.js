import React, { useEffect, useState } from "react";
import { useCartContext } from "../hooks/useCartContext";

const CartItem = ({ item }) => {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(+item.qty);

  const handleQuantity = (add, substract) => {
    if (add) {
      setQuantity((qty) => qty + 1);
    }
    if (substract) {
      setQuantity((qty) => {
        if (qty === 1) {
          return qty;
        }
        return qty - 1;
      });
    }
  };

  useEffect(() => {
    addToCart(item.fullData, quantity);
    // eslint-disable-next-line
  }, [quantity, item.slug]);

  return (
    <div
      key={item.pid * 2}
      className="flex items-center justify-between gap-8 mt-4"
    >
      <div className="flex items-center gap-4 my-2">
        <div
          style={{ width: 70, height: 70 }}
          className="bg-gray-50 border rounded shadow-sm flex items-center justify-center"
        >
          <img
            className="object-contain w-full h-4/5 mix-blend-multiply"
            src={item.image}
            alt=""
          />
        </div>
        <div>
          <h4 className="font-medium my-2 w-40">{item.name}</h4>
          <h4 className="font-medium text-gray-600">${item.price}</h4>
        </div>
      </div>
      <div className="flex flex-col">
        <button
          onClick={() => handleQuantity(null, true)}
          className="w-9 py-2 px-2 cursor-pointer shadow-sm bg-gray-100 border-b-2 hover:bg-gray-200"
        >
          -
        </button>
        <div className="w-9 py-2 px-2 bg-gray-50 shadow-sm text-center border-b-2">
          {item.qty}
        </div>
        <button
          onClick={() => handleQuantity(true, null)}
          className="w-9 py-2 px-2 cursor- shadow-sm bg-gray-100 hover:bg-gray-200"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
