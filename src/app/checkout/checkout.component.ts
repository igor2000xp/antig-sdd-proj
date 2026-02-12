import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Checkout</h2>
    <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
      <label>
        Name:
        <input type="text" formControlName="name">
      </label>
      <button type="submit" [disabled]="checkoutForm.invalid">Place Order</button>
    </form>
  `
})
export class CheckoutComponent {
  private fb = new FormBuilder();
  checkoutForm = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required]
  });

  onSubmit() {
    console.log(this.checkoutForm.value);
  }
}
