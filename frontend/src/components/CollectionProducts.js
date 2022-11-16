import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCollectionContext } from "../hooks/useCollectionContext";

const CollectionProducts = ({ collectionName }) => {
  const { loading, collectionProducts, fetchCollectionProducts } =
    useCollectionContext();

  useEffect(() => {
    fetchCollectionProducts(collectionName);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid grid-cols-3 gap-8 md:gap-16">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        collectionProducts &&
        collectionProducts.map((p) => (
          <div className="p-4">
            {console.log(collectionProducts)}
            <div
              key={p._id + 1}
              className="bg-gray-50 flex flex-col items-center justify-center p-4"
              style={{ height: 300, width: 300 }}
            >
              <img
                style={{
                  mixBlendMode: "multiply",
                  objectFit: "contain",
                }}
                className="block h-full w-2/4"
                src={p.mainImage}
                alt=""
              />
            </div>

            <div className="my-2 text-center p-4">
              <h2 className="uppercase text-xl text-gray-900 font-bold my-2">
                {p.name}
              </h2>
              <Link className="inline-block py-3 px-4 rounded-sm shadow my-2 text-white uppercase font-medium bg-orange-600 hover:bg-orange-500">
                See product
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CollectionProducts;
