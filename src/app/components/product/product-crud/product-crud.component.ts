import { Component, OnInit } from '@angular/core';
import { LookupService } from '../../../shared/services/lookup.service'
@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.scss']
})
export class ProductCrudComponent implements OnInit {

  productCategory: Array<any> = [];
  productType: Array<any> = [];
  constructor(private lookupService: LookupService) { }

  ngOnInit(): void {
    this.PopulateDropDowns();
  }

  PopulateDropDowns() {
    this.lookupService.getProductCategory()
      .subscribe(res => {
        this.productCategory = res;
      })
    this.lookupService.getProductType()
      .subscribe(res => {
        this.productType = res;
      })
  }

}
