import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import CartBadge from "./CartBadge";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCart } from "../context/CartContext";
import { useEffect, useRef, useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState("");

  const { cart, search, setSearch, products } = useCart();

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, setSearch]);

  const cartCount = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const suggestions = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    )
    .slice(0, 5);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSearch]);

  const categories = [
    "All",
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
  ];

  return (
    <>
      <nav className="navbar">
        {/* LEFT */}
        <div>
          <Link to="/" className="logo-link">
            <h2>Hush Home</h2>
          </Link>
        </div>

        {/* CENTER SEARCH */}
        <div className="InputContainer" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search products..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="input"
          />

          {search && (
            <div className="dropdown">
              {suggestions.length === 0 ? (
                <p>No results</p>
              ) : (
                suggestions.map((item) => (
                  <div
                    key={item.id}
                    className="dropdown-item"
                    onClick={() => {
                      setSearch("");
                      navigate(`/product/${item.id}`);
                    }}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="dropdown-img"
                    />
                    <span>{item.title}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* RIGHT ICONS */}
        <div className="nav-icons">
          <button style={{ padding: "0px" }}>
            <PersonIcon sx={{ fontSize: 30 }} />
          </button>

          <Link to="/wishlist" className="icon-link">
            <FavoriteIcon />
          </Link>

          <Link to="/cart" className="icon-link">
            <CartBadge count={cartCount} />
          </Link>

          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* BACKDROP */}
      <div
        className={`menu-backdrop ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="close-menu" onClick={() => setMenuOpen(false)}>
          ✕
        </button>

        <div className="menu-section">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/?category=${cat}`}
              onClick={() => setMenuOpen(false)}
              className="menu-item"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
