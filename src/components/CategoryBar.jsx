import "./CategoryBar.css";

function CategoryBar({ categories, selectedCategory, onCategorySelect }) {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={
            selectedCategory === category
              ? "category-btn active"
              : "category-btn"
          }
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;