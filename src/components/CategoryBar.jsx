import "./CategoryBar.css";
import { Link } from "react-router-dom";

function CategoryBar({ categories, selectedCategory, }) {
  return (
    <div className="category-bar">
      {categories.map((category) => (
  <Link
    key={category}
    to={`/?category=${category}`}
    className={
      selectedCategory === category
        ? "category-btn active"
        : "category-btn"
    }
  >
    {category}
  </Link>
))}
    </div>
  );
}

export default CategoryBar;