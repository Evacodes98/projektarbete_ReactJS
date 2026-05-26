import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Product.css";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, setCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      const updated = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updated);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="product-page">

      <div className="product-image">
        <img src={product.thumbnail} alt={product.title} />
      </div>

      <div className="product-details">
        <h1>{product.title}</h1>

        <p className="price">${product.price}</p>

        <p className="description">{product.description}</p>

        <p>Rating: ⭐ {product.rating}</p>
        <p>Stock: {product.stock}</p>

        <button onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

    </div>
  );
}

export default Product;