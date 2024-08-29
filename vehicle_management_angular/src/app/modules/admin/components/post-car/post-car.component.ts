import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-post-car',
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
    CommonModule // Add CommonModule here
  ],
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent {

  postCarForm! : FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  listOfBrands = ["TATA","MAHINDRA","KIA","BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver","Purple"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(private fb: FormBuilder,
              private adminService: AdminService,
              private message: NzMessageService,
              private router: Router) { }

  ngOnInit() {
      this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    });
  }

  postCar() {
    console.log(this.postCarForm.value);
    this.isSpinning = true;

    const formData: FormData = new FormData();

    // Check if selectedFile is not null before appending
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // Append other form data
    formData.append('carDto', new Blob([JSON.stringify(this.postCarForm.value)], { type: 'application/json' }));

    console.log(formData);

    this.adminService.postCar(formData).subscribe((res) => {
      this.isSpinning = false;
      this.message.success("Car posted successfully", { nzDuration: 5000 });
      console.log(res);
      this.router.navigateByUrl("/admin/dashboard");
    }, error => {
      this.message.error("Error while posting car", { nzDuration: 5000 });
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.previewImage();
    }
  }

  previewImage(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
