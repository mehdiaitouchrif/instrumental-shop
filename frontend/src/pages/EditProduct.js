import Layout from "../components/Layout";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Meta from "../components/Meta";
import { FiDelete } from "react-icons/fi";
import { useProductContext } from "../hooks/useProductContext";
import { useCollectionContext } from "../hooks/useCollectionContext";
import { useEffect } from "react";

const EditProduct = () => {
  const { slug } = useParams();

  // State
  const { fetchCollections, collections } = useCollectionContext();
  const { fetchProduct, updateProduct, product, loading, success, error } =
    useProductContext();

  // Product state
  const [name, setName] = useState(product?.name || "");
  const [features, setFeatures] = useState(product?.features || "");
  const [price, setPrice] = useState(product?.price || "");
  const [inBox, setInBox] = useState(product?.inBox || []);
  const [collectionRef, setCollectionRef] = useState(product?.collectionRef);
  const [mainImage, setMainImage] = useState("");
  const [secondaryImages, setSecondaryImages] = useState([]);

  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");

  const addItemToBox = (itemName, quantity) => {
    setInBox((prev) => [...prev, { itemName, quantity }]);
  };

  const updateProductHandler = (e) => {
    e.preventDefault();
    updateProduct(product._id, {
      name,
      price,
      features,
      inBox,
      collectionRef,
    });
  };

  useEffect(() => {
    fetchProduct(slug);
    fetchCollections();
    // eslint-disable-next-line
  }, [slug]);

  return (
    <Layout>
      <Meta
        title={`Edit ${slug
          .split("-")
          .join(" ")
          .toLocaleUpperCase()} | Instrumental Shop`}
      />
      <div className="max-w-4xl container mx-auto my-8">
        <h1 className="text-4xl mb-8 text-gray-600 uppercase">
          Edit {slug.split("-").join(" ").toUpperCase()}{" "}
        </h1>
        <div className="grid grid-cols-2 gap-8">
          <form
            className="flex flex-col max-w-md"
            onSubmit={updateProductHandler}
          >
            <input
              type="text"
              name="name"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="py-2 px-4 my-2 border border-gray-200 rounded-sm shadow-sm"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={price}
              step={10}
              min={0}
              max={10000}
              onChange={(e) => setPrice(e.target.value)}
              className="py-2 px-4 my-2 border border-gray-200 rounded-sm shadow-sm"
            />

            {/* Select collection */}
            <select
              onChange={(e) => setCollectionRef(e.target.value)}
              name="collection"
              className="capitalize py-3 px-2 my-2"
            >
              <option value="">Select product collection</option>
              {collections &&
                collections.map((collection) => (
                  <option value={collection._id}>{collection.name}</option>
                ))}
            </select>

            <textarea
              name="features"
              placeholder="Product features, description..."
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="py-2 px-4 my-2 border border-gray-200 rounded-sm shadow-sm h-60"
            ></textarea>

            {/* List in box items */}
            {inBox.length > 0 &&
              inBox.map((item) => (
                <ul className="my-4 p-1">
                  <li className="flex items-start justify-between">
                    <strong>Item: </strong> {item.itemName}
                    <strong>Quantity: </strong> {item.quantity}
                    <FiDelete
                      cursor={"pointer"}
                      size={20}
                      onClick={() =>
                        setInBox((state) =>
                          state.filter((i) => i.itemName !== item.itemName)
                        )
                      }
                    />
                  </li>
                </ul>
              ))}

            <button className="inline-block py-2 px-4 rounded-sm shadow-sm my-4 bg-orange-500 text-white hover:bg-orange-600">
              Update
            </button>
            {loading && <h1>Loading...</h1>}
            {success && <h1>Success...</h1>}
            {error && <h1>Error...</h1>}
          </form>

          <div>
            <form
              className="flex flex-col max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Item name"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className="py-2 px-4 my-2 border border-gray-200 rounded-sm shadow-sm"
              />
              <input
                type="number"
                min={1}
                step={1}
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="py-2 px-4 my-2 border border-gray-200 rounded-sm shadow-sm"
              />
              <button
                type="submit"
                onClick={() => addItemToBox(item, quantity)}
                className="inline-block py-2 px-4 font-medium bg-gray-100 border shadow-sm rounded-sm my-4"
              >
                Add InBox items
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mb-32"></div>
    </Layout>
  );
};

export default EditProduct;
