import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import PianoLoadingSkeleton from "./PianoLoadingSkeleton";
import DrumLoadingSkeleton from "./DrumLoadingSkeleton";
import GuitarLoadingSkeleton from "./GuitarLoadingSkeleton";

const HomeProducts = ({ collections, loading }) => {
  const [piano, setPiano] = useState(null);
  const [guitar, setGuitar] = useState(null);
  const [drum, setDrum] = useState(null);

  useEffect(() => {
    if (collections && collections.length === 3) {
      const pianoCollection = collections.find((c) => c.name === "pianos");
      const guitarCollection = collections.find((c) => c.name === "guitars");
      const drumCollection = collections.find((c) => c.name === "drums");

      setPiano(pianoCollection ? pianoCollection.product : null);
      setGuitar(guitarCollection ? guitarCollection.product : null);
      setDrum(drumCollection ? drumCollection.product : null);
    }
  }, [collections]);

  return (
    <div className="max-w-6xl mx-auto my-8">
      {loading && (
        <>
          <DrumLoadingSkeleton />
          <GuitarLoadingSkeleton />
          <PianoLoadingSkeleton />
        </>
      )}
      {drum && <Drum drum={drum} />}
      {guitar && <Guitar guitar={guitar} />}
      {piano && <Piano piano={piano} />}
    </div>
  );
};

const Drum = ({ drum }) => {
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
          src={drum.mainImage}
          style={{ mixBlendMode: "multiply", objectFit: "contain" }}
          alt=""
        />
      </div>
      <div className="text-white flex mt-8 md:mt-0 flex-col justify-center">
        <h1
          className="text-2xl  md:text-4xl font-bold uppercase"
          style={{ lineHeight: 1.2 }}
        >
          {drum.name}
        </h1>
        <p className="text-sm font-light my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ipsum
          ad inventore nulla fugiat quia assumenda asperiores molestiae veniam
          provident praesentium!
        </p>
        <Link
          to={`/drums/${drum.slug}`}
          className="inline-block max-w-fit py-2 px-4 my-4 rounded border border-black bg-black uppercase hover:bg-gray-800 shadow-sm"
        >
          See Product
        </Link>
      </div>
    </div>
  );
};

const Guitar = ({ guitar }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-8 from-gray-200 bg-gradient-to-tr bg-gray-100 shadow-sm rounded-md my-12">
      <div className="flex flex-col items-center mb-4 md:mb-0 md:items-start justify-center order-2 md:order-1">
        <h1 className="text-2xl font-medium uppercase my-4">{guitar.name}</h1>
        <Link
          to={`/guitars/${guitar.slug}`}
          className="inline-block max-w-fit py-2 px-4 my-4 rounded border-2 border-black hover:bg-black hover:text-white bg-gray-100 uppercase"
        >
          See Product
        </Link>
      </div>
      <div className="h-72 order-1 md:order-2">
        <img
          src={guitar.mainImage}
          alt=""
          className="h-full w-full p-4"
          style={{
            mixBlendMode: "multiply",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

const Piano = ({ piano }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
      <div className="from-slate-200 bg-gradient-to-b rounded-xl border h-80">
        <img
          src={piano.mainImage}
          alt=""
          className="h-full w-full p-4  "
          style={{
            mixBlendMode: "multiply",
            objectFit: "contain",
          }}
        />
      </div>
      <div className="rounded-xl bg-gray-100 p-8 flex flex-col justify-center">
        <h1 className="text-2xl font-medium uppercase my-4">{piano.name}</h1>
        <Link
          to={`/pianos/${piano.slug}`}
          className="inline-block max-w-fit py-2 px-4 my-4 rounded border-2 border-black hover:bg-black hover:text-white bg-gray-100 uppercase"
        >
          See Product
        </Link>
      </div>
    </div>
  );
};

export default HomeProducts;
