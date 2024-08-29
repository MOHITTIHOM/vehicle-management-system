import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form'; // Import NG-ZORRO Form Module
import { NzButtonModule } from 'ng-zorro-antd/button'; // Import NG-ZORRO Button Module
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import Angular Forms Modules
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message'; // Import NgZorro Message Service
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzButtonModule, FormsModule], // Import ReactiveFormsModule and NG-ZORRO Modules
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private message: NzMessageService,
    private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required], // Change 'username' to 'name'
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required] // Add the confirmPassword field
    }, { validators: this.passwordMatchValidator }); // Add custom validator
  }

  register() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.authService.register(this.signupForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.id != null) {
            this.message.success("Signup Successful", { nzDuration: 5000 });
            this.router.navigateByUrl("/login");
          } else {
            this.message.error("Something went wrong", { nzDuration: 5000 });
          }
        },
        error: (err) => {
          console.error('Error during registration:', err);
          this.message.error("Error during registration", { nzDuration: 5000 });
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  get name() {
    return this.signupForm.get('name'); // Update to match form control name
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  onSubmit() {
    this.register(); // Ensure register is called on form submit
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword ? { mismatch: true } : null;
  }
}
