import { useState, useEffect } from "react";
import { FiDelete } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import { useProductContext } from "../hooks/useProductContext";
import { useCollectionContext } from "../hooks/useCollectionContext";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  // Product state
  const [name, setName] = useState("");
  const [features, setFeatures] = useState("");
  const [price, setPrice] = useState("");
  const [inBox, setInBox] = useState([]);
  const [collectionRef, setCollectionRef] = useState("");

  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");

  const addItemToBox = (itemName, quantity) => {
    setInBox((prev) => [...prev, { itemName, quantity }]);
  };

  const [mainImage, setMainImage] = useState(null);
  const [secondaryImages, setSecondaryImages] = useState([]);

  const { fetchCollections, collections } = useCollectionContext();
  const {
    updateProduct,
    fetchProduct,
    product,
    loading,
    success,
    error,
    uploadMainImage,
    uploadSecondaryImages,
    uploadMainImageLoading,
    uploadSecondaryImagesLoading,
    mainImageUrl,
    secondaryImagesUrls,
  } = useProductContext();

  const handleMainImageChange = (event) => {
    const file = event.target.files[0];
    setMainImage(file);
    const formData = new FormData();
    formData.append("mainImage", file);
    uploadMainImage(formData);
  };

  const handleSecondaryImagesChange = (event) => {
    const files = Array.from(event.target.files);
    setSecondaryImages([...files]);
    const formData = new FormData();
    files.forEach((file, _) => {
      formData.append(`secondaryImages`, file);
    });

    uploadSecondaryImages(formData);
  };
  const updateProductHandler = (e) => {
    e.preventDefault();
    const updateObj = {
      name,
      price,
      features,
      inBox,
      collectionRef,
    };
    if (mainImage) updateObj.mainImage = mainImage;
    if (secondaryImages) updateObj.secondaryImages = secondaryImages;
    updateProduct(product._id, updateObj);
  };

  const { productSlug } = useParams();

  useEffect(() => {
    fetchCollections();

    if (!product) {
      fetchProduct(productSlug);
    }

    if (product) {
      setName(product.name);
      setPrice(product.price);
      setFeatures(product.features);
      setInBox(product.inBox);
      setCollectionRef(product.collectionRef);
    }

    if (success) {
      toast.success("Product updated succesfully!");
    }

    if (error) {
      toast.error("Something went wrong!");
    }

    if (mainImageUrl) {
      setMainImage(() => mainImageUrl);
      toast.success("Main image uploaded!");
    }

    if (secondaryImagesUrls) {
      setSecondaryImages(() => secondaryImagesUrls);
      toast.success("Secondary images uploaded");
    }

    // eslint-disable-next-line
  }, [product, productSlug, success, error]);

  return (
    <Layout>
      <ToastContainer />
      <Meta title={`Add Product | Instrumental Shop`} />
      <div className="max-w-4xl container mx-auto my-8">
        <h1 className="text-4xl mb-8 text-gray-600 uppercase">Edit Product</h1>
        <div>
          <form className="flex flex-col" onSubmit={updateProductHandler}>
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

            <textarea
              name="features"
              placeholder="Product features, description..."
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="py-2 px-4 my-2 border border-gray-200 rounded-sm shadow-sm h-60"
            ></textarea>

            {/* Select collection */}
            <select
              onChange={(e) => setCollectionRef(e.target.value)}
              name="collectionRef"
              className="capitalize py-3 px-2 my-2 h-12"
            >
              <option value="">Select product collection</option>
              {collections &&
                collections.map((collection) => (
                  <option value={collection._id}>{collection.name}</option>
                ))}
            </select>

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

            <div className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Item name. Ex. USB Cable"
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
                type="button"
                onClick={() => addItemToBox(item, quantity)}
                className="inline-block py-2 px-4 font-medium bg-gray-100 border shadow-sm rounded-sm my-4"
              >
                Add InBox items
              </button>
            </div>

            {/* IMAGES */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Upload Main Image</h2>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="main-image"
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                >
                  Select File
                </label>
                <div className="text-gray-400">
                  {mainImage ? mainImage.name : "No file selected"}
                  {uploadMainImageLoading && "Uploading..."}
                  {mainImageUrl && "Image Uploaded"}
                </div>
                <input
                  type="file"
                  id="main-image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleMainImageChange}
                />
              </div>

              <h2 className="text-lg font-semibold mt-6 mb-2">
                Upload Secondary Images
              </h2>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="secondary-images"
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                >
                  Select Files
                </label>
                <div className="text-gray-400">
                  {secondaryImages.length
                    ? secondaryImages.map((file) => file.name).join(", ")
                    : "No files selected"}
                  {uploadSecondaryImagesLoading && "Uploading..."}
                  {mainImageUrl && "Images Uploaded"}
                </div>
                <input
                  type="file"
                  id="secondary-images"
                  accept="image/*"
                  className="hidden"
                  multiple
                  onChange={handleSecondaryImagesChange}
                />
              </div>
            </div>

            <button className="inline-block py-2 px-4 rounded-sm shadow-sm my-4 bg-orange-500 text-white hover:bg-orange-600">
              Submit
            </button>
            {loading && <h1>Loading...</h1>}
          </form>
        </div>
      </div>

      <div className="mb-32"></div>
    </Layout>
  );
};

export default EditProduct;
