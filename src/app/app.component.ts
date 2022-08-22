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
import { DataService } from './_helpers/data.service';
import Swal from 'sweetalert2';

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

constructor(
  private _toastr:ToastrService,
  private _fb:FormBuilder,
  private _userService:UserService,
  private _dataService:DataService
  ){}

  ngOnInit() // jo sbse pehle load hoga 
  {
       this.setFormState();
       this.getAllUsers(); // Sbse call krna hoga tbhi toh aage ka kaam hoga 
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
   //  this.getAllUsers()  - We can also call just after this also
    // if(this.users) {
    //   this.registrationForm.patchValue(this.users)
    // }
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
          // console.log(res); // We will get the user araay data in console
   });
  }

  Edit(userId:number){
     
  }
// Uss delete krne wali service ko yahan subscribe kr denge
  Delete(userId:number){
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: "You won't be able to recover Deleted User's Data!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this._userService.deleteUser(userId).subscribe(res => {
          this.getAllUsers(); // Delete krne ke baad ham table ko vapis bind kr denge
          this._toastr.success('Deleted Successfully!!','User Registration'); // Sweet Alert Box
        })
      }
    })


    
  }

}

 
