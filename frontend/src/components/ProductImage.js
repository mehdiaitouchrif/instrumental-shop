import { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";

const ProductImage = ({ imageUrl }) => {
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [magnifierVisible, setMagnifierVisible] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setMagnifierPosition({ x, y });
    setMagnifierVisible(true);
  };

  const handleMouseLeave = () => {
    setMagnifierVisible(false);
  };

  return (
    <div
      className="image-container"
      style={{ position: "relative", overflow: "hidden" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Gallery>
        <Item original={imageUrl} thumbnail={imageUrl} width="700" height="700">
          {({ ref, open }) => (
            <img
              ref={ref}
              onClick={open}
              src={imageUrl}
              alt=""
              className="block h-full w-2/3 hover:cursor-zoom-in"
              style={{
                mixBlendMode: "multiply",
                objectFit: "contain",
                display: "block",
                width: "100%",
              }}
            />
          )}
        </Item>
      </Gallery>

      {magnifierVisible && (
        <div
          className="magnifier"
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            border: "2px solid #ccc",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.5)",
            pointerEvents: "none",
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "350% 350%",
            backgroundPosition: `-${magnifierPosition.x * 3 - 50}px -${
              magnifierPosition.y * 3 - 50
            }px`,
            left: magnifierPosition.x - 50 + "px",
            top: magnifierPosition.y - 50 + "px",
          }}
        />
      )}
    </div>
  );
};

export default ProductImage;
