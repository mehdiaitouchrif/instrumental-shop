import { Link } from "react-router-dom";
import { CiLogin, CiShoppingCart } from "react-icons/ci";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="py-4 px-8 bg-black text-white font-mono mb-10">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <FaBars className="block md:hidden mr-8 cursor-pointer" />
          <a href="/">
            <h1 className="text-2xl font-sans font-bold">instrumental</h1>
          </a>
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

        <div className="flex items-center gap-8">
          <Link to="/cart" className="hover:text-orange-500">
            <CiShoppingCart size={24} />
          </Link>
          <Link to="/login" className="hover:text-orange-500">
            <CiLogin size={24} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
