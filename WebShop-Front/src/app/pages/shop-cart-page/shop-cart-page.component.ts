import { Component, OnInit } from '@angular/core';
import { ShopCartService } from 'src/app/services/shop-cart.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderItem } from 'src/app/models/orderItem';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-shop-cart-page',
  templateUrl: './shop-cart-page.component.html',
  styleUrls: ['./shop-cart-page.component.css']
})
export class ShopCartPageComponent implements OnInit {
  public products: Product[];
  public sumWithoutDiscount: number;
  public sumDiscount: number;
  public checkoutForm: FormGroup;

  constructor(public shopCartService: ShopCartService,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    public userService: UserService,
    private orderService: OrderService) { }

  ngOnInit(): void {

    this.checkoutForm = new FormGroup({
      city: new FormControl('', [Validators.pattern("^[a-zčćšđžA-ZČĆŠĐŽ]+(?:[\s-][a-zčćšđžA-ZČĆŠĐŽ]+)*$"),
      Validators.required]),
      street: new FormControl('', [Validators.pattern("^[a-zčćšđžA-ZČĆŠĐŽ]+(?:[\s-][a-zčćšđžA-ZČĆŠĐŽ]+)*$"),
      Validators.required]),
      houseNumber: new FormControl('', [Validators.pattern("^[0-9a-zA-Z]+(?:[/][0-9a-zA-Z]+)*$"), Validators.required])
    });

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

  checkoutSubmit(): void {
    
    if (confirm("Da li ste sigurni da želite da završite kupovinu?")) {
      let order: Order = new Order();
      order.city = this.checkoutForm.get('city').value;
      order.street = this.checkoutForm.get('street').value;
      order.houseNumber = this.checkoutForm.get('houseNumber').value;
      order.userId = this.userService.user.id;
      order.orderItems = [] as OrderItem[];
      for (let product of this.products) {
        let orderItem: OrderItem = new OrderItem();
        orderItem.productId = product.id;
        orderItem.quantity = product.quantity;
        order.orderItems.push(orderItem);
      }

      this.orderService.createOrder(order).subscribe({
        next: success => {
          alert("Uspešno ste obavili kupovinu.");
          this.checkoutForm.controls.city.setValue("");
          this.checkoutForm.controls.street.setValue("");
          this.checkoutForm.controls.houseNumber.setValue("");
          this.products = [] as Product[];
          this.shopCartService.products = [];
          this.shopCartService.deleteCart();
        }
      });
    }

  }

}
