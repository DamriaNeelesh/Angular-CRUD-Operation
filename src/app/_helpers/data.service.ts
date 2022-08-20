import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})

export class DataService implements InMemoryDbService {
  constructor() { }
  createDb() {
    return {
      User: [
        {
          id: 1,
          title:'Mr',
          firstName:'Neelesh',
          lastName:'Meena',
          dob:'18-12-1999',
          email:'damrianeelesh@gmail.com',
          password:'shaaneelu',
          acceptTerms:true,          
        },
        {
          id: 2,
          title:'Miss',
          firstName:'Shalini',
          lastName:'Meena',
          dob:'14-08-2000',
          email:'meenashalu57@gmail.com',
          password:'shaaneelu',
          acceptTerms:true,   
        },
      ]
    };
  }
}