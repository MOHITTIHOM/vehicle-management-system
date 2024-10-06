import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
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
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-get-bookings',
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
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.scss'
})
export class GetBookingsComponent {
  bookings:any;
  isSpinning = false;
  constructor(private adminService: AdminService, private message: NzMessageService) {
    //this.isSpinning = true;
    this.getBookings();
  }

  getBookings(){
    this.isSpinning = true;
    this.adminService.getCarBookings().subscribe((res)=>{
      console.log(res);
      this.bookings = res;
      this.isSpinning = false;
    })
  }

  changeBookingStatus(bookingId:number, status:string){
    this.isSpinning = true;
    console.log(bookingId, status);
    this.adminService.changeBookingStatus(bookingId, status).subscribe((res)=>{
      this.isSpinning = false;
      console.log(res);
      this.getBookings();
      this.message.success("Booking status changed successfully", { nzDuration:5000});
    }, error => {
      this.message.error("Something went wrong", {nzDuration: 5000});
    })
  }
}
