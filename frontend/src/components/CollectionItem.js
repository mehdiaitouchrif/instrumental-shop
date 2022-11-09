import { Link } from "react-router-dom";

const CollectionItem = ({ collection }) => {
  return (
    <Link to={`/collections/${collection.slug}`}>
      <div className="rounded-2xl uppercase font-medium border border-gray-200 shadow-sm hover:shadow hover:border-gray-300">
        <div className="p-4 my-2 h-56 w-80 ">
          <img
            style={{ objectFit: "contain" }}
            className="block h-full w-full"
            src={collection.product.mainImage}
            alt=""
          />
        </div>
        <div className="mt-2 p-4 bg-gray-100 flex flex-col items-center justify-center rounded-2xl">
          <p className="text-xl">{collection.name}</p>
          <div className="text-gray-500 ">SHOP</div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionItem;
