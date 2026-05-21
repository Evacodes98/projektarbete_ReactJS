import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Hero from "../components/Hero";
import CategoryBar from "../components/CategoryBar";


function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

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
          (product) => product.category === selectedCategory
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
        onCategorySelect={setSelectedCategory}
      />
      <Hero />
<div className="product-grid">
  {visibleProducts.map((product) => (
    <Link key={product.id} to={`/product/${product.id}`}>
      <ProductCard product={product} />
    </Link>
  ))}
</div>
    </>
  );
}

export default Home;