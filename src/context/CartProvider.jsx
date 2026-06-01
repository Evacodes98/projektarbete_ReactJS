import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

// Fetch products from API and handle errors (Try-catch with async-await)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) {
          throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        search,
        setSearch,
        products,
        setProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}