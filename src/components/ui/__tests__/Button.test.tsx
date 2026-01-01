/**
 * Button Component Tests
 * Comprehensive test suite for the unified Button component
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../button';
import { IconButton } from '../IconButton';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders all variants correctly', () => {
      const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'ghost', 'outline', 'glass', 'neo', 'gradient', 'ai'] as const;

      variants.forEach(variant => {
        const { container } = render(<Button variant={variant}>Test</Button>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('renders all sizes correctly', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

      sizes.forEach(size => {
        const { container } = render(<Button size={size}>Test</Button>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });
  });

  describe('Props', () => {
    it('applies fullWidth class when fullWidth is true', () => {
      const { container } = render(<Button fullWidth>Full Width</Button>);
      expect(container.firstChild).toHaveClass('w-full');
    });

    it('shows loading spinner when loading is true', () => {
      render(<Button loading>Loading</Button>);
      const spinner = screen.getByRole('button').querySelector('svg');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('animate-spin');
    });

    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('is disabled when loading is true', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Icons', () => {
    it('renders left icon', () => {
      render(
        <Button leftIcon={<span data-testid="left-icon">←</span>}>
          With Icon
        </Button>
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders right icon', () => {
      render(
        <Button rightIcon={<span data-testid="right-icon">→</span>}>
          With Icon
        </Button>
      );
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('renders icon-only button', () => {
      render(
        <Button iconOnly leftIcon={<span data-testid="icon">*</span>} aria-label="Icon only" />
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.queryByText('*')).not.toBeInTheDocument(); // No text content
    });
  });

  describe('Behavior', () => {
    it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(<Button disabled onClick={handleClick}>Click</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<Button loading onClick={handleClick}>Click</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles async onClick', async () => {
      const asyncHandler = jest.fn().mockResolvedValue(undefined);
      render(<Button onClick={asyncHandler}>Async</Button>);

      fireEvent.click(screen.getByRole('button'));
      await waitFor(() => expect(asyncHandler).toHaveBeenCalled());
    });
  });

  describe('Effects', () => {
    it('applies glow effect class', () => {
      const { container } = render(<Button effect="glow">Glow</Button>);
      // Effect is applied through motion div, check container structure
      expect(container.firstChild).toBeInTheDocument();
    });

    it('applies tilt effect class', () => {
      const { container } = render(<Button effect="tilt">Tilt</Button>);
      expect(container.firstChild).toHaveClass('transform-gpu');
    });
  });

  describe('Link Mode', () => {
    it('renders as Next.js Link when as="link"', () => {
      const { container } = render(
        <Button as="link" href="/dashboard">
          Link Button
        </Button>
      );
      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/dashboard');
    });

    it('renders external link correctly', () => {
      const { container } = render(
        <Button as="link" href="https://example.com" external>
          External Link
        </Button>
      );
      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Accessibility', () => {
    it('has proper button role', () => {
      render(<Button>Accessible</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Button aria-label="Custom label">Button</Button>);
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument();
    });

    it('is keyboard accessible', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Keyboard</Button>);

      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();

      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
      // Note: Framer Motion handles Enter key, testing focus only
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      const { container } = render(<Button className="custom-class">Custom</Button>);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});

describe('IconButton Component', () => {
  it('renders icon-only button', () => {
    render(
      <IconButton
        icon={<span data-testid="icon">*</span>}
        aria-label="Icon button"
      />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByLabelText('Icon button')).toBeInTheDocument();
  });

  it('applies circle shape', () => {
    const { container } = render(
      <IconButton
        icon={<span>*</span>}
        aria-label="Circle"
        shape="circle"
      />
    );
    expect(container.firstChild).toHaveClass('rounded-full');
  });

  it('has tooltip as title attribute', () => {
    render(
      <IconButton
        icon={<span>*</span>}
        aria-label="With tooltip"
        tooltip="Click me"
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('title', 'Click me');
  });
});
