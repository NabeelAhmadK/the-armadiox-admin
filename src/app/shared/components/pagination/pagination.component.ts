import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() dataSize: any;
  @Output() pageChanged = new EventEmitter()
  page: any = 1;

  constructor() { }

  ngOnInit() {
  }

  PageChanged(event: any) {
    this.pageChanged.emit(event);
  }

}
