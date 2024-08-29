import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form'; // Import NG-ZORRO Form Module
import { NzButtonModule } from 'ng-zorro-antd/button'; // Import NG-ZORRO Button Module
import { ReactiveFormsModule } from '@angular/forms'; // Import Angular Forms Module
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzButtonModule], // Import ReactiveFormsModule and NG-ZORRO Modules
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authservice: AuthService,
    private router:Router,
    private message: NzMessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Changed from username to email
      password: ['', Validators.required]
    });
  }

  login(){
    console.log(this.loginForm.value);
    this.authservice.login(this.loginForm.value).subscribe((res) =>{
      console.log(res);
      if(res.userId != null){
        const user = {
          id: res.userId,
          role: res.userRole
        }
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);
        if(StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl("/admin/dashboard");
        } else if(StorageService.isCustomerLoggedIn()){
          this.router.navigateByUrl("/customer/dashboard");
        } else{ 
          this.message.error("Bad credentials", {nzDuration: 5000});
         }

      }
    })
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login(); // Call login on form submit
    }
  }

  
}
