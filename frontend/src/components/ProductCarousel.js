import { useEffect } from "react";
import { useProductContext } from "../hooks/useProductContext";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  extractPublicId,
  getBackgroundRemovedUrl,
} from "../utils/cloudinaryUtils";
import CarouselLoadingSkeleton from "./CarouselLoadingSkeleton";

const ProductCarousel = () => {
  const { fetchProducts, products, loading } = useProductContext();

  useEffect(() => {
    fetchProducts({ latest: true, page: null, pageSize: null });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-black from-slate-700 bg-gradient-to-l text-white p-8">
      <div className="container mx-auto">
        {loading && <CarouselLoadingSkeleton />}
        <Swiper slidesPerView={1} autoplay={true}>
          {products &&
            products.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                  <div className="flex flex-col justify-center items-start text-left order-2 md:order-1">
                    <p className="text-xl md:text-2xl text-gray-300 font-thin uppercase mb-4">
                      New Product
                    </p>
                    <h2 className="text-3xl md:text-5xl uppercase font-bold my-4 text-white">
                      {product.name}
                    </h2>
                    <p className="text-gray-300 text-left hidden md:block">
                      {product.features.slice(0, 200) + "..."}{" "}
                    </p>

                    <Link
                      to={`/${product.collectionRef?.name}/${product.slug}`}
                      className="inline-block w-fit py-3 px-4 rounded-sm shadow mt-8 text-white uppercase font-medium bg-orange-600 hover:bg-black border border-transparent transition-colors duration-150 hover:border-orange-600"
                    >
                      See Product
                    </Link>
                  </div>
                  <div className="h-[420px] order-1 md:order-2">
                    <img
                      className="p-4 h-full w-full self-center object-contain shadow-md"
                      src={
                        getBackgroundRemovedUrl(
                          extractPublicId(product.mainImage)
                        ) || product.mainImage
                      }
                      alt=""
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductCarousel;
