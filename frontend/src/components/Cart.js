import { useNavigate } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";
import CartItem from "./CartItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "./Modal";

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, total, clearCart } = useCartContext();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning("Your bag is empty!");
      return;
    }
    navigate("/login?redirect=/shipping");
  };
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ToastContainer />
      {/* Cart header */}
      <div className="flex items-center justify-between">
        <h3 className="uppercase text-xl font-medium">
          Cart ({cartItems.length})
        </h3>
        <button
          onClick={clearCart}
          className="text-gray-500 font-extralight underline"
        >
          Remove All
        </button>
      </div>

      {cartItems.length === 0 && (
        <div className="my-4 flex justify-center">
          <img src="/img/cart.webp" alt="" width={180} height={180} />
        </div>
      )}

      {/* Cart items */}
      {cartItems.map((item) => (
        <CartItem item={item} key={item.id * 2} />
      ))}

      {/* Cart total */}
      <div className="flex items-center justify-between my-4">
        <h4 className="text-gray-600 uppercase text-lg">Total</h4>
        <h4 className="text-lg font-medium">${total}</h4>
      </div>

      <button
        onClick={handleCheckout}
        className="inline-block w-full my-2 bg-black text-white font-mono uppercase shadow-sm rounded-sm py-2.5 px-4 hover:bg-gray-900"
      >
        {cartItems.length === 0 ? "No items in the list " : "Checkout"}
      </button>
    </Modal>
  );
};

export default Cart;
