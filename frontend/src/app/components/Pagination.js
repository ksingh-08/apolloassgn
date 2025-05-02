import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, setPage, totalItems, itemsPerPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of visible page range
      let startPage = Math.max(2, page - 1);
      let endPage = Math.min(totalPages - 1, page + 1);
      
      // Adjust if we're near the beginning
      if (page <= 3) {
        endPage = 4;
        // Add ellipsis after if needed
        if (totalPages > 5) pages.push("...");
      } 
      // Adjust if we're near the end
      else if (page >= totalPages - 2) {
        startPage = totalPages - 3;
        // Add ellipsis before
        pages.push("...");
      } 
      // Add ellipsis on both sides
      else {
        pages.push("...");
        pages.push(...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
        pages.push("...");
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-center mt-6" aria-label="Pagination">
      <div className="flex items-center gap-1 mb-3 sm:mb-0 sm:mr-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
          border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        <div className="flex space-x-1">
          {getPageNumbers().map((pageNum, index) => (
            pageNum === "..." ? (
              <span key={`ellipsis-${index}`} className="px-3 py-2">...</span>
            ) : (
              <button
                key={`page-${pageNum}`}
                onClick={() => setPage(pageNum)}
                className={`px-3 py-1 rounded-md min-w-8 text-sm font-medium
                ${page === pageNum 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-700 hover:bg-gray-100 border border-gray-300"}`}
                aria-label={`Page ${pageNum}`}
                aria-current={page === pageNum ? "page" : undefined}
              >
                {pageNum}
              </button>
            )
          ))}
        </div>
        
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
          border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      
      <div className="text-sm text-gray-500">
        Showing page {page} of {totalPages}
      </div>
    </nav>
  );
}