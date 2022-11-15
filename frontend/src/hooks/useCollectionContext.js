import { CollectionContext } from "../context/collections/CollectionContext";
import { useContext } from "react";

export const useCollectionContext = () => {
  const context = useContext(CollectionContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside an WorkoutsContextProvider"
    );
  }

  return context;
};
