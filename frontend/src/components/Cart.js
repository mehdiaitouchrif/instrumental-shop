import { useCartContext } from "../hooks/useCartContext";

import Modal from "./Modal";

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, total, clearCart } = useCartContext();

  return (
    <Modal open={isOpen} onClose={onClose}>
      {/* Cart header */}
      <div className="flex items-center justify-between">
        <h3 className="uppercase text-xl font-medium">
          Cart ({cartItems.length})
        </h3>
        <button
          onClick={clearCart}
          className="text-gray-500 font-thin underline"
        >
          Remove All
        </button>
      </div>

      {cartItems.length === 0 && (
        <div className="my-4 flex justify-center">
          <iframe
            title="random gif"
            src="https://giphy.com/embed/nKERd2uhn8hhe"
            width="180"
            height="180"
            style={{ pointerEvents: "none", border: "0px" }}
          ></iframe>
        </div>
      )}

      {/* Cart items */}
      {cartItems.map((item) => (
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
          <div className="flex">
            <button className="w-9 py-2 px-2 cursor-pointer shadow-sm bg-gray-50 hover:bg-gray-100">
              -
            </button>
            <div className="w-9 py-2 px-2 bg-gray-50 shadow-sm">{item.qty}</div>
            <button className="w-9 py-2 px-2 cursor- shadow-sm bg-gray-50 hover:bg-gray-100">
              +
            </button>
          </div>
        </div>
      ))}

      {/* Cart total */}
      <div className="flex items-center justify-between my-4">
        <h4 className="text-gray-600 uppercase text-lg">Total</h4>
        <h4 className="text-lg font-medium">${total}</h4>
      </div>

      <button className="inline-block w-full my-2 bg-black text-white font-mono uppercase shadow-sm rounded-sm py-2.5 px-4 hover:bg-gray-900">
        {cartItems.length === 0 ? "No items in the list " : "Checkout"}
      </button>
    </Modal>
  );
};

export default Cart;
