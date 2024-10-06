import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

import { CONFIG } from '../../../services/config.service';


const BASE_URL = CONFIG.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { } // Fix typo: 'htpp' to 'http'

  postCar(formData: any): Observable<any> {
    return this.http.post(`${BASE_URL}/api/admin/vehicle`, formData, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllCars():Observable<any>{
    return this.http.get(BASE_URL+"/api/admin/vehicles",{
      headers: this.createAuthorizationHeader()
    });
  }

  deleteCar(id:number):Observable<any>{
    return this.http.delete(BASE_URL+"/api/admin/vehicle/" + id,{
      headers: this.createAuthorizationHeader()
    });
  }

  getCarById(id: number):Observable<any>{
    return this.http.get(BASE_URL+"/api/admin/vehicle/"+id , {
      headers: this.createAuthorizationHeader()
    })
  }

  updateCar(carId:number, formData: any): Observable<any> {
    return this.http.put(BASE_URL+"/api/admin/vehicle/" + carId, formData, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarBookings(): Observable<any> {
    return this.http.get(BASE_URL+"/api/admin/vehicle/bookings", {
      headers: this.createAuthorizationHeader()
    });
  }

  changeBookingStatus(bookingId:number, status:string):Observable<any>{
    return this.http.get(BASE_URL+`/api/admin/vehicle/booking/${bookingId}/${status}`, {
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
