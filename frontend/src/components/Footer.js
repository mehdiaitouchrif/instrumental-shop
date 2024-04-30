import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black p-8 text-white w-full mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="my-2">
            <h2 className="text-2xl font-bold mb-4">instrumental</h2>
            <p className="my-4">
              Demo full-featured web shop app using fullstack JS & MongoDB.
            </p>
          </div>
          <div className="my-2 md:ml-auto">
            <div className="flex items-center gap-6 my-2 font-mono font-medium">
              <Link
                to="/"
                className="inline-block uppercase hover:text-orange-500"
              >
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
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-500"
              >
                <FaFacebookSquare size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-500"
              >
                <FaTwitterSquare size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-500"
              >
                <FaInstagramSquare size={24} />
              </a>
            </div>
          </div>
        </div>

        <p className="my-4">Copyright &copy; 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
