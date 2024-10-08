import { Link } from "react-router-dom";
import { CiLogin, CiShoppingCart, CiUser } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import Cart from "./Cart";
import { useCartContext } from "../hooks/useCartContext";

const Navbar = () => {
  const { user, loading, logout } = useAuthContext();
  const { cartItems } = useCartContext();

  // Cart Modal state
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  // Dropdown menu state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="py-4 px-4 bg-black text-white font-mono ">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <FaBars
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="block md:hidden mr-4 cursor-pointer"
          />
          <Link to="/">
            <h1 className="text-2xl font-sans font-bold">instrumental</h1>
          </Link>
        </div>

        <div className="hidden md:flex items-center font-medium h-full gap-6">
          <Link to="/" className="inline-block uppercase hover:text-orange-500">
            Home
          </Link>
          <Link
            to="/guitars"
            className="inline-block uppercase hover:text-orange-500"
          >
            Guitars
          </Link>
          <Link
            to="/pianos"
            className="inline-block uppercase hover:text-orange-500"
          >
            Pianos
          </Link>
          <Link
            to="/drums"
            className="inline-block uppercase hover:text-orange-500"
          >
            Drums
          </Link>
        </div>

        {/* Cart Modal */}
        <Cart isOpen={isOpen} onClose={onClose} />

        <div className="flex items-center gap-4 md:gap-8">
          <button
            className="relative hover:text-orange-500"
            onClick={() => setIsOpen(true)}
          >
            <CiShoppingCart size={25} />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
          {!user && !loading && (
            <Link to="/login" className="hover:text-orange-500">
              <CiLogin size={24} />
            </Link>
          )}
          {user && !loading && (
            <>
              <Link
                to={user.role === "user" ? "/orders" : "/admin/products"}
                className="hover:text-orange-500"
              >
                <CiUser size={24} />
              </Link>
              <button
                className="uppercase white font-medium"
                onClick={() => logout()}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="flex flex-col md:hidden mt-2">
          <Link
            to="/"
            className="block py-2 px-4 uppercase hover:text-orange-500"
          >
            Home
          </Link>
          <Link
            to="/guitars"
            className="block py-2 px-4 uppercase hover:text-orange-500"
          >
            Guitars
          </Link>
          <Link
            to="/pianos"
            className="block py-2 px-4 uppercase hover:text-orange-500"
          >
            Pianos
          </Link>
          <Link
            to="/drums"
            className="block py-2 px-4 uppercase hover:text-orange-500"
          >
            Drums
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
