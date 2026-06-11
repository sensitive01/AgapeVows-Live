import React, { useState, useMemo } from 'react';

const CustomTable = ({ columns, data, itemsPerPage = 10, noDataComponent = "No records found.", pagination = true }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ column: null, direction: 'asc' });

  const handleSort = (column) => {
    if (!column.sortable) return;
    
    let direction = 'asc';
    if (sortConfig.column === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ column, direction });
    setCurrentPage(1);
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.column) {
      sortableItems.sort((a, b) => {
        let aValue;
        let bValue;

        if (sortConfig.column.selector) {
          aValue = sortConfig.column.selector(a, 0); // index doesn't matter for sort value usually
          bValue = sortConfig.column.selector(b, 0);
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          // Date string heuristic
          if (aValue.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/) && !isNaN(Date.parse(aValue))) {
             aValue = new Date(aValue).getTime();
             bValue = new Date(bValue).getTime();
          } else {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  
  const paginatedData = pagination 
    ? sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : sortedData;

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead style={{ backgroundColor: "#e0e0e0", borderBottom: "2px solid #cfcfcf" }}>
            <tr>
              {columns.map((col, index) => (
                <th 
                  key={index}
                  style={{ 
                    fontSize: "13px", 
                    fontWeight: "600", 
                    padding: "12px", 
                    textTransform: "uppercase", 
                    color: "#6c757d",
                    cursor: col.sortable ? "pointer" : "default",
                    width: col.width || "auto",
                    minWidth: col.minWidth || "auto",
                    textAlign: col.center ? "center" : "left",
                    whiteSpace: "nowrap"
                  }}
                  onClick={() => handleSort(col)}
                >
                  {col.name} {col.sortable && sortConfig.column === col ? (sortConfig.direction === 'asc' ? '▲' : '▼') : (col.sortable ? '↕' : '')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => {
                const absoluteIndex = pagination ? (currentPage - 1) * itemsPerPage + rowIndex : rowIndex;
                
                return (
                  <tr key={row._id || row.id || rowIndex}>
                    {columns.map((col, colIndex) => {
                       let cellContent;
                       if (col.cell) {
                          cellContent = col.cell(row, absoluteIndex);
                       } else if (col.format) {
                          cellContent = col.format(row, absoluteIndex);
                       } else if (col.selector) {
                          cellContent = col.selector(row, absoluteIndex);
                       }

                       return (
                         <td 
                           key={colIndex}
                           style={{ 
                             padding: "15px", 
                             fontSize: "14px",
                             textAlign: col.center ? "center" : "left",
                             whiteSpace: col.wrap ? "normal" : "nowrap"
                           }}
                         >
                           {cellContent}
                         </td>
                       )
                    })}
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-muted">
                  {noDataComponent}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <div className="d-flex justify-content-between align-items-center p-3 border-top bg-white">
          <span className="text-muted" style={{ fontSize: "14px" }}>
            Showing {paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
          </span>
          <div className="btn-group">
            <button 
              className="btn btn-outline-secondary btn-sm" 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button 
              className="btn btn-outline-secondary btn-sm" 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
