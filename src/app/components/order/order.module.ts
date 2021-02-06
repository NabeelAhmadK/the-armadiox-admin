import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderCrudComponent } from './order-crud/order-crud.component';
import { OrderRoutingModule } from './order-routing.modules';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [OrderListComponent, OrderCrudComponent, QuickViewComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
