// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';

// const routes: Routes = [
//   {path: 'dashboard', component: CustomerDashboardComponent}
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class CustomerRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BookCarComponent } from './components/book-car/book-car.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
// Import components as needed

const routes: Routes = [
  // Define routes for customer module
  { path: 'dashboard', component: CustomerDashboardComponent },
  { path: 'book/:id', component: BookCarComponent },
  { path: 'my_bookings', component: MyBookingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
