---
name: angular-vitest
description: Testing patterns for Angular applications using Vitest. Use when writing unit tests, component tests, or integration tests with Vitest. Covers TestBed setup, component testing with signals, service mocking, and async testing.
argument-hint: [component-or-service-name]
allowed-tools: Read Write Grep
metadata:
  author: ai-factory
  version: "1.0"
  category: testing
---

# Angular + Vitest Testing Patterns

Modern testing patterns for Angular 21+ applications using Vitest as the test runner.

## Setup

### vitest.config.ts
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['**/*.spec.ts', '**/*.config.ts', '**/main.ts']
    }
  }
});
```

### src/test-setup.ts
```typescript
import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
```

## Component Testing

### Basic Component Test
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../services/product.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [ProductService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display products', () => {
    const compiled = fixture.nativeElement;
    const productElements = compiled.querySelectorAll('.product-card');
    expect(productElements.length).toBeGreaterThan(0);
  });
});
```

### Testing Components with Signals
```typescript
import { signal } from '@angular/core';

describe('CartComponent with Signals', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [CartService]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
  });

  it('should update when cart items change', () => {
    // Initial state
    expect(component.itemCount()).toBe(0);
    
    // Add item
    cartService.addItem({ id: '1', name: 'Product 1', price: 10 });
    fixture.detectChanges();
    
    // Signal should update
    expect(component.itemCount()).toBe(1);
  });

  it('should compute total correctly', () => {
    cartService.addItem({ id: '1', name: 'Product 1', price: 10 });
    cartService.addItem({ id: '2', name: 'Product 2', price: 20 });
    fixture.detectChanges();
    
    expect(component.subtotal()).toBe(30);
    expect(component.tax()).toBe(3); // 10% tax
    expect(component.total()).toBe(33);
  });
});
```

### Testing OnPush Components
```typescript
describe('OnPush Component', () => {
  it('should detect changes with OnPush strategy', () => {
    const fixture = TestBed.createComponent(ProductCardComponent);
    const component = fixture.componentInstance;
    
    // Set input
    component.product = { id: '1', name: 'Test', price: 10 };
    
    // Manually trigger change detection
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.product-name').textContent).toBe('Test');
  });
});
```

## Service Testing

### Basic Service Test
```typescript
import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add items to cart', () => {
    const product = { id: '1', name: 'Product 1', price: 10 };
    service.addItem(product);
    
    expect(service.items().length).toBe(1);
    expect(service.itemCount()).toBe(1);
  });

  it('should update quantity of existing item', () => {
    const product = { id: '1', name: 'Product 1', price: 10 };
    service.addItem(product);
    service.addItem(product);
    
    expect(service.items().length).toBe(1);
    expect(service.items()[0].quantity).toBe(2);
  });

  it('should remove items from cart', () => {
    const product = { id: '1', name: 'Product 1', price: 10 };
    service.addItem(product);
    service.removeItem('1');
    
    expect(service.items().length).toBe(0);
  });

  it('should calculate totals correctly', () => {
    service.addItem({ id: '1', name: 'Product 1', price: 10 });
    service.addItem({ id: '2', name: 'Product 2', price: 20 });
    
    expect(service.subtotal()).toBe(30);
    expect(service.tax()).toBe(3);
    expect(service.total()).toBe(33);
  });
});
```

### Testing HTTP Services
```typescript
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ProductService HTTP', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch products', async () => {
    const mockProducts = [
      { id: '1', name: 'Product 1', price: 10 },
      { id: '2', name: 'Product 2', price: 20 }
    ];

    const promise = service.getProducts();
    
    const req = httpMock.expectOne('/api/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
    
    const products = await promise;
    expect(products.length).toBe(2);
    expect(products[0].name).toBe('Product 1');
  });

  it('should handle errors', async () => {
    const promise = service.getProducts();
    
    const req = httpMock.expectOne('/api/products');
    req.error(new ProgressEvent('error'), { status: 500 });
    
    await expect(promise).rejects.toThrow();
  });
});
```

## Form Testing

### Reactive Forms
```typescript
describe('CheckoutComponent Forms', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create form with correct structure', () => {
    expect(component.checkoutForm.get('shipping')).toBeTruthy();
    expect(component.checkoutForm.get('payment')).toBeTruthy();
  });

  it('should validate required fields', () => {
    const form = component.checkoutForm;
    expect(form.valid).toBe(false);
    
    form.patchValue({
      shipping: {
        fullName: 'John Doe',
        address: '123 Main St',
        city: 'New York',
        postalCode: '10001',
        country: 'USA'
      },
      payment: {
        cardNumber: '1234567890123456',
        expiryDate: '12/25',
        cvv: '123'
      }
    });
    
    expect(form.valid).toBe(true);
  });

  it('should validate card number format', () => {
    const cardControl = component.checkoutForm.get('payment.cardNumber');
    
    cardControl?.setValue('invalid');
    expect(cardControl?.hasError('pattern')).toBe(true);
    
    cardControl?.setValue('1234567890123456');
    expect(cardControl?.hasError('pattern')).toBe(false);
  });
});
```

## Mocking

### Mock Services
```typescript
import { vi } from 'vitest';

describe('Component with Mocked Service', () => {
  let mockProductService: Partial<ProductService>;

  beforeEach(() => {
    mockProductService = {
      getProducts: vi.fn().mockResolvedValue([
        { id: '1', name: 'Product 1', price: 10 }
      ]),
      filteredProducts: signal([])
    };

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService }
      ]
    }).compileComponents();
  });

  it('should call service method', async () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    await fixture.whenStable();
    
    expect(mockProductService.getProducts).toHaveBeenCalled();
  });
});
```

### Spy on Methods
```typescript
it('should navigate on checkout', () => {
  const router = TestBed.inject(Router);
  const navigateSpy = vi.spyOn(router, 'navigate');
  
  component.checkout();
  
  expect(navigateSpy).toHaveBeenCalledWith(['/checkout']);
});
```

## Async Testing

### Testing Promises
```typescript
it('should handle async operations', async () => {
  const service = TestBed.inject(OrderService);
  const order = await service.createOrder(mockOrderData);
  
  expect(order.id).toBeDefined();
  expect(order.status).toBe('pending');
});
```

### Testing Effects
```typescript
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

it('should run effect', fakeAsync(() => {
  const service = TestBed.inject(CartService);
  const spy = vi.spyOn(localStorage, 'setItem');
  
  service.addItem({ id: '1', name: 'Product', price: 10 });
  tick();
  
  expect(spy).toHaveBeenCalled();
}));
```

## Best Practices

1. **Use TestBed for Angular-specific testing**
   - Configure modules with `TestBed.configureTestingModule`
   - Use `compileComponents()` for async compilation
   - Inject services with `TestBed.inject()`

2. **Test signals properly**
   - Call signal functions to get values: `signal()`
   - Test computed signals update correctly
   - Verify effects run when signals change

3. **Mock HTTP calls**
   - Use `HttpTestingController` for HTTP testing
   - Always call `httpMock.verify()` in afterEach
   - Test both success and error cases

4. **Test forms thoroughly**
   - Test validation rules
   - Test form submission
   - Test error messages display

5. **Use proper async patterns**
   - Use `async/await` for promises
   - Use `fakeAsync` and `tick` for timers
   - Use `fixture.whenStable()` for pending async operations

6. **Coverage goals**
   - Aim for 80%+ code coverage
   - Focus on critical business logic
   - Test edge cases and error paths

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm test -- --watch

# Run specific file
npm test -- product.service.spec.ts
```
