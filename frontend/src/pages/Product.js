import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PreFooter from "../components/PreFooter";
import { useProductContext } from "../hooks/useProductContext";
import { useCollectionContext } from "../hooks/useCollectionContext";
import { useCartContext } from "../hooks/useCartContext";
import Meta from "../components/Meta";
import { ToastContainer, toast } from "react-toastify";
import { Gallery, Item } from "react-photoswipe-gallery";
import ProductImage from "../components/ProductImage";
import ProductLoadingSkeleton from "../components/ProductLoadingSkeleton";

const Product = () => {
  const { productSlug, collection } = useParams();
  const { fetchProduct, product, loading } = useProductContext();
  const { collectionProducts, fetchCollectionProducts, collectionSlug } =
    useCollectionContext();

  // Add to cart / quantity
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartContext();

  // Image keyboard listener
  const handleKeyPress = (e, open) => {
    if (e.key === "Enter") {
      open();
    }
  };

  useEffect(() => {
    // Get selected product
    fetchProduct(productSlug);

    // Fetch other products
    fetchCollectionProducts(collection);

    window.scrollTo(0, 0);

    //eslint-disable-next-line
  }, [productSlug]);

  return (
    <Layout>
      <ToastContainer />
      <Meta title={`${product && product.name} | Instrumental Shop`} />
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <ProductLoadingSkeleton />
        ) : (
          product && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 md:my-12">
                <div
                  className="bg-gray-50 flex flex-col relative items-center justify-center p-4"
                  style={{ height: 500 }}
                >
                  <ProductImage imageUrl={product.mainImage} />
                </div>
                <div className="flex flex-col justify-center p-4">
                  <h2 className="text-3xl uppercase font-medium">
                    {product.name}
                  </h2>
                  <p className="text-gray-700 font-extralight my-4">
                    {product.features}
                  </p>
                  <p className="font-bold text-xl text-gray-900 my-4">
                    ${product.price}
                  </p>

                  <div className="my-4 flex items-center gap-6">
                    <div className="bg-gray-50 shadow-sm rounded-sm flex items-center text-center">
                      <button
                        className="w-11 py-2.5 px-2 cursor-pointer hover:bg-gray-100"
                        onClick={() =>
                          setQuantity((prev) => {
                            if (quantity === 1) {
                              return 1;
                            }
                            return prev - 1;
                          })
                        }
                      >
                        -
                      </button>
                      <div className="w-11 py-2.5 px-2">{quantity}</div>
                      <button
                        className="w-11 py-2.5 px-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => setQuantity((prev) => prev + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(productSlug, quantity);
                        toast.success("Product added to cart!");
                      }}
                      className="py-2 px-4 uppercase font-medium text-white bg-orange-600 rounded-sm shadow-sm hover:bg-orange-500"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="my-8 md:my-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap28">
                <div className="col-span-2 my-4 md:my-8">
                  <h2 className="uppercase font-medium text-3xl my-4">
                    Features
                  </h2>
                  <p className="font-light md:my-4 text-gray-600">
                    {product.features}
                  </p>
                </div>
                <div className="my-4 md:my-8">
                  <h2 className="uppercase font-medium text-3xl my-4">
                    In the box
                  </h2>
                  {product.inBox.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-left my-3"
                    >
                      <div className="font-bold text-orange-600 mr-4">
                        {item.quantity}x
                      </div>
                      <div className="text-gray-900">{item.itemName}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/*  Product Images */}
              <div className="my-4 md:my-16 p-4 grid grid-cols-2 gap-4">
                <Gallery>
                  {product.secondaryImages.map((img, idx) => (
                    <div
                      key={img}
                      className="bg-gray-50 h-[200px] md:h-[500px] "
                    >
                      <Item
                        original={img}
                        thumbnail={img}
                        width="700"
                        height="700"
                      >
                        {({ ref, open }) => (
                          <img
                            ref={ref}
                            onClick={open}
                            onKeyDown={(e) => handleKeyPress(e, open)}
                            role="img"
                            tabIndex={0}
                            src={img}
                            loading="lazy"
                            decoding="async"
                            key={idx}
                            style={{ mixBlendMode: "multiply" }}
                            className="object-contain w-full h-full  hover:cursor-zoom-in"
                            alt=""
                          />
                        )}
                      </Item>
                    </div>
                  ))}
                </Gallery>
              </div>

              <div className="my-8 md:my-16">
                {collectionProducts &&
                  collectionProducts.filter((p) => p.slug !== productSlug)
                    .length > 0 && (
                    <h2 className="text-3xl uppercase text-center font-medium text-gray-900 my-4 md:my-8">
                      You may also like
                    </h2>
                  )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
                  {collectionProducts &&
                    collectionProducts
                      .filter((p) => p.slug !== productSlug)
                      .slice(0, 3)
                      .map((p) => (
                        <div key={p._id} className="p-4">
                          <div
                            style={{ height: 200 }}
                            className="bg-gray-50 flex flex-col items-center justify-center p-4"
                          >
                            <img
                              style={{
                                mixBlendMode: "multiply",
                                objectFit: "contain",
                                maxHeight: 200,
                              }}
                              className="block h-full md:w-2/4"
                              src={p.mainImage}
                              alt=""
                            />
                          </div>

                          <div className="my-2 text-center p-4">
                            <h2 className="uppercase text-xl text-gray-900 font-bold my-2">
                              {p.name}
                            </h2>
                            <Link
                              to={`/${collectionSlug}/${p.slug}`}
                              className="inline-block py-3 px-4 rounded-sm shadow my-2 text-white uppercase font-medium bg-orange-600 hover:bg-orange-500"
                            >
                              See product
                            </Link>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
              <PreFooter />
            </>
          )
        )}
      </div>
    </Layout>
  );
};

export default Product;
