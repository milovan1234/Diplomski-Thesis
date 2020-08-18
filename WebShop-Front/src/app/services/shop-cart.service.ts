import { Injectable } from '@angular/core';
import { OrderItem } from '../models/orderItem';
import { ɵparseCookieValue } from '@angular/common';
import { Product } from '../models/product';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {
  public products: any[];
  constructor(private cookieService: CookieService) {
    this.products = this.cookieService.check('cartProducts') ? JSON.parse(this.cookieService.get('cartProducts')) : [];    
  }

  storeProduct(product: any) : void {
    for (let p of this.products) {
      if(p.productId == product.productId){
        alert('Proizvod koji želite da dodate već postoji u korpi!');
        return;
      }
    }
    this.products.push(product);
    this.cookieService.set('cartProducts', JSON.stringify(this.products), 7);
  }

  deleteProductFromCart(productId: number) : void {
    this.products = this.products.filter(x => x.productId != productId);
    this.cookieService.set('cartProducts', JSON.stringify(this.products));
  }

  deleteCart() : void {
    this.cookieService.delete('cartProducts');
  }

}
