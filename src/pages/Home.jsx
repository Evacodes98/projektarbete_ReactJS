import { useState, useEffect } from 'react';

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
        <div key={product.id}>
          <h4>{product.title}</h4>
          <p>{product.description}</p>
        </div>
      ))}
    </>
  );
}

export default Home;