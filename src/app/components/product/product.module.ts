import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCrudComponent } from './product-crud/product-crud.component';
import { ProductRoutingModule } from './product-routing.module'
import { SharedModule } from '../../shared/shared.module';
import { ProductAdvanceSearchComponent } from './product-advance-search/product-advance-search.component';

@NgModule({
  declarations: [ProductListComponent, ProductCrudComponent, ProductAdvanceSearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
