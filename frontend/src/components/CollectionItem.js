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
        <Link
          to={`/${collection.slug}`}
          className="flex items-center justify-center mt-2 hover:text-orange-600"
        >
          <p className="text-sm font-medium text-gray-600 mx-2 hover:text-orange-600">
            Shop
          </p>
          <FaChevronRight />
        </Link>
      </div>
    </Link>
  );
};

export default CollectionItem;
