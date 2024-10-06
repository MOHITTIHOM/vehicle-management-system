import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-book-car',
  standalone: true,
  imports: [RouterModule,
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
    CommonModule],
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss'
})
export class BookCarComponent {

  carId!: number; 
  car:any;
  processedImage: any;
  validateForm! : FormGroup;
  isSpinning = false;
  dateFormat!:"DD-MM-YYYY"

  constructor(private service: CustomerService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message:NzMessageService,
    private route: Router
  ){ }

  ngOnInit(){
    this.validateForm = this.fb.group({
      toDate:[null, Validators.required],
      fromDate:[null, Validators.required]
    });
    this.carId = this.activateRoute.snapshot.params["id"];
    this.getCarByiD();
  }

  getCarByiD(){
    this.service.getCarById(this.carId).subscribe((res)=> {
      console.log(res);
      this.processedImage = 'data:image/jpeg;base64,' + res.image;
      this.car = res;
    })
  }

  bookACar(data : any){
    console.log(data);
    this.isSpinning = true;
    let bookAVehicleDto = {
      toDate: data.toDate,
      fromDate: data.fromDate,
      userId:StorageService.getUserId(),
      vehicleId:this.carId
    }
    this.service.bookAVehicle(bookAVehicleDto).subscribe((res)=>{
      console.log(bookAVehicleDto);
      console.log(res);
      this.message.success("Booking request submitted successfully", { nzDuration:5000});
      this.route.navigateByUrl("/customer/dashboard");
    }, error => {
      this.message.error("Something went wrong", {nzDuration: 5000});
    })
  }
}
