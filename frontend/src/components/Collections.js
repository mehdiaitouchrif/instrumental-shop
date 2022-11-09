import { useEffect } from "react";
import { useCollectionContext } from "../hooks/useCollectionContext";
import { SET_COLLECTIONS, SET_LOADING } from "../context/types";

import CollectionItem from "./CollectionItem";

const Collections = () => {
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

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="flex flex-col md:flex-row items-center justify-center  gap-4 md:gap-8">
      {collections.map((col) => (
        <CollectionItem key={col._id} collection={col} />
      ))}
    </div>
  );
};

export default Collections;
