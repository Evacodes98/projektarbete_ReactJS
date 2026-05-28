import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Checkout.css";
import { useState } from "react";
import Confetti from 'react-confetti-boom';

function Checkout() {
  const { cart } = useCart();

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Valid email required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.zip.trim()) newErrors.zip = "ZIP code is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setShowSuccess(true);
  };

  return (
    <>
      <div className="checkout-page">
        <h1>Checkout</h1>

        <div className="checkout-grid">
          {/* LEFT - FORM */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Shipping Details</h2>

            <input
              name="name"
              placeholder={errors.name || "Full name"}
              value={form.name}
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}
            />

            <input
              name="email"
              placeholder={errors.email || "Email"}
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />

            <input
              name="address"
              placeholder={errors.address || "Address"}
              value={form.address}
              onChange={handleChange}
              className={errors.address ? "input-error" : ""}
            />

            <div className="row">
              <input
                name="city"
                placeholder={errors.city || "City"}
                value={form.city}
                onChange={handleChange}
                className={errors.city ? "input-error" : ""}
              />

              <input
                name="zip"
                placeholder={errors.zip || "ZIP"}
                value={form.zip}
                onChange={handleChange}
                className={errors.zip ? "input-error" : ""}
              />
            </div>

            <h2>Payment</h2>

            <div className="payment-box">
              <label>
                <input type="radio" name="payment" defaultChecked />
                Card (Demo)
              </label>

              <label>
                <input type="radio" name="payment" />
                PayPal (Demo)
              </label>
            </div>

            <button className="place-order-btn">Place Order</button>
          </form>

          {/* RIGHT - SUMMARY */}
          <div className="checkout-summary">
            <h2>Order Summary</h2>

            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <span>
                  {item.title} × {item.quantity}
                </span>

                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="summary-total">
              <h3>Total</h3>
              <h3>${total.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL (OUTSIDE PAGE CONTAINER) */}
      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>🎉 Order Confirmed</h2>
            <p>Thank you for your purchase!</p>

            <Link
              to="/"
              onClick={() => setShowSuccess(false)}
              className="modal-btn"
            >
              Continue Shopping
            </Link>
            <Confetti />
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
