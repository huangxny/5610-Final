import PropTypes from "prop-types";
import "../style/product/Pagination.css";

const buttonStyle = {
  background: "#888",
};
const buttonStyleNoma = {};
const Pagination = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - halfVisiblePages);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (currentPage + halfVisiblePages > totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        prev
      </button>
      {getPageNumbers().map((number) => (
        <button
          style={currentPage === number ? buttonStyleNoma : buttonStyle}
          key={number}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  totalItems: PropTypes.number,
  paginate: PropTypes.func,
};

export default Pagination;
