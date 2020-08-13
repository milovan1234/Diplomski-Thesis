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
  public allProducts: Product[];
  public products: Product[];
  public countPages: number;
  public pages: number[];
  public currentPage: number;

  constructor(private route: ActivatedRoute,
              private subCategoryService: SubCategoryService,
              private productService: ProductService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.currentPage = 1;

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

        this.countPages = products.length % 12 == 0 ? Math.floor(products.length / 12) : Math.floor(products.length / 12) + 1;
        this.pages = [this.countPages];
        for (let i = 0; i < this.countPages; i++) {
          this.pages[i] = i + 1;
        }        

        this.allProducts = products;
        this.allProducts.forEach(x => {
          x.priceWithDiscount = (x.price - Math.round(x.price * (x.discount/100)));
          x.imageFile = this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + x.imageFile);
        });

        this.products = this.allProducts.slice(((this.currentPage-1)*12),((this.currentPage-1)*12)+12);
      }
    });
  }

  changePage(pageNum: number) : void {
    for(let i=1; i <= this.countPages; i++){
      let btn = document.querySelector("#btn_" + i);
      btn.classList.remove('bg-red');
    }

    let btn = document.querySelector("#btn_" + pageNum);
    btn.classList.add('bg-red');

    this.currentPage = pageNum;
    this.products = this.allProducts.slice(((this.currentPage-1)*2),((this.currentPage-1)*2)+2);
  }

}
