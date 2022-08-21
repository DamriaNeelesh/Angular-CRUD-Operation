import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 private API_BASE_PATH : string = "http://localhost:4200/api/";

  constructor(private _httpService:HttpClient) { }

  getUsers(){
    // Yahan users naam se api GET krenge jb bhi getUsers wala fxn call hoga 
    // Aur isko ham app.component.ts mai jaake inject kr denge
    return this._httpService.get(this.API_BASE_PATH + "users"); // concat kr diya taaki ab localhost:4200/api/User pe data aa jaega sara
  }
}
