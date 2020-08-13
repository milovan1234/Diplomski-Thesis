import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { ProductService } from 'src/app/services/product.service';
import { ProducerService } from 'src/app/services/producer.service';
import { Product } from 'src/app/models/product';
import { DomSanitizer } from '@angular/platform-browser';
import { Producer } from 'src/app/models/producer';

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
  public filterProducts: Product[];
  public countPages: number;
  public pages: number[];
  public currentPage: number;
  public producers: Producer[];

  constructor(private route: ActivatedRoute,
              private subCategoryService: SubCategoryService,
              private productService: ProductService, 
              private producerService: ProducerService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.currentPage = 1;

    this.route.url.subscribe(params => {
      this.categoryName = params[0].path.replace(/-/g, " ");
      this.subCategoryName = params[1].path.replace(/-/g, " ");

      this.subCategoryService.getSubCategories().subscribe({
        next: subCategories => {
          this.subCategoryId = subCategories.find(x => x.subCategoryName.toLowerCase() == this.subCategoryName).id;

          this.getProducts();
          this.getProducers();
        }
      });
    });   
  }

  getProducts(): void {
    this.productService.getProductsForSubCategory(this.subCategoryId).subscribe({
      next: products => {

        this.countPages = products.length % 2 == 0 ? Math.floor(products.length / 2) : Math.floor(products.length / 2) + 1;
        this.pages = [this.countPages];
        for (let i = 0; i < this.countPages; i++) {
          this.pages[i] = i + 1;
        }        

        this.allProducts = products;
        this.allProducts.forEach(x => {
          x.priceWithDiscount = (x.discount > 0) ? (x.price - Math.round(x.price * (x.discount/100))) : x.price;
          x.imageFile = this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + x.imageFile);
        });

        this.filterProducts = this.allProducts.slice();
        this.setProductsForShow(this.filterProducts);
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
    this.setProductsForShow(this.filterProducts);
  }

  setProductsForShow(allProducts: Product[]) : void{
    this.products = allProducts.slice(((this.currentPage-1)*2),((this.currentPage-1)*2)+2);
  }

  onSortSelected(sortWay: string) : void {  

    if(sortWay == "asc"){      

      for(let i = 0; i < this.filterProducts.length - 1; i++){
        for(let j = i+1; j < this.filterProducts.length; j++){
          if(this.filterProducts[i].priceWithDiscount > this.filterProducts[j].priceWithDiscount){
            let temp = this.filterProducts[i];
            this.filterProducts[i] = this.filterProducts[j];
            this.filterProducts[j] = temp;
          }
        }
      }

    }
    else if(sortWay == "desc"){

      for(let i = 0; i < this.filterProducts.length - 1; i++){
        for(let j = i+1; j < this.filterProducts.length; j++){
          if(this.filterProducts[i].priceWithDiscount < this.filterProducts[j].priceWithDiscount){
            let temp = this.filterProducts[i];
            this.filterProducts[i] = this.filterProducts[j];
            this.filterProducts[j] = temp;
          }
        }
      }

    }
    else {

      this.filterProducts = this.allProducts.slice();

    }
    this.setProductsForShow(this.filterProducts);
  }

  getProducers() : void {
    this.producerService.getProducersForSubCategory(this.subCategoryId).subscribe({
      next: producers => {
        this.producers = producers;
      }
    });
  }

}
