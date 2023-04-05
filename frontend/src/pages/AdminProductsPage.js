import { useEffect } from "react";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { useProductContext } from "../hooks/useProductContext";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProductsPage = () => {
  const { fetchProducts, deleteProduct, products, loading, error } =
    useProductContext();

  useEffect(() => {
    fetchProducts();

    if (error) {
      toast.error("Something Went Wrong!");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <ToastContainer />
      <Meta title="Admin Dashboard | Instrumental Shop" />
      <div className="max-w-7xl mx-auto md:my-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
          <div className="py-4 px-8 md:border-r text-center md:text-left border-r-gray-200">
            <h1
              className="text-4xl font-medium my-4"
              style={{ color: "#153a5b" }}
            >
              Products management
            </h1>
            <p className="text-gray-500 my-2">
              "Manage products, create, update and delete.
            </p>
          </div>

          <div className="col-span-2 py-4 px-8">
            <div className="flex gap-x-8 justify-center">
              <Link to="/admin/orders">
                <button className="text-gray-600">Orders</button>
              </Link>
              <Link to="/admin/products">
                <button className="text-gray-600 underline">Products</button>
              </Link>
            </div>
            <div className="md:p-8 mt-8 mb-16">
              {/* Create Product */}
              <Link
                className="inline-block mb-10 rounded shadow-sm bg-gray-50 border text-orange-600 font-medium py-2 px-4 uppercase hover:bg-gray-100"
                to="/admin/add-product"
              >
                Add new product
              </Link>
              {loading && <Spinner />}
              {products &&
                products.map((prod) => (
                  <div
                    key={prod._id}
                    className="flex py-2 shadow-sm mb-2 border-b border-gray-100 items-center justify-between"
                  >
                    {/* Image */}
                    <div className="w-14 h-14">
                      <img
                        className="w-full h-full object-contain"
                        src={prod.mainImage}
                        alt={`${prod.name} main`}
                      />
                    </div>
                    {/* Title */}
                    <Link
                      to={`/${prod.collectionRef.name}/${prod.slug}`}
                      className="w-2/3 hover:underline hover:text-orange-600"
                    >
                      {prod.name}{" "}
                    </Link>
                    <Link
                      to={`/admin/edit-product/${prod.slug}`}
                      className="inline-block py-2 px-4 mx-2 bg-orange-400 hover:bg-orange-500 text-white shadow-sm rounded text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(prod._id)}
                      className="inline-block py-2 px-4 rounded shadow-sm hover:bg-red-600 hover:text-white text-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProductsPage;
