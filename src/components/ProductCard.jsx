function ProductCard({ product }) {
  return (
    <div key={product.id}>
      <img src={product.thumbnail} alt={product.title} />
            <h4>{product.title}</h4>
      <p>{product.price}</p>
    </div>
  );
}

export default ProductCard;