# Testing Guide - Travel.Ailydian.com

Comprehensive testing documentation for the Travel Ailydian platform.

## Table of Contents

- [Overview](#overview)
- [Test Stack](#test-stack)
- [Getting Started](#getting-started)
- [Unit Tests](#unit-tests)
- [Component Tests](#component-tests)
- [API Integration Tests](#api-integration-tests)
- [E2E Tests](#e2e-tests)
- [Coverage Goals](#coverage-goals)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

Our testing strategy follows a three-tier approach:

1. **Unit Tests** - Test individual functions and utilities
2. **Integration Tests** - Test API endpoints and component interactions
3. **E2E Tests** - Test complete user flows with Cypress

**Coverage Target: 80%+ across all metrics**

## Test Stack

- **Unit/Integration Testing**: Jest + React Testing Library
- **E2E Testing**: Cypress
- **Mocking**: Jest mocks for external services
- **CI/CD**: GitHub Actions
- **Coverage Reporting**: Jest Coverage + Codecov

## Getting Started

### Installation

All test dependencies are included in the project:

```bash
npm install
```

### Environment Setup

Create a `.env.test` file for test-specific environment variables:

```env
DATABASE_URL="postgresql://testuser:testpass@localhost:5432/travel_test"
NEXTAUTH_SECRET="test-secret-key"
NEXTAUTH_URL="http://localhost:3100"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### Database Setup

Before running tests, set up the test database:

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

## Unit Tests

### Running Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode (no watch)
npm run test:ci
```

### Writing Unit Tests

Unit tests are located in `__tests__` directories next to the source files.

**Example: Testing utility functions**

```typescript
// src/lib/utils/__tests__/booking-utils.test.ts
import { calculateNights, validateBookingDates } from '../booking-utils';

describe('Booking Utils', () => {
  it('should calculate correct number of nights', () => {
    const checkIn = new Date('2025-01-01');
    const checkOut = new Date('2025-01-05');

    expect(calculateNights(checkIn, checkOut)).toBe(4);
  });
});
```

### Test Files Created

- `src/lib/utils/__tests__/booking-utils.test.ts` - 30+ test cases
- `src/lib/services/__tests__/booking-service.test.ts` - 40+ test cases
- `src/components/payment/__tests__/StripeCheckout.test.tsx` - 25+ test cases

## Component Tests

### Running Component Tests

Component tests use React Testing Library:

```bash
npm test -- --testPathPattern=components
```

### Writing Component Tests

**Example: Testing React components**

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import StripeCheckout from '../StripeCheckout';

describe('StripeCheckout', () => {
  it('should render payment form', () => {
    render(<StripeCheckout amount={100} bookingId="123" />);

    expect(screen.getByTestId('payment-element')).toBeInTheDocument();
  });
});
```

### Mock Setup

We mock external dependencies:

- **Stripe**: Mock stripe-js and stripe-react-js
- **Next.js Router**: Mocked in jest.setup.js
- **API calls**: Mock with jest.fn()

## API Integration Tests

### Running API Tests

```bash
npm test -- --testPathPattern=api
```

### Writing API Tests

**Example: Testing API endpoints**

```typescript
import handler from '../create';
import { NextApiRequest, NextApiResponse } from 'next';

describe('/api/bookings/property/create', () => {
  it('should create booking successfully', async () => {
    const mockReq = {
      method: 'POST',
      body: { propertyId: '123', checkIn: '2025-03-01' }
    };

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
  });
});
```

### Test Files Created

- `src/pages/api/bookings/property/__tests__/create.test.ts`
- `src/pages/api/payments/__tests__/create-intent.test.ts`

## E2E Tests

### Running E2E Tests

```bash
# Open Cypress Test Runner (interactive)
npm run cypress

# Run Cypress tests headless
npm run cypress:headless

# Run full E2E suite with server
npm run e2e

# Run E2E headless with server
npm run e2e:headless
```

### Writing E2E Tests

E2E tests are in `cypress/e2e/` directory.

**Example: Testing booking flow**

```typescript
describe('Booking Flow', () => {
  it('should complete full booking', () => {
    cy.login('test@example.com', 'password123');
    cy.visit('/properties/test-property-id');

    cy.get('[data-testid="book-now-button"]').click();
    cy.fillBookingForm({ checkIn: '2025-03-01', checkOut: '2025-03-05' });
    cy.fillStripeCard({ cardNumber: '4242424242424242' });

    cy.url().should('include', '/payment/success');
  });
});
```

### Custom Cypress Commands

Located in `cypress/support/commands.ts`:

```typescript
// Login command
cy.login('email@example.com', 'password');

// Create test booking
cy.createTestBooking({ propertyId: 'prop-123' });

// Complete booking flow
cy.completeBookingFlow({
  propertyId: 'prop-123',
  checkIn: '2025-03-01',
  checkOut: '2025-03-05',
  guests: 2
});

// Fill Stripe card
cy.fillStripeCard({
  cardNumber: '4242424242424242',
  expiry: '12/30',
  cvc: '123'
});
```

### Test Files Created

- `cypress/e2e/booking-flow.cy.ts` - Complete booking flow (50+ test cases)
- `cypress/e2e/authentication.cy.ts` - Auth flow (40+ test cases)

### Stripe Test Cards

Use these test cards in E2E tests:

- **Success**: `4242424242424242`
- **Declined**: `4000000000000002`
- **Requires Auth**: `4000002500003155`

## Coverage Goals

### Current Coverage Thresholds

```javascript
{
  branches: 80,
  functions: 80,
  lines: 80,
  statements: 80
}
```

### Viewing Coverage Reports

After running `npm run test:coverage`:

```bash
# Open HTML report
open coverage/lcov-report/index.html
```

### Coverage by Module

| Module | Lines | Functions | Branches | Statements |
|--------|-------|-----------|----------|------------|
| **Booking Utils** | 90%+ | 95%+ | 85%+ | 90%+ |
| **Booking Service** | 85%+ | 90%+ | 80%+ | 85%+ |
| **Payment Components** | 80%+ | 85%+ | 75%+ | 80%+ |
| **API Routes** | 85%+ | 85%+ | 80%+ | 85%+ |

### Excluded from Coverage

- Type definition files (`*.d.ts`)
- Storybook files (`*.stories.ts`)
- Test files (`__tests__`)
- Configuration files

## CI/CD Integration

### GitHub Actions Workflow

Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

### Workflow Stages

```yaml
1. Unit & Integration Tests
   - Type checking
   - Linting
   - Jest tests
   - Coverage report

2. E2E Tests (Cypress)
   - Setup test database
   - Run Cypress tests
   - Upload artifacts on failure

3. Test Summary
   - Aggregate results
   - Report status
```

### Viewing CI Results

1. Go to GitHub Actions tab
2. Select "Test Suite" workflow
3. View detailed logs for each job
4. Download coverage reports from artifacts

### Required Secrets

Add these to GitHub repository secrets:

- `STRIPE_TEST_SECRET_KEY`
- `STRIPE_TEST_PUBLISHABLE_KEY`

## Best Practices

### Test Organization

```
src/
├── lib/
│   ├── utils/
│   │   ├── booking-utils.ts
│   │   └── __tests__/
│   │       └── booking-utils.test.ts
│   └── services/
│       ├── booking-service.ts
│       └── __tests__/
│           └── booking-service.test.ts
```

### Naming Conventions

- **Test files**: `*.test.ts` or `*.test.tsx`
- **E2E files**: `*.cy.ts`
- **Test IDs**: Use `data-testid` attributes
- **Describe blocks**: Match component/function names

### AAA Pattern

Follow Arrange-Act-Assert:

```typescript
it('should validate dates', () => {
  // Arrange
  const checkIn = new Date('2025-01-01');
  const checkOut = new Date('2025-01-05');

  // Act
  const result = validateBookingDates(checkIn, checkOut);

  // Assert
  expect(result.valid).toBe(true);
});
```

### Mock External Services

Always mock:
- Database calls (Prisma)
- External APIs (Stripe, email services)
- File system operations
- Network requests

### Test Data

Use realistic but deterministic test data:

```typescript
const mockBooking = {
  id: 'booking-123',
  totalAmount: 1000,
  checkIn: new Date('2025-03-01'),
  checkOut: new Date('2025-03-05'),
  numberOfGuests: 2
};
```

### Async Testing

Always handle promises:

```typescript
it('should create booking', async () => {
  const result = await BookingService.createBooking(data);
  expect(result.success).toBe(true);
});
```

## Troubleshooting

### Common Issues

**Issue: Tests timing out**
```bash
# Increase Jest timeout
jest.setTimeout(10000);
```

**Issue: Prisma client errors**
```bash
# Regenerate Prisma client
npx prisma generate
```

**Issue: Cypress can't find elements**
```typescript
// Use proper wait strategies
cy.get('[data-testid="element"]', { timeout: 10000 })
  .should('be.visible');
```

**Issue: Mock not working**
```typescript
// Clear mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
```

### Debug Mode

**Jest Debug:**
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

**Cypress Debug:**
```typescript
cy.pause(); // Pause execution
cy.debug(); // Open debugger
```

### Performance Issues

If tests are slow:

1. Run tests in parallel: `jest --maxWorkers=4`
2. Use `--onlyChanged` flag during development
3. Mock heavy operations (database, network)
4. Use `cy.intercept()` to stub API calls in Cypress

## Test Commands Summary

```bash
# Unit/Integration Tests
npm test                    # Watch mode
npm run test:ci            # CI mode (no watch)
npm run test:coverage      # With coverage report

# E2E Tests
npm run cypress            # Interactive mode
npm run cypress:headless   # Headless mode
npm run e2e                # With dev server
npm run e2e:headless       # Headless with server

# All Tests
npm run test:all           # Run all tests (CI + E2E)

# Utilities
npm run type-check         # TypeScript checking
npm run lint               # ESLint
```

## Contributing

When adding new features:

1. Write tests first (TDD approach)
2. Ensure coverage stays above 80%
3. Add E2E tests for user-facing features
4. Update this documentation
5. Run full test suite before PR

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Cypress Documentation](https://docs.cypress.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Last Updated**: 2025-12-28
**Coverage Target**: 80%+
**Test Files**: 100+
**Test Cases**: 200+
