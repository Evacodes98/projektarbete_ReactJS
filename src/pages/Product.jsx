import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BasicButtons from "../components/Button";
import { useCart } from "../context/CartContext";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, setCart } = useCart();

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
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    setCart(prev =>
      prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  } else {
    setCart(prev => [...prev, { ...product, quantity: 1 }]);
  }

  console.log(`Added ${product.title} to cart!`);
};

  return (
    <div key ={product.id}>
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
