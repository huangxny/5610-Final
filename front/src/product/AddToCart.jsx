import PropTypes from "prop-types";
import "../style/product/AddToCart.css";
function AddToCart({ product_id, cart, setCart, email }) {
  let updatedCart = [...cart];

  function fetchCart() {
    fetch("/cart/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, updatedCart }),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddToCart() {
    if (!email) {
      alert("Please log in to add items to your cart.");
      return;
    }
    updatedCart = [...cart];
    const newItem = [product_id, 1];
    const existingProductIndex = cart.findIndex(
      (item) => item[0] === product_id,
    );

    if (existingProductIndex !== -1) {
      // If the product is already in the cart, update the quantity
      updatedCart[existingProductIndex][1] += 1;
    } else {
      // If the product is not in the cart, add it with quantity 1
      updatedCart.push(newItem);
    }
    setCart(updatedCart);
    fetchCart();
  }

  function handleMinusOne() {
    if (!email) {
      alert("Please log in to add items to your cart.");
      return;
    }
    updatedCart = [...cart];
    const existingProductIndex = cart.findIndex(
      (item) => item[0] === product_id,
    );

    if (existingProductIndex !== -1) {
      // If the product is already in the cart, update the quantity
      updatedCart[existingProductIndex][1] -= 1;
      if (updatedCart[existingProductIndex][1] === 0) {
        updatedCart.splice(existingProductIndex, 1);
      }
    } else {
      // If the product is not in the cart, add it with quantity 1
      alert("This item is not in your cart.");
      return;
    }
    setCart(updatedCart);
    fetchCart();
  }

  function getQuantity() {
    if (updatedCart.length === 0) return 0;
    if (updatedCart.find((item) => item[0] === product_id) === undefined)
      return 0;
    return updatedCart.find((item) => item[0] === product_id)[1];
  }

  return (
    <div className="btnGroup">
      <button onClick={handleAddToCart} className="btn">
        +1
      </button>
      <div>Quantity: {getQuantity()}</div>
      <button onClick={handleMinusOne} className="btn">
        -1
      </button>
    </div>
  );
}

AddToCart.propTypes = {
  product_id: PropTypes.string,
  cart: PropTypes.array,
  setCart: PropTypes.func,
  email: PropTypes.string,
};

export default AddToCart;
