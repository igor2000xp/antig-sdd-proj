---
name: angular-ecommerce
description: E-commerce patterns for Angular applications. Use when building shopping cart, product catalog, checkout flows, or payment integration. Covers state management with signals, cart operations, product filtering, and order processing.
argument-hint: [feature-name]
allowed-tools: Read Write Grep
metadata:
  author: ai-factory
  version: "1.0"
  category: angular-patterns
---

# Angular E-commerce Patterns

Specialized patterns for building e-commerce features in Angular 21+ applications.

## Core E-commerce Features

### 1. Product Catalog

**Signal-based Product State:**
```typescript
import { signal, computed } from '@angular/core';

export class ProductService {
  private products = signal<Product[]>([]);
  private filters = signal<ProductFilters>({});
  
  filteredProducts = computed(() => {
    const prods = this.products();
    const filters = this.filters();
    
    return prods.filter(p => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.minPrice && p.price < filters.minPrice) return false;
      if (filters.maxPrice && p.price > filters.maxPrice) return false;
      if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  });
  
  updateFilters(filters: Partial<ProductFilters>) {
    this.filters.update(current => ({ ...current, ...filters }));
  }
}
```

**Product List Component:**
```typescript
@Component({
  selector: 'app-product-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="product-grid">
      @for (product of products(); track product.id) {
        <app-product-card 
          [product]="product"
          (addToCart)="onAddToCart($event)" />
      }
    </div>
  `
})
export class ProductListComponent {
  private productService = inject(ProductService);
  products = this.productService.filteredProducts;
  
  onAddToCart(product: Product) {
    this.cartService.addItem(product);
  }
}
```

### 2. Shopping Cart

**Cart Service with Signals:**
```typescript
export class CartService {
  private items = signal<CartItem[]>([]);
  
  // Computed values
  itemCount = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));
  subtotal = computed(() => this.items().reduce((sum, item) => sum + (item.price * item.quantity), 0));
  tax = computed(() => this.subtotal() * 0.1); // 10% tax
  total = computed(() => this.subtotal() + this.tax());
  
  addItem(product: Product) {
    this.items.update(items => {
      const existing = items.find(i => i.productId === product.id);
      if (existing) {
        return items.map(i => 
          i.productId === product.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...items, { productId: product.id, quantity: 1, price: product.price, name: product.name }];
    });
  }
  
  removeItem(productId: string) {
    this.items.update(items => items.filter(i => i.productId !== productId));
  }
  
  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    this.items.update(items => 
      items.map(i => i.productId === productId ? { ...i, quantity } : i)
    );
  }
  
  clear() {
    this.items.set([]);
  }
}
```

**Cart Component:**
```typescript
@Component({
  selector: 'app-cart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cart">
      <h2>Shopping Cart ({{ itemCount() }} items)</h2>
      
      @if (items().length === 0) {
        <p>Your cart is empty</p>
      } @else {
        @for (item of items(); track item.productId) {
          <div class="cart-item">
            <span>{{ item.name }}</span>
            <input type="number" 
                   [value]="item.quantity"
                   (change)="updateQuantity(item.productId, $event.target.value)" />
            <span>{{ item.price * item.quantity | currency }}</span>
            <button (click)="removeItem(item.productId)">Remove</button>
          </div>
        }
        
        <div class="cart-summary">
          <div>Subtotal: {{ subtotal() | currency }}</div>
          <div>Tax: {{ tax() | currency }}</div>
          <div class="total">Total: {{ total() | currency }}</div>
          <button (click)="checkout()">Proceed to Checkout</button>
        </div>
      }
    </div>
  `
})
export class CartComponent {
  private cartService = inject(CartService);
  private router = inject(Router);
  
  items = this.cartService.items;
  itemCount = this.cartService.itemCount;
  subtotal = this.cartService.subtotal;
  tax = this.cartService.tax;
  total = this.cartService.total;
  
  updateQuantity(productId: string, value: string) {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity)) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }
  
  removeItem(productId: string) {
    this.cartService.removeItem(productId);
  }
  
  checkout() {
    this.router.navigate(['/checkout']);
  }
}
```

### 3. Checkout Flow

**Checkout Form with Signal Forms:**
```typescript
@Component({
  selector: 'app-checkout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule]
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  
  checkoutForm = this.fb.group({
    shipping: this.fb.group({
      fullName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      country: ['', [Validators.required]]
    }),
    payment: this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    })
  });
  
  total = this.cartService.total;
  
  async submitOrder() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    
    const orderData = {
      items: this.cartService.items(),
      shipping: this.checkoutForm.value.shipping,
      payment: this.checkoutForm.value.payment,
      total: this.total()
    };
    
    try {
      await this.orderService.createOrder(orderData);
      this.cartService.clear();
      this.router.navigate(['/order-confirmation']);
    } catch (error) {
      console.error('Order failed:', error);
    }
  }
}
```

### 4. Order Management

**Order Service:**
```typescript
export class OrderService {
  private http = inject(HttpClient);
  private orders = signal<Order[]>([]);
  
  async createOrder(orderData: OrderData): Promise<Order> {
    const order = await firstValueFrom(
      this.http.post<Order>('/api/orders', orderData)
    );
    this.orders.update(orders => [...orders, order]);
    return order;
  }
  
  async getOrders(): Promise<Order[]> {
    const orders = await firstValueFrom(
      this.http.get<Order[]>('/api/orders')
    );
    this.orders.set(orders);
    return orders;
  }
  
  async getOrder(id: string): Promise<Order> {
    return firstValueFrom(
      this.http.get<Order>(`/api/orders/${id}`)
    );
  }
}
```

## Best Practices

### State Management
- Use signals for reactive state (cart, products, filters)
- Use computed signals for derived values (totals, filtered lists)
- Keep state immutable - always create new objects/arrays

### Performance
- Use OnPush change detection on all components
- Use trackBy functions in @for loops
- Lazy load feature modules (products, cart, checkout)

### Error Handling
- Wrap API calls in try/catch
- Show user-friendly error messages
- Log errors for debugging

### Security
- Never store payment details in frontend
- Use HTTPS for all API calls
- Validate all user inputs
- Sanitize displayed data

### Testing
- Test cart operations (add, remove, update quantity)
- Test checkout form validation
- Test order creation flow
- Mock HTTP calls in tests

## Common Patterns

### Product Search with Debounce
```typescript
searchControl = new FormControl('');

ngOnInit() {
  this.searchControl.valueChanges
    .pipe(debounceTime(300))
    .subscribe(search => {
      this.productService.updateFilters({ search });
    });
}
```

### Optimistic UI Updates
```typescript
async addToCart(product: Product) {
  // Update UI immediately
  this.cartService.addItem(product);
  
  try {
    // Sync with backend
    await this.cartService.syncCart();
  } catch (error) {
    // Revert on error
    this.cartService.removeItem(product.id);
    this.showError('Failed to add item to cart');
  }
}
```

### Cart Persistence
```typescript
export class CartService {
  private items = signal<CartItem[]>(this.loadFromStorage());
  
  constructor() {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.items()));
    });
  }
  
  private loadFromStorage(): CartItem[] {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }
}
```
