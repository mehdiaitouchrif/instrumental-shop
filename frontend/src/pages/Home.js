import { useEffect } from "react";
import Layout from "../components/Layout";
import Collections from "../components/Collections";
import HomeProducts from "../components/HomeProduct";
import PreFooter from "../components/PreFooter";
import { useCollectionContext } from "../hooks/useCollectionContext";

const Home = () => {
  const { fetchCollections } = useCollectionContext();

  useEffect(() => {
    fetchCollections();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Collections />
      <HomeProducts />
      <PreFooter />
    </Layout>
  );
};

export default Home;
