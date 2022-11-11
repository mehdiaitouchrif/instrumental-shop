import { useEffect } from "react";
import Layout from "../components/Layout";
import Collections from "../components/Collections";
import HomeProducts from "../components/HomeProduct";
import PreFooter from "../components/PreFooter";
import { useCollectionContext } from "../hooks/useCollectionContext";
import { SET_COLLECTIONS, SET_LOADING } from "../context/types";

const Home = () => {
  const { collections, loading, dispatch } = useCollectionContext();

  useEffect(() => {
    const fetchCollections = async () => {
      dispatch({ tyoe: SET_LOADING });
      const res = await fetch("/api/collections");
      const { success, data } = await res.json();

      if (success) {
        dispatch({ type: SET_COLLECTIONS, payload: data });
      }
    };

    fetchCollections();
  }, [dispatch]);

  return (
    <Layout>
      <Collections collections={collections} loading={loading} />
      <HomeProducts collections={collections} loading={loading} />
      <PreFooter />
    </Layout>
  );
};

export default Home;
