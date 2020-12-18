import { Component, OnInit } from '@angular/core';
import { LookupService } from '../../../shared/services/lookup.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/validation'
import { Product } from '../../../shared/models';
import { APIService } from '../../../shared/services/api.service';
@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.scss']
})
export class ProductCrudComponent implements OnInit {

  submitted: boolean = false;
  productForm: FormGroup;
  productCategory: Array<any> = [];
  productType: Array<any> = [];
  constructor(
    private lookupService: LookupService,
    private formBuilder: FormBuilder,
    private apiService: APIService
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      product_id: [null],
      product_name: [null, [Validators.required, ValidationService.emptySpacesValidator]],
      product_description: [null, ValidationService.emptySpacesValidator],
      units_in_stock: [null, [Validators.required, ValidationService.numberValidator]],
      units_on_order: [null, [Validators.required, ValidationService.numberValidator]],
      unit_cost: [null, [Validators.required, ValidationService.numberValidator]],
      product_category: [null, Validators.required],
      product_type: [null, Validators.required],
      product_variation: [null, Validators.required],
      discount: [null, [ValidationService.numberValidator, Validators.max(100)]],

    })
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

  Submit() {
    this.submitted = true
    if (this.productForm.invalid)
      return;

    let product = this.productForm.value;
    
  }

}
