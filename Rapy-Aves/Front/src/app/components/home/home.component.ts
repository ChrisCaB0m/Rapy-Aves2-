import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public productsList: Array<any> = [];
  private categoria: string | null = null;

  constructor(private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }



  ngAfterViewInit(): void {
    this.loadDefaultProducts();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.categoria = params['categoria'];
      if (this.categoria != null && this.categoria == "all") {
        this.loadDefaultProducts();
        return;
      }
      if (this.categoria != null) {
        this.getProductsCategory(this.categoria);
      }
    });
  }

  getProductsCategory(category: string) {
    this.productsList = [];
    this.productService.getProductsCategory(category)?.subscribe((res: []) => {
      if (res.length && res.length > 0) {
        this.productsList = res;
      } else {
        alert(`No hay productos en la categoría ${category}`);
        this.loadDefaultProducts();
      }
    });
  }

  loadDefaultProducts() {
    this.productsList = [];
    this.productService.getProducts()?.subscribe((res: []) => {
      if (res.length && res.length > 0) {
        this.productsList = res;
      } else {
        alert("Error al cargar lista de productos...");
      }
    });
  }
}
