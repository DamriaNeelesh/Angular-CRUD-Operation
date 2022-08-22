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
// delete ke liye service api bana diya hai
  deleteUser(userId:number){
    console.log(userId);
    return this._httpService.delete(`${this.API_BASE_PATH}users/${userId}`)
  }
  // Note that ki yeh jo ham httpService mai API base path denge that should be in correct form no space and all
  // Taaki wo har user ke data ko id se pata krega ex:
  // 1. User -  Neelesh ko target krne ke liye api se => "http://localhost:4200/api/users/1" ;

  updateUser(userId:number){
    console.log(userId ,"nd Id Data Updated");
    
  }
}
