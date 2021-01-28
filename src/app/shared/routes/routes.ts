import { Routes } from '@angular/router';


export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'customer-management',
    loadChildren: () => import('../../components/customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'product-management',
    loadChildren: () => import('../../components/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'order-management',
    loadChildren: () => import('../../components/order/order.module').then(m => m.OrderModule)
  }
];

export const auth: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../../auth/auth.module').then(m => m.AuthModule)
  },
];
