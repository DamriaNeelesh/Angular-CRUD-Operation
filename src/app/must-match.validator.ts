import { FormGroup } from "@angular/forms";

export function MustMatch(password: string,confirmPassword: string) {
 return  (formGroup : FormGroup) => {
   //    formGroup ka hame object mil gya form control ka object nikal skte hain
   //    formGroup mai se formControl name ke basis pe formControl ka object nikal skte hain
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
   // FormGroup mai se hamne control ko find kiya 

   if(confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']){
    return ;
   }
// Agr hamare form mai confirmPaasword wale mai error ho yaa password jb tk daal rhe ho tb tk neeche wala shuru nhi hoga 
// neeche wala password dalne ke baad he confirm password wala shuru ho jaega

   if(passwordControl.value !== confirmPasswordControl.value){
    confirmPasswordControl.setErrors({mustMatch : true});
   }else{
       confirmPasswordControl.setErrors(null);
   }
 }   
}

// import{ AbstractControl , ValidationErrors , ValidatorFn} from '@angular/forms';

// export function MustMatch(password: string,confirmPassword: string):ValidatorFn {
//     return  (ctrl : AbstractControl) : ValidationErrors | null  => {
//          const passwordControl = ctrl.get[password];
//          const confirmPasswordControl = ctrl.get[confirmPassword];
   
//       if(confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']){
//        return ;
//       }
   
//       if(passwordControl.value !== confirmPasswordControl.value){
//        confirmPasswordControl.setErrors({mustMatch : true});
//       }else{
//           confirmPasswordControl.setErrors(null);
//       }
//     }   
//    }


