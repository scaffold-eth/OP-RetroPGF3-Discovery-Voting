import React from "react";

interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPagination> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPaginationItems = () => {
    const pageRange = 5; // Number of pages to display at a time
    const halfRange = Math.floor(pageRange / 2);
    const startPage = Math.max(1, currentPage - halfRange);
    const endPage = Math.min(totalPages, startPage + pageRange - 1);

    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    return (
      <>
        {currentPage > 1 && (
          <button
            className="px-4 py-2 rounded-md font-normal text-base leading-6 font-inter bg-customWhite text-lightBlack hover:bg-customWhite"
            onClick={() => onPageChange(1)}
          >
            First
          </button>
        )}
        {prevPage && (
          <button
            className="px-4 py-2 rounded-md font-normal text-base leading-6 font-inter bg-customWhite text-lightBlack hover:bg-customWhite"
            onClick={() => onPageChange(prevPage)}
          >
            Previous
          </button>
        )}
        {pages.map(page => (
          <button
            key={page}
            className={`px-4 py-2 rounded-md font-normal text-base leading-6 font-inter ${
              currentPage === page
                ? "bg-[#FF0520] text-white"
                : "border border-gray-300 bg-base-100 hover:bg-customWhite"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            className="px-4 py-2 rounded-md font-normal text-base leading-6 font-inter bg-customWhite text-lightBlack hover:bg-customWhite"
            onClick={() => onPageChange(totalPages)}
          >
            Last
          </button>
        )}

        {totalPages > 1 && (
          <button
            disabled={!nextPage}
            className={`px-4 py-2 rounded-md font-normal text-base leading-6 font-inter border border-gray-300 ${
              !nextPage
                ? "bg-gray-300 dark:text-white cursor-not-allowed hover:bg-gray-300 hover:text-gray-500"
                : "bg-base-100 hover:bg-customWhite"
            }`}
            onClick={() => onPageChange(nextPage ? nextPage : 1)}
          >
            Next
          </button>
        )}
      </>
    );
  };
  return <div className="flex space-x-2  py-16 px-4 justify-end">{renderPaginationItems()}</div>;
};

export default Pagination;
