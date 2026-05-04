import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h3>Home - banner längst upp med produkt</h3>
      {products.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </>
  );
}

export default Home;
