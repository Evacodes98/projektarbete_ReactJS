import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Product.css";
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Product() {
  const { id } = useParams();
  const { cart, setCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();

        setProduct(data);
        setSelectedImage(data.images?.[0] ?? data.thumbnail);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      const updated = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: quantity,
        },
      ]);
    }

    setQuantity(1);
  };

  return (
    <div className="product-page">
      {/* Image section */}
      <div className="product-image">
        <img src={selectedImage} alt={product.title} />

        <div className="thumbnail-row">
          {product.images?.slice(0, 3).map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              className={`thumbnail ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="product-details">
        <p className="brand">{product.brand}</p>
        <h1>{product.title}</h1>

        <div className="product-rating">
          <Rating
            value={product.rating}
            precision={0.5}
            readOnly
            sx={{ color: "#787196" }}
          />
        </div>

        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>

        <div className="product-actions">
          <div className="quantity-selector">
            <button onClick={decrease}>−</button>
            <span>{quantity}</span>
            <button onClick={increase}>+</button>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

        <button className="wishlist-btn">♡ Add to Wishlist</button>
      </div>
    </div>
  );
}

export default Product;
