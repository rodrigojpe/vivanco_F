import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import {Router, Params} from '@angular/router';


import {User} from '../../models/user';
declare var swal: any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
public user : User;
public url:string;
public status: string;


constructor(
  private  _userService : UserService,
  private _router :Router
){
  this.url = GLOBAL.url;
  this.user = new User('','','','','','','');
}



ngOnInit() {
  console.log('mostrando create form');
}

f : FormGroup;
createForm(f){
  console.log(f.form.value);
  if (f) {
 var params = f.form.value;
  this.user.name = params.name;
  this.user.email = params.email;
  this.user.role = 'ROLE_USER';
  this.user.surname = null;
  this.user.password = params.password;

  console.log(this.user);
   // return;

  this._userService.register(this.user).subscribe(
    response =>{

        if (response.user && response.user._id) {
            this.status = 'El usuario se a creado';
            this.user = new User('','','','','','ROLE_USER','');
            swal({
                type: 'success',
                title: 'Bien',
                text: status,
                footer: 'ahora registrate'
              });
            // this.f.reset();
            this._router.navigate(['/login']);

          }else{

            this.status = 'error';
          }
    },
    error =>{
      var errorMensaje = <any>error;
      if (errorMensaje != null) {
          var body = JSON.parse(error._body);
          this.status = 'error';
          console.log(body);
          swal({
              type: 'error',
              title: 'Oops...',
              text: body.message,
              footer: 'no sea pollo !!!'
            });
            this._router.navigate(['/login']);
         }
    }
  );

  }else{
    console.log('se pifio');
  }

}


  // constructor(private _myservice: MyserviceService) {
  //   this.myForm = new FormGroup({
  //     email: new FormControl(null, Validators.email),
  //     username : new FormControl(null, Validators.required),
  //     password : new FormControl(null, Validators.required),
  //     cnfpass : new FormControl(null, this.passValidator)
  //   });
  //   this.myForm.controls.password.valueChanges
  //   .subscribe(
  //     x => this.myForm.controls.cnfpass.updateValueAndValidity()
  //   );
  //  }



  // isValid(controlName){
  //   return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  // }
  //
  // passValidator(control: AbstractControl ){
  //   if (control && (control.value !== null || control.value !== undefined)){
  //     const cnfpassValue = control.value;
  //
  //     const passControl = control.root.get('password');
  //     if (passControl) {
  //         const passValue = passControl.value;
  //         if (passValue !== cnfpassValue || passValue === '') {
  //             return {
  //               isError: true
  //             };
  //         }
  //     }
  //   }
  //   return null;
  // }

  // register(){
  //   console.log(this.myForm.value);
  //   this._myservice.subnitRegister(this.myForm.value)
  //   .subscribe(
  //     data => this.succesMennsage = 'registetation Success',
  //     error => this.succesMennsage = 'Some Error'
  //   );
  // }
}
