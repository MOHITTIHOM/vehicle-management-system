import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    RouterModule,
    NzLayoutModule,
    NzButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzSpinModule,
    NzInputModule,
    NzSelectModule,
    NzTimePickerModule,
    NzDatePickerModule,
    NzTableModule,
    CommonModule
  ],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {
  bookings:any;
  isSpinning = false;

  constructor(private service: CustomerService) { 
    this.getMyBookings();
  }

  getMyBookings(){
    this.isSpinning = true;
    this.service.getBookingsByUserId().subscribe((res)=>{
      this.isSpinning = false;
      this.bookings = res;
      console.log(res);
      
    })
  }

}
