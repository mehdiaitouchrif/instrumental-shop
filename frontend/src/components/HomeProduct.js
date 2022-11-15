import { useEffect, useState } from "react";
import { useCollectionContext } from "../hooks/useCollectionContext";

import { Link } from "react-router-dom";

const HomeProducts = () => {
  const { collections, loading } = useCollectionContext();

  let piano, guitar, drum;

  if (collections && collections.length === 3) {
    piano = collections[0].product;
    guitar = collections[1].product;
    drum = collections[2].product;
  }

  return (
    <div className="max-w-6xl mx-auto my-8">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        collections && (
          <>
            <Guitar guitar={guitar} />
            <Piano piano={piano} />
            <Drum drum={drum} />
          </>
        )
      )}
    </div>
  );
};

const Guitar = ({ guitar }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imgHeight = windowWidth > 600 ? 475 : 280;
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 rounded-xl"
      style={{ background: "#d87d4a" }}
    >
      <div style={{ height: imgHeight }}>
        <img
          className="w-full h-full"
          src={guitar.mainImage}
          style={{ mixBlendMode: "multiply", objectFit: "contain" }}
          alt=""
        />
      </div>
      <div className="text-white flex mt-8 md:mt-0 flex-col justify-center">
        <h1
          className="text-2xl  md:text-4xl font-bold uppercase"
          style={{ lineHeight: 1.2 }}
        >
          {guitar.name}
        </h1>
        <p className="text-sm font-light my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ipsum
          ad inventore nulla fugiat quia assumenda asperiores molestiae veniam
          provident praesentium!
        </p>
        <Link
          to={`/guitars/${guitar.slug}`}
          className="inline-block max-w-fit py-2 px-4 my-4 rounded border border-black bg-black uppercase hover:bg-gray-800 shadow-sm"
        >
          See Product
        </Link>
      </div>
    </div>
  );
};

const Piano = ({ piano }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-8 from-gray-200 bg-gradient-to-tr bg-gray-100 shadow-sm rounded-md my-12">
      <div className="flex flex-col items-center mb-4 md:mb-0 md:items-start justify-center ">
        <h1 className="text-2xl font-medium uppercase my-4">{piano.name}</h1>
        <Link
          to={`/pianos/${piano.slug}`}
          className="inline-block max-w-fit py-2 px-4 my-4 rounded border-2 border-black hover:bg-black hover:text-white bg-gray-100 uppercase"
        >
          See Product
        </Link>
      </div>
      <div className="h-64">
        <img
          src={piano.mainImage}
          alt=""
          className="h-full w-full p-4"
          style={{
            mixBlendMode: "multiply",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

const Drum = ({ drum }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
      <div className="from-slate-200 bg-gradient-to-b rounded-xl border h-72">
        <img
          src={drum.mainImage}
          alt=""
          className="h-full w-full p-4  "
          style={{
            mixBlendMode: "multiply",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="rounded-xl bg-gray-100 p-8 flex flex-col justify-center">
        <h1 className="text-2xl font-medium uppercase my-4">{drum.name}</h1>
        <Link
          to={`/drums/${drum.slug}`}
          className="inline-block max-w-fit py-2 px-4 my-4 rounded border-2 border-black hover:bg-black hover:text-white bg-gray-100 uppercase"
        >
          See Product
        </Link>
      </div>
    </div>
  );
};

export default HomeProducts;
