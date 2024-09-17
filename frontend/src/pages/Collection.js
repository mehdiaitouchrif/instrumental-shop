import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import { useCollectionContext } from "../hooks/useCollectionContext";
import CollectionPageLoadingSkeleton from "../components/CollectionPageLoadingSkeleton";

const Collection = () => {
  const { fetchCollectionProducts, collectionProducts, loading } =
    useCollectionContext();

  const params = useParams();

  useEffect(() => {
    fetchCollectionProducts(params.collection);

    // eslint-disable-next-line
  }, [params.collection]);

  return (
    <Layout>
      <Meta
        title={`${
          params.collection.charAt(0).toUpperCase() + params.collection.slice(1)
        } | Instrumental Shop`}
      />
      <div className="max-w-6xl mx-auto p-4">
        {loading &&
          [1, 2, 3].map((_, idx) => (
            <CollectionPageLoadingSkeleton idx={idx} />
          ))}
        {collectionProducts &&
          collectionProducts.map((product, idx) => (
            <CollectionProduct
              key={product._id}
              product={product}
              loading={loading}
              idx={idx}
              params={params}
            />
          ))}
      </div>
    </Layout>
  );
};

const CollectionProduct = ({ product, idx, params }) => {
  return (
    <div
      className="relative group grid grid-cols-1 md:grid-cols-2 gap-8 my-12"
      style={{ minHeight: "40px" }}
    >
      <div
        className={`flex items-center justify-center w-full p-4 ${
          idx % 2 === 0 ? "md:order-1" : "md:order-2"
        }`}
      >
        <div
          className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden"
          style={{ height: "400px" }}
        >
          <img
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            src={product.mainImage}
            alt={product.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30 transition-opacity duration-500 group-hover:opacity-40" />
        </div>
      </div>
      <div
        className={`flex flex-col justify-center p-4 ${
          idx % 2 !== 0 ? "md:order-1" : "md:order-2"
        }`}
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
          {product.name}
        </h2>
        <p className="text-xl font-bold text-gray-900 mb-4">
          ${product.price.toFixed(2)}
        </p>
        <Link
          to={`/${params.collection}/${product.slug}`}
          className="inline-block py-3 px-6 rounded-lg shadow-lg bg-orange-600 text-white font-medium uppercase hover:bg-orange-500 transition-colors duration-300"
        >
          See Product
        </Link>
      </div>
    </div>
  );
};

export default Collection;
