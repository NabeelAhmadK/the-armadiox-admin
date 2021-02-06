import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../../shared/services/cart.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.scss']
})
export class QuickViewComponent implements OnInit {

  message: string;
  subscription: Subscription;
  quantity: any = 1
  maxStockReached: boolean = false;
  product: any;
  @ViewChild("quickView", { static: false }) QuickView: TemplateRef<any>;
  public closeResult: string;
  public modalOpen: boolean = false;

  constructor(private modalService: NgbModal, private cartService: CartService) { }

  ngOnInit() {
    this.subscription = this.cartService.shoppingCart.subscribe(message => this.message = message)
  }

  openModal(product) {
    this.modalOpen = true;
    this.product = product;
    this.modalService.open(this.QuickView, {
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      windowClass: 'Quickview'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  minusQuantity() {
    if (this.quantity == 1)
      return;
    this.maxStockReached = false;
    this.quantity = this.quantity - 1;
  }

  addQuantity() {
    if (this.quantity == this.product.product_in_stock) {
      this.maxStockReached = true;
      return;
    }
    this.maxStockReached = false;
    this.quantity = this.quantity + 1;
  }


  addToCart() {
    this.cartService.setCart(this.product)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
