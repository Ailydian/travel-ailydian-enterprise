import React, { useState, useMemo } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';

/**
 * Column definition for DataTable
 */
export interface Column<T> {
  /** Unique key for the column */
  key: string;
  /** Column header label */
  label: string;
  /** Render function for cell content */
  render?: (row: T) => React.ReactNode;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Custom sort function */
  sortFn?: (a: T, b: T) => number;
  /** Column width (CSS class) */
  width?: string;
  /** Whether to hide on mobile */
  hideOnMobile?: boolean;
  /** Alignment */
  align?: 'left' | 'center' | 'right';
}

/**
 * Row action definition
 */
export interface RowAction<T> {
  /** Action label */
  label: string;
  /** Action icon */
  icon?: React.ElementType;
  /** Action handler */
  onClick: (row: T) => void;
  /** Whether action is dangerous (red color) */
  danger?: boolean;
  /** Condition to show/hide action */
  show?: (row: T) => boolean;
}

/**
 * Props for the DataTable component
 */
export interface DataTableProps<T> {
  /** Array of data to display */
  data: T[];
  /** Column definitions */
  columns: Column<T>[];
  /** Row actions */
  rowActions?: RowAction<T>[];
  /** Key extractor for rows */
  keyExtractor: (row: T) => string | number;
  /** Loading state */
  loading?: boolean;
  /** Empty state configuration */
  emptyState?: {
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  };
  /** Enable pagination */
  pagination?: boolean;
  /** Items per page */
  itemsPerPage?: number;
  /** Current page (controlled) */
  currentPage?: number;
  /** Page change handler (controlled) */
  onPageChange?: (page: number) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * DataTable - A comprehensive data table component with sorting, pagination, and responsive design
 *
 * @example
 * ```tsx
 * const columns: Column<User>[] = [
 *   { key: 'name', label: 'Name', sortable: true },
 *   { key: 'email', label: 'Email', sortable: true },
 *   { key: 'role', label: 'Role', render: (user) => <Badge>{user.role}</Badge> },
 * ];
 *
 * const actions: RowAction<User>[] = [
 *   { label: 'Edit', icon: Edit, onClick: handleEdit },
 *   { label: 'Delete', icon: Trash, onClick: handleDelete, danger: true },
 * ];
 *
 * <DataTable
 *   data={users}
 *   columns={columns}
 *   rowActions={actions}
 *   keyExtractor={(user) => user.id}
 *   pagination
 *   itemsPerPage={10}
 * />
 * ```
 */
export function DataTable<T>({
  data,
  columns,
  rowActions,
  keyExtractor,
  loading = false,
  emptyState,
  pagination = false,
  itemsPerPage = 10,
  currentPage: controlledPage,
  onPageChange,
  className = '',
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [internalPage, setInternalPage] = useState(1);
  const [openActionMenu, setOpenActionMenu] = useState<string | number | null>(
    null
  );

  // Use controlled page if provided, otherwise use internal state
  const currentPage = controlledPage ?? internalPage;
  const setCurrentPage = onPageChange ?? setInternalPage;

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    const column = columns.find((col) => col.key === sortKey);
    if (!column?.sortable) return data;

    const sorted = [...data].sort((a, b) => {
      if (column.sortFn) {
        return column.sortFn(a, b);
      }

      const aVal = (a as any)[sortKey];
      const bVal = (b as any)[sortKey];

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal);
      }

      return aVal < bVal ? -1 : 1;
    });

    return sortDirection === 'desc' ? sorted.reverse() : sorted;
  }, [data, sortKey, sortDirection, columns]);

  // Paginate data
  const { paginatedData, totalPages } = useMemo(() => {
    if (!pagination) {
      return { paginatedData: sortedData, totalPages: 1 };
    }

    const total = Math.ceil(sortedData.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return {
      paginatedData: sortedData.slice(start, end),
      totalPages: total,
    };
  }, [sortedData, pagination, currentPage, itemsPerPage]);

  const handleSort = (key: string) => {
    const column = columns.find((col) => col.key === key);
    if (!column?.sortable) return;

    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setOpenActionMenu(null);
    }
  };

  if (loading) {
    return <LoadingState variant="table" count={5} className={className} />;
  }

  if (data.length === 0) {
    return (
      <div className={className}>
        <EmptyState
          title={emptyState?.title || 'No data available'}
          description={emptyState?.description}
          actionLabel={emptyState?.actionLabel}
          onAction={emptyState?.onAction}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-3 text-${column.align || 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      column.width || ''
                    } ${column.sortable ? 'cursor-pointer select-none hover:bg-gray-100' : ''}`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {column.sortable && (
                        <span className="text-gray-400">
                          {sortKey === column.key ? (
                            sortDirection === 'asc' ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )
                          ) : (
                            <ChevronsUpDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {rowActions && rowActions.length > 0 && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((row) => {
                const rowKey = keyExtractor(row);
                return (
                  <tr key={rowKey} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-${column.align || 'left'}`}
                      >
                        {column.render
                          ? column.render(row)
                          : (row as any)[column.key]}
                      </td>
                    ))}
                    {rowActions && rowActions.length > 0 && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="relative inline-block">
                          <button
                            onClick={() =>
                              setOpenActionMenu(
                                openActionMenu === rowKey ? null : rowKey
                              )
                            }
                            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                            aria-label="Row actions"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>

                          {openActionMenu === rowKey && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setOpenActionMenu(null)}
                              />
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                                {rowActions
                                  .filter(
                                    (action) =>
                                      !action.show || action.show(row)
                                  )
                                  .map((action, index) => {
                                    const Icon = action.icon;
                                    return (
                                      <button
                                        key={index}
                                        onClick={() => {
                                          action.onClick(row);
                                          setOpenActionMenu(null);
                                        }}
                                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                                          action.danger
                                            ? 'text-red-600'
                                            : 'text-gray-700'
                                        }`}
                                      >
                                        {Icon && <Icon className="h-4 w-4" />}
                                        <span>{action.label}</span>
                                      </button>
                                    );
                                  })}
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {paginatedData.map((row) => {
          const rowKey = keyExtractor(row);
          return (
            <div
              key={rowKey}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              {columns
                .filter((col) => !col.hideOnMobile)
                .map((column) => (
                  <div key={column.key} className="mb-3 last:mb-0">
                    <div className="text-xs font-medium text-gray-500 mb-1">
                      {column.label}
                    </div>
                    <div className="text-sm text-gray-900">
                      {column.render
                        ? column.render(row)
                        : (row as any)[column.key]}
                    </div>
                  </div>
                ))}
              {rowActions && rowActions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
                  {rowActions
                    .filter((action) => !action.show || action.show(row))
                    .map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => action.onClick(row)}
                          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium ${
                            action.danger
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {Icon && <Icon className="h-4 w-4" />}
                          <span>{action.label}</span>
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, sortedData.length)} of{' '}
            {sortedData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={i}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
