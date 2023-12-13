import { useState, useEffect } from "react";
import AddToCart from "../product/AddToCart.jsx";
import "../style/cart/CartPage.css";
import PropTypes from "prop-types";

function CartPage({ cart, setCart, email }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product details for each item in the cart
    fetchCartItems().then(() => {
      setLoading(false);
    });
  }, [cart]);
  const fetchCartItems = async () => {
    const itemsWithDetails = [];

    for (let item of cart) {
      const response = await fetch(`/product/tires/${item[0]}`); // Assuming you have an API endpoint to fetch product details by ID
      const product = await response.json();
      if (product) itemsWithDetails.push({ ...product, quantity: item[1] });
    }

    // Calculate total price
    const total = itemsWithDetails.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    setTotalPrice(total);
    setCartItems(itemsWithDetails);
  };

  return (
    <div className="cart">
      {loading && <div>Loading...</div>} {/* Show loading label */}
      {!loading && cartItems.length > 0 && (
        <div>
          <ul>
            {cartItems.map((product) => (
              <li key={product._id} className="cartItem">
                <p>Name: {product.name}</p>
                <p>
                  {" "}
                  {product.width}/{product.aspectRatio}R{product.diameter} - $
                  {product.price}
                </p>
                <p>(Quantity: {product.quantity})</p>
                <AddToCart
                  product_id={product._id}
                  email={email}
                  cart={cart}
                  setCart={setCart}
                />
              </li>
            ))}
          </ul>
          <div>Total Price: ${totalPrice.toFixed(2)}</div>
        </div>
      )}
      {!loading && cartItems.length === 0 && <div>No items in the cart.</div>}
    </div>
  );
}

CartPage.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
  email: PropTypes.string,
};
export default CartPage;
