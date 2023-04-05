import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import { useCollectionContext } from "../hooks/useCollectionContext";
import Spinner from "../components/Spinner";

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
        {loading ? (
          <Spinner />
        ) : (
          collectionProducts &&
          collectionProducts.map((product, idx) => (
            <div
              key={product._id}
              className="grid grid-cols-1 md:grid-cols-2 gap-16 my-12"
            >
              <div
                className={`bg-gray-50 flex flex-col items-center justify-center p-4 ${
                  idx % 2 === 0 && "md:order-1"
                }`}
                style={{ height: 500 }}
              >
                <img
                  style={{ mixBlendMode: "multiply", objectFit: "contain" }}
                  className="block h-full w-2/3"
                  src={product.mainImage}
                  alt=""
                />
              </div>
              <div
                className={`flex flex-col justify-center ${
                  idx % 2 !== 0 && "md:order-2"
                }`}
              >
                <h2 className="text-2xl uppercase font-medium">
                  {product.name}
                </h2>
                <p className="text-gray-700 font-thin my-4">
                  {product.features}
                </p>
                <Link
                  to={`/${params.collection}/${product.slug}`}
                  className="inline-block w-fit py-2 px-4 rounded-sm shadow-sm bg-orange-600 text-white font-medium uppercase hover:bg-orange-500"
                >
                  See Product
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Collection;
