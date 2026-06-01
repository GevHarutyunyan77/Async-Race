interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

function Pagination({ currentPage, totalPages, onPageChange, disabled = false }: PaginationProps) {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button type="button" onClick={handlePrev} disabled={disabled || currentPage <= 1}>
        PREV
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button type="button" onClick={handleNext} disabled={disabled || currentPage >= totalPages}>
        NEXT
      </button>
    </div>
  );
}

export default Pagination;
