import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProducerService } from 'src/app/services/producer.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Route } from '@angular/compiler/src/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {
  public productId: number;
  public categoryName: string;
  public subCategoryName: string;
  public product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.url.subscribe(params => {

      this.categoryName = params[0].path.replace(/-/g, " ");
      this.subCategoryName = params[1].path.replace(/-/g, " ");
      this.productId = +params[2].path.replace(/-/g, " ");

      this.getProduct();
    });
  }

  getProduct(): void {
    this.productService.getProduct(this.productId).subscribe({
      next: product => {
        product.imageFile = this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + product.imageFile);
        product.priceWithDiscount = (product.discount > 0) ? (product.price - Math.round(product.price * (product.discount / 100))) : product.price;;
        this.product = product;
      },
      error: error => {
        this.router.navigate(['/error']);
      }
    });
  }

}
