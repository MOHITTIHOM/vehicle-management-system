import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-update-car',
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
    CommonModule], // Add CommonModule here],
    providers: [DatePipe], // Add DatePipe here
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent implements OnInit {

  carId!: number; // Use definite assignment assertion
  existingImage: string | null = null;
  updateForm! : FormGroup;
  isSpinning: boolean = false;
  selectedFile!: File ;
  imagePreview: string | ArrayBuffer | null = null;
  imgChanged: boolean = false;
  saveImage!: File;


  listOfBrands = ["TATA","MAHINDRA","KIA","BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver","Purple"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb:FormBuilder,    
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize carId within ngOnInit
    
    this.carId = this.activatedRoute.snapshot.params["id"];
    this.getCarById(); // Call the method to fetch car details
    
    this.updateForm = this.fb.group({
        name: [null, Validators.required],
        brand: [null, Validators.required],
        type: [null, Validators.required],
        color: [null, Validators.required],
        transmission: [null, Validators.required],
        price: [null, Validators.required],
        description: [null, Validators.required],
        year: [null, Validators.required],
    })
  }

  getCarById(): void {
    this.isSpinning = true;
    this.adminService.getCarById(this.carId).subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      const carDto = res;
      this.saveImage = res.image;
      this.existingImage = 'data:image/jpeg;base64,' + res.image;
      console.log(carDto);
      console.log(this.existingImage);
      this.updateForm.patchValue(carDto);
    });
  }

  updateCar(){
    console.log(this.updateForm.value);
    this.isSpinning = true;

    const formData: FormData = new FormData();

    // Append the image file if it has changed
    if (this.imgChanged && this.selectedFile) {
        formData.append('image', this.selectedFile);
    } else if (this.saveImage) {
        // Use a placeholder for image if not updated
        // Here, we assume an empty image to not override existing image
        // If needed, this can be adjusted based on API design
        formData.append('image', new Blob([], { type: 'application/octet-stream' }));
    }

    // Append other form data
    formData.append('carDto', new Blob([JSON.stringify(this.updateForm.value)], { type: 'application/json' }));

    console.log(formData);

    this.adminService.updateCar(this.carId, formData).subscribe((res) => {
        this.isSpinning = false;
        this.message.success("Car Updated successfully", { nzDuration: 5000 });
        console.log(res);
        this.router.navigateByUrl("/admin/dashboard");
    }, error => {
        this.message.error("Error while updating car", { nzDuration: 5000 });
    });
}


  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.imgChanged = true;
    this.existingImage = null;
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }
}
