import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";
import AnimatedContent from "../component/AnimatedContent";

function ProductCard({ product, index }) {
  const { cart, setCart } = useCart();
  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const originalPrice = (
  product.price /
  (1 - product.discountPercentage / 100)
).toFixed(2);

  
  return (
    <AnimatedContent
      distance={100}
      direction="vertical"
      reverse={false}
      duration={0.8}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={0.1}
      delay={index * 0.08}
    >
      <div className="product-card">
        <Link to={`/product/${product.id}`} className="product-link">
<div className="image-wrapper">
  <img src={product.thumbnail} alt={product.title} />

  {product.discountPercentage > 10 && (
    <div className="sale-badge">
      -{Math.round(product.discountPercentage)}%
    </div>
  )}
</div>

          <div className="product-info">
            <h4>{product.title}</h4>
<div className="price-section">

  <p className="sale-price">
    ${product.price}
  </p>

  {product.discountPercentage > 10 && (
    <p className="original-price">
      ${originalPrice}
    </p>
  )}

</div>
          </div>
        </Link>

        <button className="add-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </AnimatedContent>
  );
}

export default ProductCard;
