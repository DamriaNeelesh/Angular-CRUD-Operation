import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OnInit} from '@angular/core';
import swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms'; 
import { UserService } from './_helpers/user.service';
import { User } from './_helpers/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'registraton-app';
/*  registrationForm :FormGroup = new FormGroup({});*/ 
 registrationForm :FormGroup;  /*Yeh use krne ke liye hamne strict mode false kiya hai inside tsconfig.json*/ 

 users: User[] = [];

constructor(private _toastr:ToastrService , private _fb:FormBuilder,private _userService:UserService){
   
  }

  ngOnInit()
  {
       this.setFormState();
  }

  setFormState(){ /*Form Group ke andar form control Add krna hai*/
    this.registrationForm = this._fb.group({
         id:[0],
         title:['',Validators.required], /*validator taaki uss required field ko compuolsory bana skein*/
         firstName:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10)])],
         /*yeh ek array hai [initial Value , validations]*/
         lastName:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10)])],
         email:['',Validators.compose([Validators.required,Validators.minLength(6)])],
         dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],         
         password:['',Validators.compose([Validators.required,Validators.minLength(6)])],
         confirmPassword:['',Validators.required],
         acceptTerms:[false,Validators.required],
    });
  }

  onSubmit(){
     if(this.registrationForm.invalid){
      return;
     }
  }

  onCancel(){
    this.registrationForm.reset();
  }
// getUsers ko yahan call krenge userService ke through
  getAllUsers(){
    // api ko hit krke jo data aaega userService se getUsers mai usko ham subscribe krke nikaal lenge
    // Yeh jo data hai isko mene subscribe kr liye 
    // As we have to unserstand ki user ka type array hai aur jo response res hai iska type hai object
    // And we know ki jab ham subscribe krte hain toh hame object ki form mai data milta hai 
    // To iss res ko ham convert kr denge User type ke array mai []
   this._userService.getUsers().subscribe((res: User[])=>{
          this.users = res;
          debugger;
          console.log(res);
   });
  }

}

 
