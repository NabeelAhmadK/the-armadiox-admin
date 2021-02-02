import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from '../../../shared/services/api.service';
import { CustomerListFilter } from '../models'
import { PaginationModel } from '../../../shared/models';
import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  @ViewChild('customerPhone') private customerPhone;

  public ClassicEditor = ClassicEditor;
  customerListFilter: CustomerListFilter;
  totalResults: any;
  instaLink: any = 'https://www.instagram.com/'
  facebookLink: any = 'https://www.facebook.com/'
  customers: Array<any> = [];
  customerId: any;
  customerPhoneNumber: any;
  customer: any;
  authenticationForm: FormGroup;
  emailForm: FormGroup;



  constructor(
    private apiService: APIService,
    private authService: AuthenticationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.customerListFilter = new CustomerListFilter();
    this.customerListFilter.pagination = new PaginationModel();
  }

  ngOnInit(): void {
    this.GetCustomer(this.customerListFilter)
    this.authenticationForm = this.formBuilder.group({
      id: [null],
      password: [null, Validators.required]
    })

    this.emailForm = this.formBuilder.group({
      to: [null],
      from: [null],
      subject: [null],
      body: [null]
    })
  }

  GetCustomer(filters: any) {
    this.apiService.GetCustomer(filters)
      .subscribe(({ results, _metadata }) => {
        this.customers = results;
        this.totalResults = _metadata.totalResults;
      }, err => {

      })
  }

  PageChanged(event) {
    this.customerListFilter.pagination.pageNum = event;
    this.GetCustomer(this.customerListFilter)
  }

  ResetFilter() {
    this.customerListFilter = new CustomerListFilter();
    this.GetCustomer(this.customerListFilter);
  }

  Filter() {
    this.GetCustomer(this.customerListFilter);
  }

  AuthenticateModal(content, customerId) {
    this.customerId = customerId;
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  AuthenticateAdmin() {
    if (this.authenticationForm.invalid)
      return;

    let { user } = JSON.parse(sessionStorage.getItem('credentials') || localStorage.getItem('credentials'));
    this.authenticationForm.get('id').setValue(user.id);

    this.authService.authenticateAdmin(this.authenticationForm.value)
      .subscribe(res => {
        this.getCustomerById();
      })
  }

  getCustomerById() {
    this.apiService.GetCustomerbyId(this.customerId)
      .subscribe(({ contact_info, name }) => {
        this.customerPhoneNumber = contact_info.phone_number
        this.customer = name
        this.modalService.dismissAll()
        this.modalService.open(this.customerPhone, { centered: true, backdrop: 'static' })
      })
  }

  Delete(customerId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.DeleteCustomer(customerId);
      }
    })
  }

  DeleteCustomer(customerId: any) {
    this.apiService.DeleteCustomer(customerId)
      .subscribe(res => {
        Swal.fire(
          'Deleted!',
          'Customer has been deleted.',
          'success'
        )
        this.GetCustomer(this.customerListFilter);
      })
  }

  openEmailModal(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
}
