import Layout from "../components/Layout";
import Collections from "../components/Collections";
import HomeProducts from "../components/HomeProduct";
import PreFooter from "../components/PreFooter";
import Meta from "../components/Meta";
import ProductCarousel from "../components/ProductCarousel";
import { useCollectionContext } from "../hooks/useCollectionContext";
import { useEffect } from "react";
import CouponBanner from "../components/CouponBanner";

const Home = () => {
  const { fetchCollections, collections, loading } = useCollectionContext();

  useEffect(() => {
    fetchCollections();

    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <Meta />
      <CouponBanner />
      <ProductCarousel />
      <div className="px-4 md:px-2">
        <Collections collections={collections} loading={loading} />
        <HomeProducts collections={collections} loading={loading} />
        <PreFooter />
      </div>
    </Layout>
  );
};

export default Home;
