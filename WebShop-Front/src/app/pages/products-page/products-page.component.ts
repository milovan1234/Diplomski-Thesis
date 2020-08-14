import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  public products: Product[];
  public filterProducts: Product[];
  public sortWay: string;
  public selectProducers: string[];

  public countPages: number;
  public pages: number[];
  public currentPage: number;

  public producers: Producer[];

  constructor(private route: ActivatedRoute,
    private subCategoryService: SubCategoryService,
    private productService: ProductService,
    private producerService: ProducerService,
    private sanitizer: DomSanitizer,
    private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.currentPage = params["page"];
      this.sortWay = params["sort"];
      this.selectProducers = (params["producer"] == undefined) ? [] as string[] : params["producer"].split("#");

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

    });

  }

  getProducts(): void {
    this.productService.getProductsForSubCategory(this.subCategoryId).subscribe({
      next: products => {

        products.forEach(x => {
          x.priceWithDiscount = (x.discount > 0) ? (x.price - Math.round(x.price * (x.discount / 100))) : x.price;
          x.imageFile = this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + x.imageFile);
        });

        this.filterProducts = products.slice();

        if (this.sortWay != undefined) {
          this.productsSort(this.filterProducts, this.sortWay);
        }
        if (this.selectProducers.length > 0) {
          this.filteredByProducers();
        }

        this.countPages = this.filterProducts.length % 2 == 0 ? Math.floor(this.filterProducts.length / 2) : Math.floor(this.filterProducts.length / 2) + 1;
        this.pages = [this.countPages];
        for (let i = 0; i < this.countPages; i++) {
          this.pages[i] = i + 1;
        }
        this.setProductsForShow(this.filterProducts);
      }
    });
  }

  getProducers(): void {
    this.producerService.getProducersForSubCategory(this.subCategoryId).subscribe({
      next: producers => {
        this.producers = producers;
        this.producers.forEach(x => {
          x.isCheck = this.selectProducers.find(y => y == x.producerName) != null ? true : false;
        });
      }
    });
  }

  setProductsForShow(allProducts: Product[]): void {
    this.products = allProducts.slice(((this.currentPage - 1) * 2), ((this.currentPage - 1) * 2) + 2);
  }

  changePage(pageNum: number): void {
    this.currentPage = pageNum;
    this.router.navigate([], {
      queryParams: { page: pageNum },
      queryParamsHandling: 'merge'
    });
  }

  onSortSelected(sortWay: string): void {
    this.sortWay = sortWay;
    this.router.navigate([], {
      queryParams: { sort: sortWay == "undefined" ? undefined : sortWay },
      queryParamsHandling: 'merge'
    });
  }

  onClickProducer(producerId: number): void {
    let producer = this.producers.find(x => x.id == producerId);
    producer.isCheck = !producer.isCheck;
    if (producer.isCheck && this.selectProducers.find(x => x == producer.producerName) == null) {
      this.selectProducers.push(producer.producerName);
    }
    else if (!producer.isCheck) {
      this.selectProducers = this.selectProducers.filter(x => x != producer.producerName);
    }
    this.router.navigate([], {
      queryParams: { 
        producer: this.selectProducers.join("#") == "" ? undefined : this.selectProducers.join("#"),
        page: 1 
      },
      queryParamsHandling: 'merge'
    });
  }

  filteredByProducers(): void {
    this.filterProducts = this.filterProducts
                  .filter(x => this.selectProducers.join("").toLowerCase().includes(x.producer.producerName.toLowerCase()));
  }

  productsSort(products: Product[], sortWay: string): void {
    products.sort(function (a, b) {
      return (sortWay == "asc") ? a.priceWithDiscount - b.priceWithDiscount : b.priceWithDiscount - a.priceWithDiscount;
    });
  }

}
