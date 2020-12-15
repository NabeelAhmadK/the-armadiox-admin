import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderCrudComponent } from './order-crud/order-crud.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
    {
        path: '',
        component: OrderListComponent
    },
    {
        path: 'orders',
        component: OrderListComponent
    },
    {
        path: 'order',
        component: OrderCrudComponent
    },
    {
        path: 'order/:orderId',
        component: OrderCrudComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule { }
