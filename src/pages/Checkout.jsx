import { useCart } from "../context/CartContext";
import { useState } from "react";

function Checkout() {
  const { cart, setCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  const [form, setForm] = useState({
  name: "",
  email: "",
  address: ""
});
const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
};

return (
  <div>
    <h1>Checkout</h1>

    {cart.length === 0 ? (
      <p>Your cart is empty</p>
    ) : (
      <>
        <h2>Order Summary</h2>

        {cart.map(item => (
          <div key={item.id}>
            <h4>{item.title}</h4>
            <p>Quantity: {item.quantity}</p>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}

        <h3>Total: ${total.toFixed(2)}</h3>

        <div>
          <h3>Shipping details</h3>

          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        </div>

        <button
          onClick={() => {
            if (!form.name || !form.email || !form.address) {
              alert("Please fill in all fields");
              return;
            }

            setCart([]);
            setOrderPlaced(true);
          }}
        >
          Place Order
        </button>
      </>
    )}

    {orderPlaced && (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px"
        }}>
          <h2>🎉 Order Confirmed!</h2>

          <p>Thank you, {form.name}!</p>
          <p>An confirmation email has been sent to {form.email}.</p>


          <button onClick={() => setOrderPlaced(false)}>
            Close
          </button>
        </div>
      </div>
    )}
  </div>
);
}

export default Checkout;