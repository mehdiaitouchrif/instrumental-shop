import Layout from "../components/Layout";
import Collections from "../components/Collections";
import HomeProducts from "../components/HomeProduct";
import PreFooter from "../components/PreFooter";
import Meta from "../components/Meta";
import ProductCarousel from "../components/ProductCarousel";

const Home = () => {
  return (
    <Layout>
      <Meta />
      <ProductCarousel />
      <div className="px-4 md:px-2">
        <Collections />
        <HomeProducts />
        <PreFooter />
      </div>
    </Layout>
  );
};

export default Home;
