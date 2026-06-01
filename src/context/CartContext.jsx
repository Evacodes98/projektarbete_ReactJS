
import { createContext, useContext, useState, useEffect } from "react";


export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
const [products, setProducts] = useState([]);

useEffect(() => {
  fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => setProducts(data.products));
}, []);
  return (
    <CartContext.Provider value={{ cart, setCart, search, setSearch, products, setProducts }}>
      {children}
    </CartContext.Provider>
  );
}z

export function useCart() {
  return useContext(CartContext);
}
