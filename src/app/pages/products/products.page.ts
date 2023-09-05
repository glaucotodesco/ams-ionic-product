import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products:Product[] = []
  constructor(private service: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.service.getProducts().subscribe(
      {
        next: produts => this.products=produts
      }
    );
  }
}
