import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { ValidationService } from '../../../shared/validation'
import { Customer } from '../../../shared/models';
import { APIService } from '../../../shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router'
import { LookupService } from '../../../shared/services/lookup.service'

enum Methods {
  save = "SaveCustomer",
  update = "UpdateProduct"
}

@Component({
  selector: 'app-customer-crud',
  templateUrl: './customer-crud.component.html',
  styleUrls: ['./customer-crud.component.scss']
})
export class CustomerCrudComponent implements OnInit {

  customer_id: any;
  method: any;
  submitted: boolean = false;
  genders: Array<any> = [];
  socialMedia: Array<any> = [];
  cities: Array<any> = [];
  states: Array<any> = [];
  countries: Array<any> = [];

  customerForm: FormGroup;
  constructor(
    private toast: ToastrService,
    private lookupService: LookupService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: APIService
  ) {
    this.route.params.subscribe(params => {
      if (params.customerId) {
        this.customer_id = params.customerId;
        this.GetCustomerbyId(this.customer_id);
      }
    })
  }

  ngOnInit(): void {

    this.customerForm = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      last_name: [{ value: null, disabled: true }],
      email: [null, [Validators.required, ValidationService.emailValidator]],
      role: ['user', Validators.required],
      social_media: [null, Validators.required],
      social_media_user_name: [null, Validators.required],
      contact_info: this.formBuilder.group({
        phone_number: [null, [Validators.required, ValidationService.phoneValidator]],
        address: this.formBuilder.group({
          street: [null],
          city: [null],
          province: [null],
          country: [null],
        })
      }),

    });

    this.PopulateDropdowns();
  }

  PopulateDropdowns() {
    this.lookupService.getCities()
      .subscribe(res => {
        this.cities = res;
      })

    this.lookupService.getStates()
      .subscribe(res => {
        this.states = res;
      })
    this.lookupService.getCountries()
      .subscribe(res => {
        this.countries = res;
      })

    this.lookupService.getSocialMedia()
      .subscribe(res => {
        this.socialMedia = res
      })
  }

  Submit() {
    this.method = this.customer_id ? Methods.update : Methods.save;
    if (this.customerForm.invalid)
      return;

    let customer = new Customer().deserialize(this.customerForm.value);

    this.apiService[this.method](customer)
      .subscribe(res => {
        this.toast.success(`Customer Successfully ${this.customer_id ? 'Updated' : 'Created'}`)
        this.router.navigate(['/pages/customer-management/customers'], { replaceUrl: true });
      })

  }

  onChangeCity(city: any) {
    if (city) this.customerForm.get('province').setValue(city.admin_name)
    else this.customerForm.get('province').setValue(null)
  }

  GetCustomerbyId(customerId: any) {
    this.apiService.GetCustomerbyId(customerId)
      .subscribe(res => {
        this.Populate(res);

      })
  }

  Populate(customer) {
    Object.keys(customer).forEach(k => {
      let control = <FormGroup>this.customerForm.get(k);
      if (control) {
        control.patchValue(customer[k], { onlySelf: false });
      }
    });
  }
}
