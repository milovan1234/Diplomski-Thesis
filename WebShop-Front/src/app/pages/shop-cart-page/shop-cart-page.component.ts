import { Component, OnInit } from '@angular/core';
import { ShopCartService } from 'src/app/services/shop-cart.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shop-cart-page',
  templateUrl: './shop-cart-page.component.html',
  styleUrls: ['./shop-cart-page.component.css']
})
export class ShopCartPageComponent implements OnInit {
  public products: Product[];
  public sumWithoutDiscount: number;
  public sumDiscount: number;

  constructor(public shopCartService: ShopCartService,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    public userService: UserService) { }

  ngOnInit(): void {
    
    this.loadProductsFromCookie();

  }

  loadProductsFromCookie(): void {
    this.products = [] as Product[];
    for (let product of this.shopCartService.products) {
      this.productService.getProduct(product.productId).subscribe({
        next: prod => {
          prod.priceWithDiscount = (prod.discount > 0) ? (prod.price - Math.round(prod.price * (prod.discount / 100))) : prod.price;
          prod.imageFile = this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + prod.imageFile);
          prod.quantity = product.quantity;
          this.products.push(prod);

          if (this.products.length == this.shopCartService.products.length)
            this.calculateSum();

        }
      });
    }
  }

  calculateSum(): void {
    this.sumWithoutDiscount = this.sumDiscount = 0;
    for (let product of this.products) {
      this.sumWithoutDiscount += product.price * product.quantity;
      this.sumDiscount += Math.round(product.price * (product.discount / 100)) * product.quantity;
    }
  }

}
