import { useCart } from "../context/UseCart";
import "./Cart.css";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

function Cart() {
  const { cart, setCart } = useCart();
//* Increase quantity of item in cart */
  const increase = (id) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updated);
  };

//* Decrease quantity or remove item if quantity goes to 0 */
  const decrease = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updated);
  };

//* Remove item from cart */
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
//* Calculate total savings from discounts greater than 10%
  const totalSavings = cart.reduce((sum, item) => {
    if (!item.discountPercentage || item.discountPercentage <= 10) return sum;

    const originalPrice =
      item.price / (1 - item.discountPercentage / 100);

    const savedPerItem = (originalPrice - item.price) * item.quantity;

    return sum + savedPerItem;
  }, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
{/* If cart is empty, show message and link to continue shopping. Otherwise, show cart items and summary */}
      {cart.length === 0 ? (
<div className="empty-cart">

  <h2>Your cart is empty</h2>

  <p>Looks like you haven’t added anything yet.</p>

  <Link to="/">
    <button className="shop-btn">
      Continue Shopping
    </button>
  </Link>

</div>
      ) : (
        <>
          <div className="cart-list">
{/* Display each cart item with quantity and total price, and the overall total */}
            {cart.map((item) => {
              const originalPrice =
                item.price / (1 - item.discountPercentage / 100);

              return (
                <div key={item.id} className="cart-item">

                  <img src={item.thumbnail} alt={item.title} />

                  <div className="cart-info">

                    <h3>{item.title}</h3>

                    <div className="cart-price">
                      <p className="sale-price">
                        ${item.price}
                      </p>
{/* Show original price if discount is greater than 10% */}
                      {item.discountPercentage > 10 && (
                        <p className="original-price">
                          ${originalPrice.toFixed(2)}
                        </p>
                      )}
                    </div>

                    <div className="cart-controls">
                      <button onClick={() => decrease(item.id)}>
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => increase(item.id)}>
                        +
                      </button>
                    </div>
{/* Remove item button */}
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <DeleteIcon />
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
{/* Cart summary with total price, savings, and checkout button */}
          <div className="cart-summary">
            <h2>Total: ${total.toFixed(2)}</h2>

            {totalSavings > 0 && (
              <p className="total-savings">
                You saved ${totalSavings.toFixed(2)}!
              </p>
            )}

            <p>Shipping and taxes calculated at checkout.</p>

            <Link to="/checkout">
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;