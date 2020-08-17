import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ShopCartService } from 'src/app/services/shop-cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public quantity: number = 1;
  @Input() product: Product;
  constructor(public userService: UserService, 
              private shopCartService: ShopCartService) { }

  ngOnInit(): void {
  }

  addProductToShopCart(product: Product) : void {
    let productForStore = {
      "productId": product.id,
      "quantity": this.quantity
    };
    this.shopCartService.storeProduct(productForStore);
  }

}
