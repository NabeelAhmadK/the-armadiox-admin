import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerCrudComponent } from './customer-crud/customer-crud.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerListComponent
    },
    {
        path: 'customers',
        component: CustomerListComponent
    },
    {
        path: 'customer',
        component: CustomerCrudComponent
    },
    {
        path: 'customer/:customerId',
        component: CustomerCrudComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
