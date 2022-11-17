import Layout from "../components/Layout";
import Collections from "../components/Collections";
import HomeProducts from "../components/HomeProduct";
import PreFooter from "../components/PreFooter";
import Meta from "../components/Meta";

const Home = () => {
  return (
    <Layout>
      <Meta />
      <Collections />
      <HomeProducts />
      <PreFooter />
    </Layout>
  );
};

export default Home;
