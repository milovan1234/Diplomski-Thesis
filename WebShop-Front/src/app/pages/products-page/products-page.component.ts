import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})

export class ProductsPageComponent implements OnInit {
  public categoryName: string;
  public subCategoryName: string;
  public subCategoryId: number;
  public products: Product[];

  constructor(private route: ActivatedRoute,
              private subCategoryService: SubCategoryService,
              private productService: ProductService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.url.subscribe(params => {
      this.categoryName = params[0].path.replace(/-/g, " ");
      this.subCategoryName = params[1].path.replace(/-/g, " ");

      this.subCategoryService.getSubCategories().subscribe({
        next: subCategories => {
          this.subCategoryId = subCategories.find(x => x.subCategoryName.toLowerCase() == this.subCategoryName).id;
          this.getProducts();
        }
      });
    });    
  }

  getProducts(): void {
    this.productService.getProductsForSubCategory(this.subCategoryId).subscribe({
      next: products => {        
        this.products = products;
        console.log(this.products);
        this.products.forEach(x => {
          x.imageFile = this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + x.imageFile);
        });
      }
    });
  }
}
