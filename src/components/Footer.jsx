import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-grid">

          {/* Brand section */}
          <div className="footer-brand">
            <h2>Hush Home</h2>

            <p>
              Modern shopping made simple. Discover products
              you'll love with a clean and seamless experience.
            </p>

            <div className="social-icons">
              <a href="#">X</a>
              <a href="#">F</a>
              <a href="#">I</a>
              <a href="#">G</a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4>Company</h4>

            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4>Help</h4>

            <ul>
              <li><a href="#">Support</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4>Newsletter</h4>

            <p>Subscribe for updates and offers.</p>

            <form>
              <input
                type="email"
                placeholder="Enter your email"
              />

              <button type="submit">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 Hush Home. All rights reserved.</p>
        </div>

      </div>

    </footer>
  );
}

export default Footer;