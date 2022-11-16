import Layout from "../components/Layout";
import Collections from "../components/Collections";
import HomeProducts from "../components/HomeProduct";
import PreFooter from "../components/PreFooter";

const Home = () => {
  return (
    <Layout>
      <Collections />
      <HomeProducts />
      <PreFooter />
    </Layout>
  );
};

export default Home;
