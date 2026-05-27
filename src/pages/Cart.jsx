import { useCart } from "../context/CartContext";
import "./Cart.css";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

function Cart() {
  const { cart, setCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const increase = (id) => {
    const updated = cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updated);
  };

  const decrease = (id) => {
    const updated = cart
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0);

    setCart(updated);
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="cart-page">

      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <div className="cart-list">

            {cart.map(item => (
              <div key={item.id} className="cart-item">

                <img src={item.thumbnail} alt={item.title} />

                <div className="cart-info">
                  <h3>{item.title}</h3>

                  <p>${item.price}</p>

                  <div className="cart-controls">

                    <button onClick={() => decrease(item.id)}>−</button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increase(item.id)}>+</button>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <DeleteIcon />
                  </button>

                </div>

              </div>
            ))}

          </div>

          <div className="cart-summary">
            <h2>Total: ${total.toFixed(2)}</h2>
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