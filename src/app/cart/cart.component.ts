import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `<h2>Shopping Cart</h2><p>Cart items will appear here.</p>`
})
export class CartComponent {}
