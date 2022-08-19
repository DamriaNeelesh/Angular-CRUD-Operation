import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDbService implement InMemoryDbService {

  constructor() { } 

   createDB(){
    let users = User[] = 
    [
      {id:1,title:'Mr',firstName:'Neelesh',lastName:'Meena',dob:'18-12-1999',email:'damrianeelesh@gmail.com',password:'123456',acceptTerms:true},
      {id:2,title:'Miss',firstName:'Shalini',lastName:'Meena',dob:'14-08-2000',email:'meenahshalu57@gmail.com',password:'123456',acceptTerms:true},

    ]
    return { user };
   }

}