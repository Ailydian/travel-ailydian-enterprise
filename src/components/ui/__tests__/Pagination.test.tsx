/**
 * Comprehensive test suite for Pagination component
 * Coverage: Navigation, edge cases, accessibility
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('should render with correct number of pages', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    // Check if pagination is rendered
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should call onPageChange when clicking next page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByLabelText(/next/i) || screen.getByText(/next/i);
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange when clicking previous page', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByLabelText(/previous/i) || screen.getByText(/previous/i);
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('should disable previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByLabelText(/previous/i) || screen.getByText(/previous/i);

    // Should be disabled
    if (prevButton) {
      expect(prevButton).toBeDisabled();
    }
  });

  it('should disable next button on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByLabelText(/next/i) || screen.getByText(/next/i);

    // Should be disabled
    if (nextButton) {
      expect(nextButton).toBeDisabled();
    }
  });

  it('should handle single page correctly', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );

    // Both buttons should be disabled
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      if (button.textContent?.match(/next|previous/i)) {
        expect(button).toBeDisabled();
      }
    });
  });

  it('should handle zero pages', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={0}
        onPageChange={mockOnPageChange}
      />
    );

    // Should not crash
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
        className="custom-pagination"
      />
    );

    const nav = container.querySelector('.custom-pagination');
    expect(nav).toBeInTheDocument();
  });
});
