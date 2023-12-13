import { useState, useEffect } from "react";
import Pagination from "./Pagination.jsx";
import SortButtons from "./SortButtons.jsx";
import ProductGridContainer from "./ProductGridContainer.jsx";
import PropTypes from "prop-types";
import "../style/product/ProductDisplay.css";

const ProductDisplay = ({ cart, setCart, email }) => {
  const [products, setProducts] = useState([]);
  /*  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    width: "",
    diameter: "",
    aspectRatio: "",
  });*/
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const itemsPerPage = 21;
  /*  const addProduct = async () => {
    const response = await fetch("/product/tires", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    setProducts([...products, data]);
    setNewProduct({
      name: "",
      price: "",
      width: "",
      diameter: "",
      aspectRatio: "",
    });
  };*/

  /*const removeProduct = async (id) => {
    await fetch(`/product/tires/${id}`, {
      method: "DELETE",
    });
    const updatedTires = products.filter((tire) => tire._id !== id);
    setProducts(updatedTires);
  };*/

  const fetchProduct = async () => {
    fetch(`/product/tires?sort=${sortOption}&order=${sortDirection}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const data = await res.json();
        setProducts(data);
      })
      .catch(() => {
        setProducts([]);
      });
  };

  useEffect(() => {
    fetchProduct().then((r) => console.log(r));
  }, [sortOption, sortDirection, currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="productDisplay">
      <SortButtons
        setSortOption={setSortOption}
        setSortDirection={setSortDirection}
        sortDirection={sortDirection}
      />
      <ProductGridContainer
        products={currentProducts}
        //removeProduct={removeProduct}
        email={email}
        cart={cart}
        setCart={setCart}
      />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={products.length}
        paginate={paginate}
      />
    </div>
  );
};

ProductDisplay.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
  email: PropTypes.string,
};

export default ProductDisplay;
