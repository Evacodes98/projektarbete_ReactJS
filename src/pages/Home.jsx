import { useState, useEffect } from 'react';

function Home() {
const [products, setProducts] = useState([]);

useEffect(() => {
  console.log("Home effect ran");
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
      console.log(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []);

  return <>
  <h3> Home - banner längst upp med produkt</h3>
  </>;
}

export default Home;