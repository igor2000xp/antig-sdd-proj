import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="dashboard-layout">
      <nav>
        <a href="/dashboard/products">Manage Products</a>
        <a href="/dashboard/orders">Manage Orders</a>
      </nav>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class DashboardComponent {}
