import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FiDelete, FiPlus, FiTrash2, FiUpload, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import { useProductContext } from "../hooks/useProductContext";
import { useCollectionContext } from "../hooks/useCollectionContext";
import Spinner from "../components/Spinner";

const EditProduct = () => {
  // Product state
  const [name, setName] = useState("");
  const [features, setFeatures] = useState("");
  const [price, setPrice] = useState("");
  const [inBox, setInBox] = useState([
    {
      itemName: "",
      quantity: "",
    },
  ]);
  const [collectionRef, setCollectionRef] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [secondaryImages, setSecondaryImages] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [secondaryImagesPreview, setSecondaryImagesPreview] = useState([]);
  const [updateProductLoading, setUpdateProductLoading] = useState(false);

  // Context state
  const { fetchCollections, collections } = useCollectionContext();
  const {
    fetchProduct,
    updateProduct,
    product,
    loading,
    success,
    error,
    uploadMainImage,
    uploadSecondaryImages,
    mainImageLoading,
    secondaryImagesLoading,
    mainImageUrl,
    secondaryImagesUrls,
  } = useProductContext();

  // Handle inBox input change
  const handleInBoxInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...inBox];
    updatedItems[index][name] = value;
    setInBox(updatedItems);
  };

  // Add nox item
  const addItemToBox = () => {
    const inBoxCopy = [...inBox];
    inBoxCopy.push({ itemName: "", quantity: "" });
    setInBox(inBoxCopy);
  };

  // Handle inputs change
  const handleMainImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSecondaryImagesChange = (event) => {
    const files = Array.from(event.target.files);
    // Concatenate the new files with the existing secondary images
    const newSecondaryImages = secondaryImages.concat(files);
    setSecondaryImages(newSecondaryImages);

    // Generate previews for all secondary images
    const previews = newSecondaryImages.map((file) =>
      URL.createObjectURL(file)
    );
    setSecondaryImagesPreview(previews);
  };

  const removeSecondaryImage = (index) => {
    const updatedImages = [...secondaryImages];
    updatedImages.splice(index, 1);
    const updatedPreviews = [...secondaryImagesPreview];
    updatedPreviews.splice(index, 1);
    setSecondaryImages(updatedImages);
    setSecondaryImagesPreview(updatedPreviews);
  };

  // Upload images handlers
  const uploadImagesHandler = () => {
    // main image
    const mainImgFormData = new FormData();
    mainImgFormData.append("mainImage", mainImage);
    uploadMainImage(mainImgFormData);

    // secondary images
    const secondaryImgsFormData = new FormData();
    secondaryImages.forEach((file, _) => {
      secondaryImgsFormData.append("secondaryImages", file);
    });

    uploadSecondaryImages(secondaryImgsFormData);
  };

  // Create product handler
  const updateProductHandler = () => {
    if (!collectionRef) {
      toast.error("Please assign a collection");
      return;
    }

    const updateObj = {
      name,
      price,
      features,
      inBox,
      collectionRef,
    };
    if (mainImageUrl) updateObj.mainImage = mainImageUrl;
    if (secondaryImagesUrls) updateObj.secondaryImages = secondaryImagesUrls;

    console.log(updateObj);
    updateProduct(product._id, updateObj);

    setUpdateProductLoading(true);
  };

  // Get slug
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
      setMainImage(product.mainImage);
      setMainImagePreview(product.mainImage);
      setSecondaryImages(product.secondaryImages);
      setSecondaryImagesPreview(product.secondaryImages);
    }

    if (success) {
      toast.success("Product updated succesfully!");

      window.open(`/${collectionRef.name}/${productSlug}`);
      setUpdateProductLoading(false);
    }

    if (error) {
      setUpdateProductLoading(false);
      console.log(error);
      if (Array.isArray(error)) {
        error.map((errField) => toast.error(Object.values(errField)[0]));
      } else {
        toast.error("Something went wrong");
      }
    }

    // eslint-disable-next-line
  }, [success, error, product, productSlug]);

  return (
    <Layout>
      <Meta title={`Edit ${product?.name} | Instrumental Shop`} />
      <div className="max-w-5xl mx-auto my-8 px-2">
        {/* Go back link */}
        <div>
          <Link
            to="/admin/products"
            className="flex items-center gap-3 mb-4 text-gray-500 font-medium hover:text-gray-600"
          >
            <FaArrowLeft />
            <p>Back to products</p>
          </Link>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center my-6">
          <h1 className="text-2xl text-gray-700 italic w-[80%]">
            {product?.name}
          </h1>
          <button
            onClick={updateProductHandler}
            className="block py-2 px-6 rounded-3xl bg-green-500 text-white font-medium"
          >
            Update Product
          </button>
        </div>

        {updateProductLoading && <Spinner />}

        {/* Grid here */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="col-span-2">
            <div className="flex flex-col bg-gray-50 rounded-xl p-4">
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
                max={10000}
                onChange={(e) => setPrice(e.target.value)}
                className="py-2 px-4 my-2 border border-gray-200 rounded-sm shadow-sm"
              />

              <textarea
                name="features"
                placeholder="Product features, description..."
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                className="py-2 px-4 my-2 border border-gray-200 rounded-sm shadow-sm h-44"
              ></textarea>
            </div>

            {/* Set product collection */}
            <div className="bg-gray-50 p-4 rounded my-4 ">
              <h3 className="text-2xl mb-4">Category</h3>
              <p>Product category</p>

              <select
                onChange={(e) => setCollectionRef(e.target.value)}
                name="collection"
                className="capitalize py-3 px-2 my-2 h-12 w-full"
              >
                <option value="">Select collection</option>
                {collections &&
                  collections.map((collection) => (
                    <option
                      selected={collectionRef._id === collection._id}
                      key={collection._id}
                      value={collection._id}
                    >
                      {collection.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Specifications */}
            <div className="my-4 bg-gray-50 p-4 rounded-xl">
              <h3 className="text-2xl">In-Box</h3>
              {inBox.map(({ itemName, quantity }, index) => (
                <div className="flex items-center gap-x-2" key={index}>
                  <input
                    type="text"
                    placeholder="Item name"
                    value={itemName}
                    className="py-2 px-4 border border-gray-200 rounded-sm shadow-sm w-full"
                    name="itemName"
                    onChange={(e) => handleInBoxInputChange(e, index)}
                  />
                  <input
                    type="number"
                    min={1}
                    step={1}
                    placeholder="Quantity"
                    value={quantity}
                    className="py-2 px-4 border border-gray-200 rounded-sm shadow-sm w-full"
                    name="quantity"
                    onChange={(e) => handleInBoxInputChange(e, index)}
                  />
                  <button
                    type="button"
                    className="inline-block p-2 font-medium border shadow-sm rounded my-2"
                    onClick={() => {
                      const updatedItems = [...inBox];
                      updatedItems.splice(index, 1);
                      setInBox(updatedItems);
                    }}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              ))}

              {/* Add inBox row */}
              <button
                onClick={addItemToBox}
                className="inline-block py-2 px-4 rounded bg-black text-white hover:bg-gray-800 my-4"
              >
                Add row
              </button>
            </div>
          </div>

          {/* Images upload & select collection */}
          <div>
            {/* Upload Main Image */}
            <div className="mb-2">
              <label
                htmlFor="main-image"
                className="flex flex-col items-center justify-center w-full h-60 border border-dashed rounded-md cursor-pointer overflow-hidden"
              >
                {!mainImagePreview && (
                  <>
                    <FiUpload size={30} />
                    <p className="my-2 text-gray-500 text-sm">
                      Upload Main Image
                    </p>
                  </>
                )}
                {mainImagePreview && (
                  <img
                    src={mainImagePreview}
                    alt="Main Preview"
                    className="w-full h-full object-cover"
                  />
                )}
                <input
                  type="file"
                  id="main-image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleMainImageChange}
                />
              </label>
            </div>

            {/* Upload Secondary Images */}
            <div>
              <div className="grid grid-cols-3 gap-2">
                {secondaryImagesPreview.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt="Secondary Preview"
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <div className="absolute top-0 right-0">
                      <button
                        onClick={() => removeSecondaryImage(index)}
                        className="p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-300 focus:outline-none"
                      >
                        <FiDelete size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                {secondaryImagesPreview.length < 6 && (
                  <label
                    htmlFor="secondary-images"
                    className="flex items-center justify-center w-full h-24 border border-dashed rounded-md cursor-pointer overflow-hidden"
                  >
                    <FiPlus size={28} className="text-gray-500" />

                    <input
                      type="file"
                      multiple
                      id="secondary-images"
                      accept="image/*"
                      className="hidden"
                      onChange={handleSecondaryImagesChange}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="my-4 text-sm text-gray-600">
              {mainImageUrl && (
                <p className="flex items-center gap-2">
                  <FiCheck /> <span>Main image uploaded</span>
                </p>
              )}
              {secondaryImagesUrls?.length > 0 && (
                <p className="flex items-center gap-2">
                  <FiCheck /> <span>Secondary images uploaded</span>
                </p>
              )}
            </div>

            <button
              onClick={uploadImagesHandler}
              disabled={
                !mainImagePreview ||
                secondaryImagesPreview.length === 0 ||
                mainImageUrl ||
                secondaryImagesUrls?.length > 0 ||
                loading
              }
              className="block w-full h-10 my-4 py-2 px-4 text-white rounded shadow bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed relative"
            >
              {mainImageLoading || secondaryImagesLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                "Upload Images"
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-32"></div>
    </Layout>
  );
};

export default EditProduct;
