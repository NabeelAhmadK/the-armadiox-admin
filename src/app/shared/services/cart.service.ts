import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart: Array<any> = []

  private _manageCart = new BehaviorSubject<any>([]);
  cart_observe = this._manageCart.asObservable();

  public get shoppingCart(): any {
    return this.cart_observe;
  }
  public setCart(v) {
    this.cart.push(v);
    this._manageCart.next(this.cart);
  }

  constructor() { }


}
