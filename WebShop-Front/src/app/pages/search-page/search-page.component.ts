import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  public searchValue: string;
  public searchProducts: Product[];

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private categoryService: CategoryService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchValue = params["value"];      
      this.loadSearchProducts();
    });
  }

  loadSearchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: products => {

        this.searchProducts = [] as Product[];

        products.forEach(x => {
          x.priceWithDiscount = (x.discount > 0) ? (x.price - Math.round(x.price * (x.discount / 100))) : x.price;
          x.imageFile = this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + x.imageFile);

          this.categoryService.getCategories().subscribe({
            next: data => {
              x.category = data.find(y => y.id == x.subCategory.categoryId);
              if(x.description.toLowerCase().startsWith(this.searchValue.toLowerCase()) || 
                    x.subCategory.subCategoryName.toLowerCase().startsWith(this.searchValue.toLowerCase()) ||
                    x.category.categoryName.toLowerCase().startsWith(this.searchValue.toLowerCase()) ||
                    x.producer.producerName.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
                
                this.searchProducts.push(x);

              }
            }
          });
        });    

      }
    });
  }

}
