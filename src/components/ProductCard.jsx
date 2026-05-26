import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { cart, setCart } = useCart();
  const handleAddToCart = () => {
  const existingItem = cart.find(
    (item) => item.id === product.id
  );

  if (existingItem) {
    const updatedCart = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
  } else {
    setCart([
      ...cart,
      { ...product, quantity: 1 }
    ]);
  }
};
  return (
<div className="product-card">

  <Link to={`/product/${product.id}`} className="product-link">
    <div className="image-wrapper">
      <img src={product.thumbnail} alt={product.title} />
    </div>

    <div className="product-info">
      <h4>{product.title}</h4>
      <p className="price">${product.price}</p>
    </div>
  </Link>

  <button
    className="add-cart-btn"
    onClick={handleAddToCart}
  >
    Add to Cart
  </button>

</div>
  );
}

export default ProductCard;