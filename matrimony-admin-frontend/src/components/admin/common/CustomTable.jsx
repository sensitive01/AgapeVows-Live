import React, { useState, useMemo, useEffect, useRef } from 'react';

const CustomTable = ({ columns, data, itemsPerPage = 10, noDataComponent = "No records found.", pagination = true, onRowClicked, pointerOnHover }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ column: null, direction: 'asc' });
  const [columnWidths, setColumnWidths] = useState({});
  const thRefs = useRef({});

  // Manual resize states
  const [resizingCol, setResizingCol] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const handleResizeStart = (e, colName) => {
    e.stopPropagation();
    const th = thRefs.current[colName];
    if (th) {
      setResizingCol(colName);
      setStartX(e.clientX);
      setStartWidth(th.offsetWidth);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (resizingCol) {
        const diffX = e.clientX - startX;
        setColumnWidths(prev => ({
          ...prev,
          [resizingCol]: Math.max(50, startWidth + diffX)
        }));
      }
    };

    const handleMouseUp = () => {
      setResizingCol(null);
    };

    if (resizingCol) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingCol, startX, startWidth]);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      setColumnWidths(prev => {
        let changed = false;
        const next = { ...prev };
        for (let entry of entries) {
          const colName = entry.target.getAttribute('data-colname');
          if (colName) {
            const width = entry.target.offsetWidth;
            if (next[colName] !== width) {
              next[colName] = width;
              changed = true;
            }
          }
        }
        return changed ? next : prev;
      });
    });

    Object.values(thRefs.current).forEach(node => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

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

  const hasWidths = Object.keys(columnWidths).length > 0;
  let tableWidth = '100%';
  if (hasWidths) {
    const sum = Object.values(columnWidths).reduce((acc, val) => acc + val, 0);
    tableWidth = `${sum}px`;
  }

  return (
    <div>
      <div className="table-responsive custom-scroll-container" style={{ overflowX: 'auto', width: '100%', maxWidth: '100%', display: 'block' }}>
        <table className="table table-hover align-middle mb-0" style={{ tableLayout: 'fixed', width: tableWidth, minWidth: '100%' }}>
          <thead style={{ backgroundColor: "#e0e0e0", borderBottom: "2px solid #cfcfcf" }}>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  ref={el => thRefs.current[col.name] = el}
                  data-colname={col.name}
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    padding: "12px",
                    textTransform: "uppercase",
                    color: "#6c757d",
                    cursor: col.sortable ? "pointer" : "default",
                    width: columnWidths[col.name] ? `${columnWidths[col.name]}px` : (col.width || "auto"),
                    minWidth: "50px",
                    textAlign: col.center ? "center" : "left",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    position: "relative",
                    borderRight: "1px solid #dcdcdc",
                  }}
                  onClick={() => handleSort(col)}
                >
                  {col.name} {col.sortable && sortConfig.column === col ? (sortConfig.direction === 'asc' ? '▲' : '▼') : (col.sortable ? '↕' : '')}

                  {/* Custom Full-Height Resize Handle */}
                  <div
                    onMouseDown={(e) => handleResizeStart(e, col.name)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "15px",
                      height: "100%",
                      cursor: "col-resize",
                      zIndex: 1,
                    }}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => {
                const absoluteIndex = pagination ? (currentPage - 1) * itemsPerPage + rowIndex : rowIndex;

                return (
                  <tr 
                    key={row._id || row.id || rowIndex}
                    onClick={() => onRowClicked && onRowClicked(row)}
                    style={{ cursor: pointerOnHover ? 'pointer' : 'default' }}
                  >
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
                            whiteSpace: col.wrap ? "normal" : "nowrap",
                            maxWidth: columnWidths[col.name] ? `${columnWidths[col.name]}px` : undefined,
                            overflow: "visible",
                            textOverflow: "clip"
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
