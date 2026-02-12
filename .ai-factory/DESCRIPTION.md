# Project: Angular E-commerce Application

## Overview
A modern e-commerce application built with Angular 21, featuring a complete shopping experience with product browsing, cart management, and checkout functionality. The application follows Angular best practices with standalone components, signal-based state management, and comprehensive testing coverage.

## Core Features
- **Product Catalog**: Browse and view product listings with detailed information
- **Shopping Cart**: Add, remove, and manage items in the cart
- **Checkout Process**: Complete purchase flow with form validation
- **Dashboard**: Admin/user dashboard for managing orders and preferences
- **Responsive Design**: Mobile-first, responsive UI

## Tech Stack
- **Language**: TypeScript 5.9.2
- **Framework**: Angular 21.0.0 (standalone components, signals)
- **State Management**: Angular Signals (reactive state)
- **Routing**: Angular Router with lazy loading
- **Forms**: Angular Reactive Forms
- **Testing**: 
  - Unit/Component: Vitest 4.0.8
  - E2E: Cypress 15.10.0 with Cucumber (Badeball preprocessor)
- **Code Quality**:
  - Linting: ESLint 9.19.0 with angular-eslint
  - Formatting: Prettier 3.8.1
  - Git Hooks: Husky 9.1.7
- **Build**: Angular CLI 21.0.5 with esbuild

## Architecture Notes

### Feature-Based Structure
The application follows a feature-based architecture with clear separation of concerns:
- `src/app/products/` - Product catalog and listing
- `src/app/cart/` - Shopping cart functionality
- `src/app/checkout/` - Checkout and payment flow
- `src/app/dashboard/` - User/admin dashboard
- `src/app/core/` - Shared services, guards, and utilities

### Modern Angular Patterns
- **Standalone Components**: No NgModules, using standalone component architecture
- **Signal-Based Reactivity**: Leveraging Angular Signals for reactive state management
- **OnPush Change Detection**: Optimized performance with OnPush strategy
- **Functional Guards**: Modern route guards using functional approach
- **Typed Forms**: Strongly typed reactive forms

### Testing Strategy
- **Unit Tests**: Component and service testing with Vitest
- **Integration Tests**: Feature testing with TestBed
- **E2E Tests**: User journey testing with Cypress + Cucumber BDD
- **Coverage**: Comprehensive test coverage with @vitest/coverage-v8

## Non-Functional Requirements
- **Performance**: Lazy loading routes, optimized bundle size (max 1MB initial)
- **Code Quality**: ESLint + Prettier enforced via Husky pre-commit hooks
- **Type Safety**: Strict TypeScript configuration
- **Testing**: Minimum 80% code coverage target
- **Accessibility**: WCAG 2.1 AA compliance
- **Browser Support**: Modern browsers (ES2022+)

## Development Workflow
1. **Local Development**: `npm start` (ng serve on port 4200)
2. **Testing**: `npm test` (Vitest) and `npm run e2e` (Cypress)
3. **Linting**: `npm run lint` (auto-fix with ESLint)
4. **Formatting**: `npm run format` (Prettier)
5. **Pre-commit**: Husky runs lint + format checks

## Project Structure
```
src/app/
├── core/           # Singleton services, guards, interceptors
├── products/       # Product catalog feature
├── cart/           # Shopping cart feature
├── checkout/       # Checkout flow feature
├── dashboard/      # Dashboard feature
├── app.routes.ts   # Route configuration
└── app.config.ts   # Application configuration
```
