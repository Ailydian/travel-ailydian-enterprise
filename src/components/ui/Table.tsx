/**
 * Table Component - Production-Grade Data Table
 * Features: Sorting, filtering, pagination, row selection, responsive
 * Performance: Virtualization-ready, optimized re-renders
 */

'use client';

import React, { useState, useMemo, useCallback } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface Column<T = any> {
  key: string;
  header: string;
  accessor?: (row: T) => any;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  headerClassName?: string;
  cellClassName?: string;
}

export interface TableProps<T = any> {
  /** Table data */
  data: T[];
  /** Column configuration */
  columns: Column<T>[];
  /** Enable sorting */
  sortable?: boolean;
  /** Enable row selection */
  selectable?: boolean;
  /** Selected rows */
  selectedRows?: string[];
  /** Selection change handler */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Row key accessor */
  rowKey?: (row: T) => string;
  /** Row click handler */
  onRowClick?: (row: T) => void;
  /** Enable pagination */
  paginated?: boolean;
  /** Rows per page */
  pageSize?: number;
  /** Current page */
  currentPage?: number;
  /** Page change handler */
  onPageChange?: (page: number) => void;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Sticky header */
  stickyHeader?: boolean;
  /** Table className */
  className?: string;
  /** Enable striped rows */
  striped?: boolean;
  /** Enable hover effect */
  hoverable?: boolean;
  /** Compact mode */
  compact?: boolean;
}

type SortDirection = 'asc' | 'desc' | null;

interface SortConfig {
  key: string;
  direction: SortDirection;
}

// ============================================================================
// TABLE COMPONENT
// ============================================================================

export function Table<T = any>({
  data,
  columns,
  sortable = true,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  rowKey = (row: any) => row.id,
  onRowClick,
  paginated = false,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
  loading = false,
  emptyMessage = 'No data available',
  stickyHeader = false,
  className = '',
  striped = false,
  hoverable = true,
  compact = false,
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: null });
  const [internalPage, setInternalPage] = useState(currentPage);

  const page = onPageChange ? currentPage : internalPage;

  // ========================================
  // SORTING
  // ========================================

  const handleSort = useCallback((columnKey: string) => {
    setSortConfig((prev) => {
      if (prev.key !== columnKey) {
        return { key: columnKey, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { key: columnKey, direction: 'desc' };
      }
      return { key: '', direction: null };
    });
  }, []);

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return data;

    const column = columns.find((col) => col.key === sortConfig.key);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = column.accessor ? column.accessor(a) : a[sortConfig.key];
      const bValue = column.accessor ? column.accessor(b) : b[sortConfig.key];

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig, columns]);

  // ========================================
  // PAGINATION
  // ========================================

  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData;
    
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, paginated, page, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    } else {
      setInternalPage(newPage);
    }
  };

  // ========================================
  // SELECTION
  // ========================================

  const isAllSelected = paginatedData.length > 0 && 
    paginatedData.every((row) => selectedRows.includes(rowKey(row)));

  const handleSelectAll = () => {
    if (!onSelectionChange) return;

    if (isAllSelected) {
      const pageRowKeys = paginatedData.map(rowKey);
      onSelectionChange(selectedRows.filter((id) => !pageRowKeys.includes(id)));
    } else {
      const pageRowKeys = paginatedData.map(rowKey);
      onSelectionChange([...new Set([...selectedRows, ...pageRowKeys])]);
    }
  };

  const handleSelectRow = (row: T) => {
    if (!onSelectionChange) return;

    const key = rowKey(row);
    if (selectedRows.includes(key)) {
      onSelectionChange(selectedRows.filter((id) => id !== key));
    } else {
      onSelectionChange([...selectedRows, key]);
    }
  };

  // ========================================
  // RENDER HELPERS
  // ========================================

  const getCellValue = (row: T, column: Column<T>) => {
    const value = column.accessor ? column.accessor(row) : row[column.key];
    return column.render ? column.render(value, row) : value;
  };

  const getSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return (
        <svg className="w-4 h-4 text-lydian-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }

    return sortConfig.direction === 'asc' ? (
      <svg className="w-4 h-4 text-lydian-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-lydian-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className={`w-full ${className}`}>
      <div className={`overflow-x-auto rounded-lg border border-lydian-border ${stickyHeader ? 'max-h-[600px] overflow-y-auto' : ''}`}>
        <table className="w-full border-collapse">
          {/* Header */}
          <thead className={`bg-lydian-bg-surface ${stickyHeader ? 'sticky top-0 z-10' : ''}`}>
            <tr>
              {selectable && (
                <th className={`border-b border-lydian-border ${compact ? 'px-3 py-2' : 'px-6 py-3'}`}>
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-lydian-primary border-lydian-border-medium rounded focus:ring-lydian-primary"
                  />
                </th>
              )}
              
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    border-b border-lydian-border text-left font-semibold text-lydian-text-secondary
                    ${compact ? 'px-3 py-2 text-xs' : 'px-6 py-3 text-sm'}
                    ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''}
                    ${column.headerClassName || ''}
                  `}
                  style={{ width: column.width }}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.header}</span>
                    {sortable && column.sortable !== false && (
                      <button
                        onClick={() => handleSort(column.key)}
                        className="hover:opacity-70 transition-opacity"
                        aria-label={`Sort by ${column.header}`}
                      >
                        {getSortIcon(column.key)}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-8 text-center text-lydian-text-muted">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-8 text-center text-lydian-text-muted">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const key = rowKey(row);
                const isSelected = selectedRows.includes(key);

                return (
                  <tr
                    key={key}
                    onClick={() => onRowClick?.(row)}
                    className={`
                      border-b border-lydian-border last:border-0
                      ${striped && rowIndex % 2 === 1 ? 'bg-lydian-bg-surface' : 'bg-lydian-bg'}
                      ${hoverable ? 'hover:bg-blue-50 transition-colors' : ''}
                      ${onRowClick ? 'cursor-pointer' : ''}
                      ${isSelected ? 'bg-blue-100' : ''}
                    `}
                  >
                    {selectable && (
                      <td className={compact ? 'px-3 py-2' : 'px-6 py-4'}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSelectRow(row);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 text-lydian-primary border-lydian-border-medium rounded focus:ring-lydian-primary"
                        />
                      </td>
                    )}

                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`
                          ${compact ? 'px-3 py-2 text-sm' : 'px-6 py-4'}
                          ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''}
                          ${column.cellClassName || ''}
                        `}
                      >
                        {getCellValue(row, column)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginated && !loading && paginatedData.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-lydian-border bg-lydian-bg rounded-b-lg">
          <div className="text-sm text-lydian-text-secondary">
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, sortedData.length)} of {sortedData.length} results
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 rounded border border-lydian-border-medium hover:bg-lydian-bg-surface disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`
                    px-3 py-1 rounded border
                    ${page === pageNum
                      ? 'bg-lydian-primary text-white border-blue-600'
                      : 'border-lydian-border-medium hover:bg-lydian-bg-surface'
                    }
                  `}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border border-lydian-border-medium hover:bg-lydian-bg-surface disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
