import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 private API_BASE_PATH : string = "http://localhost:4200/api/";

  constructor(private _httpService:HttpClient) { }

  // Its sinmilar like get alll data in the server
  
  getUsers(){
    // Yahan users naam se api GET krenge jb bhi getUsers wala fxn call hoga 
    // Aur isko ham app.component.ts mai jaake inject kr denge
    return this._httpService.get(this.API_BASE_PATH + "users"); // concat kr diya taaki ab localhost:4200/api/User pe data aa jaega sara
  }
   // getUser mai .get request he use krni padti hai along with full base API path of that data
   getUser(userId:number){
    return this._httpService.get(`${this.API_BASE_PATH}users/${userId}`)
   }

   // for adding the User we will make .post request along with just the API Base path of the users where the adding need to be done
   addUser(user: User){
    return this._httpService.post(`${this.API_BASE_PATH}users`,user)
   }
   
// Put mai hamein path aur Id bhi dena hota hai
   updateUser(user: User){
    return this._httpService.put(`${this.API_BASE_PATH}users/${user.id}`,user)
   }


// delete ke liye service api bana diya hai
  deleteUser(userId:number){
    console.log(userId + ' User deleted');
    return this._httpService.delete(`${this.API_BASE_PATH}users/${userId}`)
  }
  // Note that ki yeh jo ham httpService mai API base path denge that should be in correct form no space and all
  // Taaki wo har user ke data ko id se pata krega ex:
  // 1. User -  Neelesh ko target krne ke liye api se => "http://localhost:4200/api/users/1" ;

}

