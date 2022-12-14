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
import { DBOperation } from './_helpers/db-operation';
import { MustMatch} from './must-match.validator';

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

 submitted : boolean = false;

 buttonText : string = "Submit";
 // Yahi button save ki jagah chala jaega jb edit krke aaenge toh save aaega nhi toh submit
dbops : DBOperation; 

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
   this.buttonText ="Submit";
   this.dbops = DBOperation.create;

        this.registrationForm = this._fb.group({
            id:[0],
            title:['',Validators.required], /*validator taaki uss required field ko compuolsory bana skein*/
            firstName:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10)])],
    //      /*yeh ek array hai [initial Value , validations]*/
            lastName:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10)])],
            email:['',Validators.compose([Validators.required,Validators.minLength(6)])],
            dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],         
            password:['',Validators.compose([Validators.required,Validators.minLength(6)])],
            confirmPassword:['',Validators.required],
            acceptTerms:[false,Validators.requiredTrue],
       },{
         validators : MustMatch('password','confirmPassword'),
       });
       this.getAllUsers()  // We can also call just after this also
       if(this.users) {
        this.registrationForm.patchValue(this.users)
       }


// New way of grouping form as this previous will depreciated after -3 years


// this.registrationForm = new FormGroup({
//   id: new FormControl(0),
//   title: new FormControl('',Validators.required), /*validator taaki uss required field ko compuolsory bana skein*/
//   firstName: new FormControl('',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10)])),
//   /*yeh ek array hai [initial Value , validations]*/
//   lastName:new FormControl('',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10)])),
//   email:new FormControl('',Validators.compose([Validators.required,Validators.minLength(6)])),
//   dob: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),         
//   password:new FormControl('',Validators.compose([Validators.required,Validators.minLength(6)])),
//   confirmPassword:new FormControl('',Validators.required),
//   acceptTerms:new FormControl(false,Validators.requiredTrue),
// },{
//   MustMatch('password','confirmPassword'),
// });






  }










  // ab Validation ke liye html mai baar yeh registartionForm .control ki jagah mai valid fxn use krunga 
get valid(){
  return this.registrationForm.controls;
}


//Yeh jo onSubmit() hai isi pr hamko update bhi krna hai aur save bhi 
  onSubmit(){
    this.submitted = true;

     if(this.registrationForm.invalid){
      return;
     }
  switch (this.dbops) {
    case DBOperation.create:
      this._userService.addUser(this.registrationForm.value).subscribe(res=> {
       this._toastr.success("User Added !!","User Registration");
       this.getAllUsers();
       this.onCancel();
      });
      break;
    case DBOperation.update:  
    this._userService.updateUser(this.registrationForm.value).subscribe(res=> {
      this._toastr.success("User Updated !!","User Registration");
      this.getAllUsers();
      this.onCancel(); // Isse submit hoke blank ho jaega
     });
      break;
  }
}

  
  onCancel(){
    this.registrationForm.reset();
    this.buttonText ="Submit";
    this.dbops = DBOperation.create;
    this.submitted = false; // Matlab hamne submit nhi kiya hai toh wo cancel pe click krne se update wala button save mai convert ho jaega
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
    // Isse yeh hoga ki edit pe click krne pe button ka naam update ho jaega

     this.buttonText ="Update";
     this.dbops = DBOperation.update;

     let user = this.users.find((u: User)=>u.id === userId);
     // Isse wo jagah dhund ke jahan data update krna hai wahan jake patch kr dega
     // The PatchValue is used to update only a subset of the elements of the FormGroup or FormArray . 
     // It will only update the matching objects and ignores the rest
     this.registrationForm.patchValue(user);
     // Agr registration form ke object mai 5 column hain aur edit update ke baad bhi 5 hain tbhi yeh patch work krega
     // Patch krne se jo data ham edit krenge wo form mai show hoke edit hoga

     this.registrationForm.get('password').setValue('');
     // Matlab yeh ki edit ke time password hame dubara dalna padega isiliye usko blank kr diya
     this.registrationForm.get('confirmPassword').setValue(''); 
     // Matlab yeh ki edit ke time Confirmpassword hame dubara dalna padega isiliye usko blank kr diya
     this.registrationForm.get('acceptTerms').setValue(''); 

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
      else if (result.dismiss === Swal.DismissReason.cancel){
        Swal.fire(
          'Cancelled',
          'Your Record is safe',
          'error'  
        )
      }
    })


    
  }



}

 
