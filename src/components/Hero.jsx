import { useState } from "react";
import "./Hero.css";

const images = [
  "https://images.unsplash.com/photo-1571779719707-0f24f62ab4fc",
  "https://images.unsplash.com/photo-1678695468927-638ee59432f5",
  "https://images.pexels.com/photos/27544696/pexels-photo-27544696.jpeg",
];

function Hero() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="hero">
      <img src={images[index]} alt="hero" className="hero-img" />

      <button className="hero-btn left" onClick={prev}>
        ‹
      </button>

      <button className="hero-btn right" onClick={next}>
        ›
      </button>
    </div>
  );
}

export default Hero;