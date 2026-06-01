import { useContext } from "react";
import { CartContext } from "./CartContext";

// Custom hook to access cart context values and functions
export function useCart() {
  return useContext(CartContext);
}