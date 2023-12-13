import PropTypes from "prop-types";

// for test use only
const AddProduct = ({ newProduct, setNewProduct, addProduct }) => {
  return (
    <div className="add product">
      <input
        type="text"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Width"
        value={newProduct.width}
        onChange={(e) =>
          setNewProduct({ ...newProduct, width: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Diameter"
        value={newProduct.diameter}
        onChange={(e) =>
          setNewProduct({ ...newProduct, diameter: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Aspect Ratio"
        value={newProduct.aspectRatio}
        onChange={(e) =>
          setNewProduct({ ...newProduct, aspectRatio: e.target.value })
        }
      />
      <button onClick={addProduct}>Add Tire</button>
    </div>
  );
};
AddProduct.propTypes = {
  newProduct: PropTypes.object,
  setNewProduct: PropTypes.func,
  addProduct: PropTypes.func,
};

export default AddProduct;
