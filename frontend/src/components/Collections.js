import { useEffect } from "react";
import { useCollectionContext } from "../hooks/useCollectionContext";
import CollectionItem from "./CollectionItem";

const Collections = () => {
  const { fetchCollections, collections, loading } = useCollectionContext();

  useEffect(() => {
    fetchCollections();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-16 w-full">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        collections && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {collections.map((col) => (
              <CollectionItem key={col._id} collection={col} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Collections;
