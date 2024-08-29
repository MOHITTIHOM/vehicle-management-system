import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout'; // Import NzLayoutModule for nz-header
import { NzButtonModule } from 'ng-zorro-antd/button'; // Import NzButtonModule for buttons
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import Angular Forms Modules
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf and other common directives
import { StorageService } from './auth/services/storage/storage.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // Add CommonModule here
    RouterModule,
    NzLayoutModule,
    NzButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzSpinModule,
    
    
    NzInputModule,
    
    NzSelectModule,
    NzTimePickerModule
  ]
})
export class AppComponent {
  title = 'my-angular-app';
  isCustomerLoggedIn:boolean = StorageService.isCustomerLoggedIn();
  isAdminLoggedIn:boolean = StorageService.isAdminLoggedIn();

  constructor(private router: Router){ }

    ngOnInit() {
      this.router.events.subscribe(event => {
        if(event.constructor.name === "NavigationEnd"){
          this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
          this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
        }
      })
    }

    logout(){
      StorageService.logout();
      this.router.navigateByUrl("/login");
    }

}


  // isCustomerLoggedIn:boolean = StorageService.isCustomerLoggedIn();
  // isAdminLoggedIn:boolean = StorageService.isAdminLoggedIn();

  //   constructor(private router: Router){ }

  //   ngOnInit() {
  //     this.router.events.subscribe(event => {
  //       if(event.constructor.name === "NavigationEnd"){
  //         this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
  //         this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
  //       }
  //     })
  //   }


