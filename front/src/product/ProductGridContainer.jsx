import AddToCart from "./AddToCart.jsx";
import PropTypes from "prop-types";
import pic from "../assets/images/tire.jpg";
import "../style/product/ProductGridContainer.css";
const ProductGridContainer = ({
  products,
  //removeProduct,
  email,
  cart,
  setCart,
}) => {
  return (
    <ul className="gridContainer">
      {products.map((product) => (
        <li className="item" key={product._id}>
          <p>
            <img
              src={pic}
              alt=""
              width="100%"
              height={140}
              style={{ objectFit: "cover" }}
            />
          </p>
          <p>Name: {product.name}</p>
          <p>
            {product.width}/{product.aspectRatio}R{product.diameter}
          </p>
          <p>${product.price}</p>
          <AddToCart
            product_id={product._id}
            email={email}
            cart={cart}
            setCart={setCart}
          />
        </li>
      ))}
    </ul>
  );
};

ProductGridContainer.propTypes = {
  products: PropTypes.array,
  removeProduct: PropTypes.func,
  email: PropTypes.string,
  cart: PropTypes.array,
  setCart: PropTypes.func,
};
export default ProductGridContainer;
