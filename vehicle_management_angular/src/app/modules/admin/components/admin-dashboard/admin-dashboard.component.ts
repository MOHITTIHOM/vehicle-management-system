import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Import DatePipe
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,
            RouterModule
  ], // Add CommonModule here
  providers: [DatePipe], // Add DatePipe here
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  cars: any[] = [];

  constructor(private adminService: AdminService, 
    private datePipe: DatePipe,
    private message: NzMessageService) {}

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars(): void {
    this.adminService.getAllCars().subscribe({
      next: (res: any[]) => {
        console.log(res);
        this.cars = res.map(car => {
          return {
            ...car,
            processedImg: car.image ? 'data:image/jpeg;base64,' + car.image : '',
            formattedYear: this.datePipe.transform(car.year, 'yyyy') // Format date
          };
        });
      },
      error: err => {
        console.error('Error fetching cars:', err);
      }
    });
  }

deleteCar(id: number){
  console.log(id);
  this.adminService.deleteCar(id).subscribe((res)=>{
    this.getAllCars();
    this.message.success("Car deleted successfully", {nzDuration:5000});
  })
}

}
