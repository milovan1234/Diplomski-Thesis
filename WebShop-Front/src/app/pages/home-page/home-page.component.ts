import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from 'src/app/services/category.service';

declare var $: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent implements OnInit {
  public productsBestSold: Product[];
  public productsRecommeded: Product[];
  public categoryName: string = "";
  public subCategoryName: string = "";

  constructor(private productService: ProductService,
              private sanitizer: DomSanitizer,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: products => {
        products.forEach(x => {
          x.priceWithDiscount = (x.discount > 0) ? (x.price - Math.round(x.price * (x.discount / 100))) : x.price;
          x.imageFile = this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + x.imageFile);

          this.categoryService.getCategories().subscribe({
            next: data => {
              x.category = data.find(y => y.id == x.subCategory.categoryId);              
            }
          });
        });        

        this.productsBestSold = products.sort((a,b) => b.countSold - a.countSold).slice(0, 8);
        this.productsRecommeded = products.sort((a,b) => b.discount - a.discount).slice(0, 8);

        this.onChangeSlide('#carousel-best-sold');
        this.onChangeSlide('#carousel-recommended');

      }
    });
  }

  onChangeSlide(carouselId: string) : void {    
    $(carouselId).on('slide.bs.carousel', function (e) {
      var $e = $(e.relatedTarget);
      var idx = $e.index();
      var itemsPerSlide = 5;
      var totalItems = $(carouselId + ' .carousel-item').length;

      if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
          if (e.direction == "left") {
            $(carouselId + ' .carousel-item').eq(i).appendTo(carouselId + ' .carousel-inner');
          }
          else {
            $(carouselId + ' .carousel-item').eq(0).appendTo(carouselId + ' .carousel-inner');
          }
        }
      }
    });
  }


}
