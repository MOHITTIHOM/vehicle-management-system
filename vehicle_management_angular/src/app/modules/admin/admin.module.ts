// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { AdminRoutingModule } from './admin-routing.module';
// import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule,
//     AdminRoutingModule,
//     AdminDashboardComponent
//   ]
// })
// export class AdminModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
