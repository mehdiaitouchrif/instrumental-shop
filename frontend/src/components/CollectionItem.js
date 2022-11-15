import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const CollectionItem = ({ collection }) => {
  return (
    <Link to={`/${collection.slug}`} className="inline-block mt-24 md:mt-32">
      <div className="bg-gray-100 h-44 p-8 uppercase rounded text-center relative">
        <div
          className="mx-auto h-40 w-40 text-center absolute -top-28"
          style={{ left: 0, right: 0 }}
        >
          <img
            src={collection.product.mainImage}
            style={{ mixBlendMode: "multiply", objectFit: "contain" }}
            className="inline-block h-full w-full"
            alt=""
          />
        </div>
        <h1 className="text-xl font-medium mt-8">{collection.name}</h1>
        <Link to={`/${collection.slug}`} className="mt-2">
          <p className="flex items-center justify-center text-sm font-medium text-gray-600 hover:text-orange-600">
            <span className="mx-2">Shop</span>
            <FaChevronRight />
          </p>
        </Link>
      </div>
    </Link>
  );
};

export default CollectionItem;
