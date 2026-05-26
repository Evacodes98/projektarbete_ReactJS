import { Link } from "react-router-dom";
import "./Navbar.css";  
import CartBadge from "./CartBadge";
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useCart } from "../context/CartContext";
import {useNavigate} from "react-router-dom";
import { useEffect, useRef } from "react";


function Navbar() {
  const { cart, search, setSearch, products } = useCart();
const cartCount = cart.reduce((sum, item) => {
  return sum + item.quantity;
}, 0);
const suggestions = products.filter((product) =>
  product.title.toLowerCase().includes(search.toLowerCase())
).slice(0, 5);
const dropdownRef = useRef(null);
useEffect(() => {
  function handleClickOutside(event) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setSearch("");
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [setSearch]);

const navigate = useNavigate();
  return (
<nav className="navbar">
  <div>
    <Link to="/" className="logo-link"> 
      <h2>Hush Home</h2>
    </Link>
  </div>

    <div className="InputContainer" ref={dropdownRef}>
      <input type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="input"/>

      {search && (
        <div className="dropdown">
          {(suggestions ?? []).length === 0 ? (
            <p>No results</p>
          ) : (
            (suggestions ?? []).map((item) => (
              <div key={item.id} className="dropdown-item" onClick={() => {
                setSearch('');
                navigate(`/product/${item.id}`);
              }}>
                <img src={item.thumbnail} alt={item.title} className="dropdown-img" />
                <span>{item.title}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>

  <div>
    <button style={{ padding: '0px' }}><PersonIcon /></button>
    <button style={{ padding: '10px' }}><FavoriteIcon /></button>
    <Link to="/cart" className="icon-link">
      <CartBadge count={cartCount} />
    </Link>
  </div>
</nav>
  );
  
}

export default Navbar;