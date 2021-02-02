import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCrudComponent } from './customer-crud/customer-crud.component';
import { CustomerAdvanceSearchComponent } from './customer-advance-search/customer-advance-search.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [CustomerListComponent, CustomerCrudComponent, CustomerAdvanceSearchComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    SharedModule,
    CustomerRoutingModule
  ]
})
export class CustomersModule { }
