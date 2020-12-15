import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-customer-crud',
  templateUrl: './customer-crud.component.html',
  styleUrls: ['./customer-crud.component.scss']
})
export class CustomerCrudComponent implements OnInit {

  customerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private toast: ToastrService) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customer_id: [null],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      address: [null, Validators.required],
      city: ["Mirpur Mathelo"],
      state: ["Sindh"],
      country: ["Pakistan"],
      postal_code: [null],
      phone_number: [null, Validators.required],
      email: [null, Validators.required],
    })
  }

  Submit() {
    if (this.customerForm.invalid)
      this.toast.error('Form is Invalid')
  }

}
