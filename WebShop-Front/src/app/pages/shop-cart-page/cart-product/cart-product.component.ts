import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShopCartService } from 'src/app/services/shop-cart.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {
  @Input() product: Product;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();


  constructor(public shopCartService: ShopCartService) { }

  onChangeQuantity(): void {
    this.onChange.emit();
  }

  deleteProductFromCart(productId: number): void {
    this.shopCartService.deleteProductFromCart(productId);
    this.onDelete.emit();
  }

  ngOnInit(): void {
  }

}
