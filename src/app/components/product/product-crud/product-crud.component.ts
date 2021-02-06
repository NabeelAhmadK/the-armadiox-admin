import { Component, OnInit } from '@angular/core';
import { LookupService } from '../../../shared/services/lookup.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/validation'
import { Product } from '../../../shared/models';
import { APIService } from '../../../shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
enum Methods {
  save = "SaveProduct",
  update = "UpdateProduct"
}

const PROFIT_MARGIN = 35;

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.scss']
})
export class ProductCrudComponent implements OnInit {

  usdRate:any = 160.05;
  profitMargin: any = PROFIT_MARGIN;
  method: any;
  product_id: any;
  submitted: boolean = false;
  productForm: FormGroup;
  productCategory: Array<any> = [];
  productType: Array<any> = [];
  constructor(
    private toast: ToastrService,
    private lookupService: LookupService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: APIService
  ) {
    this.route.params.subscribe(params => {
      if (params.productId) {
        this.product_id = params.productId;
        this.GetProductbyId(this.product_id);
      }
    })
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: [null],
      product_name: [null, [Validators.required, ValidationService.emptySpacesValidator]],
      product_description: [null, ValidationService.emptySpacesValidator],
      product_in_stock: [null, [Validators.required, ValidationService.numberValidator]],
      product_in_order: [null, [ValidationService.numberValidator]],
      product_cost: [null, [Validators.required, ValidationService.numberValidator]],
      product_retail_price: [{ value: null, disabled: true }],
      product_category_id: [null, Validators.required],
      product_type_id: [null, Validators.required],
      product_variation: [null, Validators.required],
      discount: [null, [ValidationService.numberValidator, Validators.max(100)]],

    })
    this.PopulateDropDowns();
    this.onChanges();
  }

  onChanges() {
    this.productForm.get('product_cost').valueChanges
      .subscribe(cost => {
        if (cost) {
          let tempMargin = 1 - (this.profitMargin / 100);
          let retailPrice = cost / tempMargin;
          this.productForm.get('product_retail_price').setValue(Math.round(retailPrice));
        }
      })
    this.productForm.get('product_retail_price').valueChanges
      .subscribe(retailPrice => {
        if (retailPrice > 0 && this.productForm.get('product_retail_price').enabled) {
          let cost = parseInt(this.productForm.get('product_cost').value);
          this.profitMargin = ((retailPrice - cost) / retailPrice) * 100;
        } else if (retailPrice <= 0 && this.productForm.get('product_retail_price').enabled)
          this.profitMargin = 35;
      })
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

  calculateRetailPrice() {
    let cost = this.productForm.get('product_cost').value;
    let tempMargin = 1 - (PROFIT_MARGIN / 100);
    let retailPrice = cost / tempMargin;
    this.productForm.get('product_retail_price').setValue(Math.round(retailPrice));
    this.profitMargin = PROFIT_MARGIN;
  }

  Submit() {
    this.submitted = true
    this.method = this.product_id ? Methods.update : Methods.save;
    if (this.productForm.invalid)
      return;

    let product = new Product().deserialize(this.productForm.value);
    this.apiService[this.method](product)
      .subscribe(res => {
        this.toast.success(`Product Successfully ${this.product_id ? 'Updated' : 'Created'}`)
        this.router.navigate(['/pages/product-management/products'], { replaceUrl: true });
      })

  }

  GetProductbyId(productId: any) {
    this.apiService.GetProductbyId(productId)
      .subscribe(res => {
        this.Populate(res);

      })
  }

  Populate(product) {
    Object.keys(product).forEach(k => {
      let control = <FormGroup>this.productForm.get(k);
      if (control) {
        control.patchValue(product[k], { onlySelf: false });
      }
    });
  }

}
