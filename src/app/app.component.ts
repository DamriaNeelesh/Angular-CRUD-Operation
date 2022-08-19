import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OnInit} from '@angular/core';
import swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'registraton-app';
/*  registrationForm :FormGroup = new FormGroup({});*/ 
 registrationForm :FormGroup;  /*Yeh use krne ke liye hamne strict mode false kiya hai inside tsconfig.json*/ 
constructor(private _toastr:ToastrService , private _fb:FormBuilder){
   
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

}


