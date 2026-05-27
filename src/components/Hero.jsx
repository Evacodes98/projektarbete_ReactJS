import { useState, useEffect } from "react";
import "./Hero.css";
import CurvedLoop from '../component/CurvedLoop';

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

  useEffect(() => {
  const interval = setInterval(() => {
    next();
  }, 5000);

  return () => clearInterval(interval);
}, [index]);

  return (
<div className="hero">
  <div
    className="hero-slider"
    style={{
      transform: `translateX(-${index * 100}%)`,
    }}
  >
    {images.map((img, i) => (
      <img key={i} src={img} alt="hero" className="hero-img" />
    ))}
  </div>
<CurvedLoop 
  marqueeText="New Product Drop ✦"
  speed={2}
  curveAmount={400}
  direction="right"
  interactive
  className="custom-text-style"
/>

  <button className="hero-btn left" onClick={prev}>
    
  </button>

  <button className="hero-btn right" onClick={next}>
    
  </button>
</div>
  );
}

export default Hero;