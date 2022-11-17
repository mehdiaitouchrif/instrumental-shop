import { Link } from "react-router-dom";
import { CiLogin, CiShoppingCart, CiUser } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user, loading, logout } = useAuthContext();
  return (
    <nav className="py-4 px-4 bg-black text-white font-mono mb-10">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <FaBars className="block md:hidden mr-4 cursor-pointer" />
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

        <div className="flex items-center gap-8">
          <button className="hover:text-orange-500">
            <CiShoppingCart size={24} />
          </button>
          {!user && !loading && (
            <Link to="/login" className="hover:text-orange-500">
              <CiLogin size={24} />
            </Link>
          )}
          {user && !loading && (
            <>
              <Link to="/account/dashboard" className="hover:text-orange-500">
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
    </nav>
  );
};

export default Navbar;
