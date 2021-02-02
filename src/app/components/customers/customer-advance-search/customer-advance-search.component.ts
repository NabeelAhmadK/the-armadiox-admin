import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerListFilter } from '../models';
@Component({
  selector: 'app-customer-advance-search',
  templateUrl: './customer-advance-search.component.html',
  styleUrls: ['./customer-advance-search.component.scss']
})
export class CustomerAdvanceSearchComponent implements OnInit {
  @Input() filter: CustomerListFilter;
  @Output() search = new EventEmitter();
  @Output() clear = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  Clear() {
    this.clear.emit();
  }

  Search() {
    this.filter.pagination.pageNum = 1;
    this.search.emit();
  }
}
