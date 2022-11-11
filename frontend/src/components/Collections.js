import CollectionItem from "./CollectionItem";

const Collections = ({ collections, loading }) => {
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="max-w-6xl mx-auto my-16 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {collections.map((col) => (
          <CollectionItem key={col._id} collection={col} />
        ))}
      </div>
    </div>
  );
};

export default Collections;
