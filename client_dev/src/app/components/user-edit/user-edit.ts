'use strict'
import {Component, OnInit} from '@angular/core';
import {Router, Params, ActivatedRoute} from '@angular/router';
// import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';

import { GLOBAL } from '../../services/global';
declare var swal: any;

@Component({
  selector:'user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UploadService]
})

export class UserEditComponent implements OnInit {
    public title: String;
    public user: User;
    public identity;
    public token;
    public status;
    public url:String;

    constructor(
        private _userService : UserService,
        private _uploadService : UploadService
    ){
        this.title = 'Actualizar mis datos';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
        this.url = GLOBAL.url;
    }

    ngOnInit(){
      console.log('user-edit.component.ts cargado!!');
    }

    onSubmit(){
      console.log('entrando al edit user');
      this._userService.updateUser(this.user).subscribe(
        response =>{
          if (!response.user) {
              this.status = 'error';
          }else{
              localStorage.setItem('identity',JSON.stringify(this.user));
              this.status = 'success';
              // subir imagen
              console.log('subiendo imagen');
              this._uploadService.mekeFileRequest(this.url + 'upload-img/'+this.user._id,[],this.fileToUpload, this.token, 'image')
                  .then((result:any) => {
                     this.user.image = result.image;
                     localStorage.setItem('identity',JSON.stringify(this.user));
                     swal({
                         type: 'success',
                         title: 'en ora buena...',
                         text: 'Usuario actualizado Correctamente',
                         footer: 'update ready!'
                       })
                     // console.log('mostrando al user');
                      // console.log(this.user);

                  });
          }
        },
        error =>{
          var errorMessage = <any>error;
          if (errorMessage != null) {
              this.status = 'error';
          }
        }
      );
    }

    public fileToUpload: Array<File>;
    fileChangeEvent(fileInput:any){
      this.fileToUpload = <Array<File>>fileInput.target.files;
      // console.log(this.fileToUpload);

    }

}
