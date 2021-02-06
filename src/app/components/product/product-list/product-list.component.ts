import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../shared/services/api.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Array<any> = []
  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.GetProducts();
  }

  GetProducts() {
    this.apiService.GetProducts()
      .subscribe(res => {
        this.products = res.results;
      }, err => {

      })

  }


}
