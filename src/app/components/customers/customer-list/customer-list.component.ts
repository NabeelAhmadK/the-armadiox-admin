import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../shared/services/api.service';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  instaLink: any = 'https://www.instagram.com/'
  facebookLink: any = 'https://www.facebook.com/'
  customers: Array<any> = []
  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.GetCustomer()
  }


  GetCustomer() {
    this.apiService.GetCustomer()
      .subscribe(res => {
        this.customers = res.listings;
      }, err => {

      })
  }
}
