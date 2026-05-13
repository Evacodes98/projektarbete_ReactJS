import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const value = useCart();
  const navigate = useNavigate();
  const total = value.cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const isEmpty = value.cart.length === 0;
  return (
    <div>
      <h1>Cart</h1>

      {isEmpty ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {value.cart.map((product) => (
            <div key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <h4>{product.title}</h4>
              <p>${product.price.toFixed(2)}</p>
              <p>Quantity: {product.quantity}</p>
              <button
                onClick={() => {
                  const updatedCart = value.cart
                    .map((item) => {
                      if (item.id === product.id) {
                        return { ...item, quantity: item.quantity - 1 };
                      }
                      return item;
                    })
                    .filter((item) => item.quantity > 0);

                  value.setCart(updatedCart);
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ${total.toFixed(2)}</h3>
        </>
      )}

      <button
        onClick={() => {
          if (!isEmpty) navigate("/checkout");
        }}
        disabled={isEmpty}
      >
        Proceed to checkout
      </button>
    </div>
  );
}

export default Cart;
