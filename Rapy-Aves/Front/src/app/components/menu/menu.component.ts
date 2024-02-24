import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  @Input() admin: boolean = false;

  constructor(private router: Router) {}

  getProductsCategory(category: string) {
    this.router.navigate(['/home'], { queryParams: { categoria: category } });
  }

  loadDefaultProducts() {
    this.router.navigate(['/home'], { queryParams: { categoria: 'all' } });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
