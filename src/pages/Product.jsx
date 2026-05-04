import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BasicButtons from "../components/Button";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    console.log(`Added ${product.title} to cart!`);
  };

  return (
    <div key={product.id}>
      <img src={product.thumbnail} alt={product.title} />
      <h4>{product.title}</h4>
      <p>{product.price}</p>
      <p>{product.description}</p>
      <p>{product.rating}</p>
      <p>{product.stock}</p>
      <BasicButtons onClick={handleAddToCart} />
    </div>
  );
}

export default Product;
