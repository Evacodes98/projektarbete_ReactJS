import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Hero from "../components/Hero";
import CategoryBar from "../components/CategoryBar";
import "./Home.css";
import { useSearchParams } from "react-router-dom";



function Home() {
  const [searchParams] = useSearchParams();

const selectedCategory =
  searchParams.get("category") || "All";
  const [products, setProducts] = useState([]);

  const { search } = useCart();

  const categories = [
    "All",
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
  ];

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

const categoryFiltered =
  selectedCategory === "All"
    ? products
    : products.filter(
        (product) =>
          product.category === selectedCategory
      );

  const filteredProducts = categoryFiltered.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const visibleProducts = filteredProducts.slice(0, 8);

  return (
    <>

     <CategoryBar
  categories={categories}
  selectedCategory={selectedCategory}
/>
      <Hero />
      <h2 className="title">Featured Products</h2>
<div className="product-grid">
  {visibleProducts.map((product, index) => (
    <ProductCard
      key={product.id}
      product={product}
      index={index}
    />
  ))}
</div>
    </>
  );
}

export default Home;