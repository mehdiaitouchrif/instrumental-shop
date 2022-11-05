import { Link } from "react-router-dom";
import { FaShoppingCart, FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="py-4 px-8 bg-gray-900 text-white font-mono mb-10">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="cursor-pointer">
          <h1 className="text-2xl font-bold hover:text-orange-500">
            instrumental
          </h1>
        </Link>

        <div className="flex items-center font-bold h-full gap-6">
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

        <div className="flex items-center gap-8">
          <Link to="/cart" className="hover:text-orange-500">
            {" "}
            <FaShoppingCart size={24} />
          </Link>
          <Link to="/login" className="hover:text-orange-500">
            {" "}
            <FaSignInAlt size={24} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
