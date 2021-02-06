import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../services/cart.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProducts: Array<any> = [];
  subscription: Subscription;
  public openCart: boolean = false;

  constructor(public cartService: CartService) { }

  ngOnInit() {
    this.subscription = this.cartService.shoppingCart.subscribe(message => this.cartProducts = message)
  }

  // For Mobile Device
  toggleCart() {
    this.openCart = !this.openCart;
  }

  removeProduct(product) {
    const index = this.cartProducts.indexOf(product);
    if (index > -1) {
      this.cartProducts.splice(index, 1);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
