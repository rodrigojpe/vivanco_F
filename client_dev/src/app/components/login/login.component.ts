'use strict'
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router, Params} from '@angular/router';


 declare var swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public title :String;
  public user: User;
  public identity;
  public token;
  public status:String;




  constructor(
    private  route: ActivatedRoute,
    private _router : Router,
    private _userService : UserService
  ) {
    this.title = 'Identificate';
    this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit() {
    console.log('login.component cargado !!');

    // console.log(localStorage.getItem('identity'));
    // console.log(localStorage.getItem('token'));
    console.log(this._userService.getIdentity());
    console.log(this._userService.getToken());
  }

  onSubmit(loginForm){
  this._userService.login(this.user).subscribe(
          response =>{
            this.identity = response.user;
            if (!this.identity || !this.identity._id) {
                alert('el ususario no se a logeado correctamente');
                console.log('1');
            }else{
                  // console.log(this.identity);
                  localStorage.setItem('identity', JSON.stringify(this.identity));
                        // consegir el token
                        this._userService.login(this.user, 'true').subscribe(
                        response =>{
                            this.token = response.token;
                            if (this.token.length <= 0) {
                                alert('El token no se ha generado');
                                console.log('2');

                            }else{
                              // Mostrar token
                              localStorage.setItem('token',this.token);
                              // console.log(this.token);
                              this.user = new User('','','','','','ROLE_USER','');
                              this.status = 'success';
                              loginForm.reset();
                              this._router.navigate(['/admin-panel'])
                            }
                        },
                        error => {
                          console.log('3');
                          console.log(<any>error);

                        }
                      )
            }
          },
          error =>{
              var errorMensaje = <any>error;
              console.log('4');
              if (errorMensaje != null) {
                  var body = JSON.parse(error._body);
                  this.status = 'error';
                  console.log(body);
                  swal({
                      type: 'error',
                      title: 'Oops...',
                      text: body.message,
                      footer: 'no sea pollo !!!'
                    })
                 }
          }
      )
    }



}
