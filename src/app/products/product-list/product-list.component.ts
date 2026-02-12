import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="product-list">
      <h2>Products</h2>
      @if (products$ | async; as products) {
        <div class="grid">
          @for (product of products; track product.id) {
            <div class="product-item">
              <h3>{{ product.name }}</h3>
              <p class="product-price">{{ product.price | currency }}</p>
              <a [routerLink]="['/products', product.id]">View Details</a>
            </div>
          }
        </div>
      } @else {
        <p>Loading products...</p>
      }
    </div>
  `,
  styles: [`
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
    .product-item { border: 1px solid #ccc; padding: 1rem; border-radius: 4px; }
  `]
})
export class ProductListComponent {
  private productService = inject(ProductService);
  products$ = this.productService.getProducts();
}
