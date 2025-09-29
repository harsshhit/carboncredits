import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  onItemsPerPageChange,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      flexWrap: 'wrap',
      gap: '1rem',
      marginTop: '2rem',
      padding: '1rem 1.25rem',
      background: 'transparent',
      borderRadius: '12px',
      borderTop: '1px solid var(--royal-black-lighter)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem',
        color: 'var(--gray-100)'
      }}>
        <span>Show</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          style={{ minWidth: '80px' }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>per page</span>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem' 
      }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: '0.5rem 0.875rem',
            fontSize: '0.875rem',
            opacity: currentPage === 1 ? 0.5 : 1,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Previous
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem',
              background: page === currentPage 
                ? 'var(--accent)' 
                : 'transparent',
              color: page === currentPage 
                ? 'var(--royal-black)' 
                : 'var(--accent)',
              border: `1px solid ${page === currentPage ? 'var(--accent)' : 'var(--royal-black-lighter)'}`
            }}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: '0.5rem 0.875rem',
            fontSize: '0.875rem',
            opacity: currentPage === totalPages ? 0.5 : 1,
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
          }}
        >
          Next
        </button>
      </div>

      <div style={{ color: 'var(--gray-100)' }}>
        Showing {startItem} to {endItem} of {totalItems} credits
      </div>
    </div>
  );
};

export default Pagination;
