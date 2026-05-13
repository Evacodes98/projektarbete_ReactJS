import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h1>Navbar</h1>
      <Link to="/cart"> Cart</Link>
      <Link to="/products"> Products</Link>
      <Link to="/checkout"> Checkout</Link>
      <Link to="/"> Home</Link>
    </nav>
  );
}

export default Navbar;