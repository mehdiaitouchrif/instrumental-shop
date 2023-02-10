import { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";
import ModalAdmin from "./ModalAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCollectionContext } from "../hooks/useCollectionContext";
import { useProductContext } from "../hooks/useProductContext";

const EditModal = ({ isOpen, onClose, product }) => {
  const [name, setName] = useState(product.name);
  const [features, setFeatures] = useState(product.features);
  const [price, setPrice] = useState(product.price);
  const [inBox, setInBox] = useState(product.inBox);
  const [collectionRef, setCollectionRef] = useState(product.collectionRef);

  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");

  const addItemToBox = (itemName, quantity) => {
    setInBox((prev) => [...prev, { itemName, quantity }]);
  };

  const { fetchCollections, collections } = useCollectionContext();
  const { updateProduct, loading, success, error } = useProductContext();

  const updateProductHandler = (e) => {
    e.preventDefault();
    updateProduct(product._id, {
      name,
      price,
      features,
      inBox,
      collectionRef,
    });

    if (success) toast.success("product updated!");
    if (error) toast.error("something went wrong!");
  };

  useEffect(() => {
    fetchCollections();
    // eslint-disable-next-line
  }, []);

  return (
    <ModalAdmin open={isOpen} onClose={onClose}>
      <ToastContainer />
      {loading && <h1>Loading....</h1>}
      <h2 className="text-3xl text-gray-800 my-4">Edit product </h2>
      <form className="flex flex-col max-w-md" onSubmit={updateProductHandler}>
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
          step={0.01}
          min={0}
          max={10000.0}
          onChange={(e) => setPrice(+e.target.value)}
          className="py-2 px-4 my-2 border border-gray-200 rounded-sm shadow-sm"
        />

        {/* Select collection */}
        <select
          onChange={(e) => setCollectionRef(e.target.value)}
          name="collection"
          className="capitalize py-3 px-2 my-2"
        >
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
            <ul className="p-1">
              <li className="flex gap-1 ">
                <strong>Item: </strong> {item.itemName}
                <strong>/ Quantity: </strong> {item.quantity}
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
    </ModalAdmin>
  );
};

export default EditModal;
