import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

import { CONFIG } from '../../../services/config.service';


const BASE_URL = CONFIG.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getAllCars():Observable<any>{
    return this.http.get(BASE_URL+"/api/customer/vehicles",{
      headers: this.createAuthorizationHeader()
    });
  }

  getCarById(carId:number):Observable<any>{
    return this.http.get(BASE_URL+"/api/customer/vehicle/"+carId,{
      headers: this.createAuthorizationHeader()
    });
  }

  bookAVehicle(bookAVehicleDto:any):Observable<any>{
    console.log(bookAVehicleDto);
    return this.http.post(BASE_URL+"/api/customer/vehicle/book", bookAVehicleDto,{
      headers: this.createAuthorizationHeader()
    });
  }

  getBookingsByUserId():Observable<any>{
    return this.http.get(BASE_URL+"/api/customer/vehicle/bookings/"+StorageService.getUserId(),{
      headers: this.createAuthorizationHeader()
    });
  }


  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }
}
