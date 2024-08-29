import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule,
    RouterModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss'], // Use 'styleUrls' instead of 'styleUrl'
  providers: [DatePipe] // Add DatePipe here
})
export class CustomerDashboardComponent {
  
  cars: any[] = [];
  
  constructor(
    private service: CustomerService,
    private datePipe: DatePipe,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars(): void {
    this.service.getAllCars().subscribe({
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
}
