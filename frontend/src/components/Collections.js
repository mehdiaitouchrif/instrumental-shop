import CollectionItem from "./CollectionItem";
import CollectionLoadingSkeleton from "./CollectionLoadingSkeleton";

const Collections = ({ collections, loading }) => {
  return (
    <div className="max-w-6xl mx-auto my-16 w-full">
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mt-40 md:mt-52">
          <CollectionLoadingSkeleton />
          <CollectionLoadingSkeleton />
          <CollectionLoadingSkeleton />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {collections &&
          collections.map((collection) => (
            <CollectionItem key={collection._id} collection={collection} />
          ))}
      </div>
    </div>
  );
};

export default Collections;
