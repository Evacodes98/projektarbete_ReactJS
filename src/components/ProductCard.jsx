import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img src={product.thumbnail} alt={product.title} />
      </div>

      <div className="product-info">
        <h4>{product.title}</h4>
        <p className="price">${product.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;