import { Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';

export const routes: Routes = [
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'customer', loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule) },
  // Add a default route if needed
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirect to login or a default route
];

export class AppRoutingModule { }



/*
import { Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AdminModule } from './modules/admin/admin.module';
import { CustomerModule } from './modules/customer/customer.module';

export const routes: Routes = [
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminModule },
  { path: 'customer', component: CustomerModule }
  //{ path: 'admin', loadChildren : () => import("./module/admin/admin.module").then(m => m.AdminModule) },
  //{ path: 'customer', loadChildren : () => import("./module/customer/customer.module").then(m => m.CustomerModule) },

];

export class AppRoutingModule{ }

*/