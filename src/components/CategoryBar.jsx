import "./CategoryBar.css";
import { Link } from "react-router-dom";

//* CategoryBar component for filtering products by category. Uses React Router's Link to update URL search parameters for category selection. */
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