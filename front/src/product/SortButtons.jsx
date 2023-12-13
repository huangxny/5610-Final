import PropTypes from "prop-types";
const SortButtons = ({ setSortOption, setSortDirection, sortDirection }) => {
  return (
    <div className="sortButtons">
      <button onClick={() => setSortOption("diameter")}>
        Sort by Diameter
      </button>
      <button onClick={() => setSortOption("width")}>Sort by Width</button>
      <button onClick={() => setSortOption("name")}>Sort by Name</button>
      <button onClick={() => setSortOption("price")}>Sort by Price</button>
      <button
        onClick={() =>
          setSortDirection((prevDirection) =>
            prevDirection === "asc" ? "desc" : "asc",
          )
        }
        style={{ backgroundColor: "darkgreen" }}
      >
        {sortDirection === "asc"
          ? "↓ Descending Order ↓"
          : "↑ Ascending Order ↑"}
      </button>
    </div>
  );
};

SortButtons.propTypes = {
  setSortOption: PropTypes.func,
  setSortDirection: PropTypes.func,
  sortDirection: PropTypes.string,
};
export default SortButtons;
