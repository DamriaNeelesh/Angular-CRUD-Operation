import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
SERVER_URL : string = "http://localhost:4200/api/";
  constructor() { }
}
