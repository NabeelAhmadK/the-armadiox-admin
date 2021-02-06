import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from '../../../shared/services/api.service';
import { QuickViewComponent } from '../quick-view/quick-view.component'
@Component({
  selector: 'app-order-crud',
  templateUrl: './order-crud.component.html',
  styleUrls: ['./order-crud.component.scss']
})
export class OrderCrudComponent implements OnInit {

  products: Array<any> = [];
  public openSidebar: boolean = false;
  public listView: boolean = false;
  public col: string = '3';

  @ViewChild("quickView") QuickView: QuickViewComponent;

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.apiService.GetProducts()
      .subscribe(res => {
        this.products = res.results;
      })
  }

}
