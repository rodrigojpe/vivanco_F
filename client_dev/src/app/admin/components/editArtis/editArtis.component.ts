import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
declare var swal:any;
// declare var select:any;
import * as moment from 'moment';
//servicios
 import {GLOBAL} from '../../../services/global';
 // import {AlbumService} from '../../../services/album.service';
 import {UserService} from '../../../services/user.service';
 import {UploadService} from '../../../services/upload.service';
 import {ArtistService} from '../../../services/artist.service';
// // modelo
 import {Artist} from '../../../models/artist';
 import {Album} from '../../../models/album';


@Component({
  selector: 'edit-artis',
  templateUrl: '../artisAdd/addArtist.component.html'
})

export class ArtistEditComponent implements OnInit{
  public title;
  public artist: Artist;
  public identity;
  public  url:any;
  public token;
  public alertMessage;
  public is_edit;


  constructor(
      private _route : ActivatedRoute,
      private _router: Router,
      private _userService : UserService,
      private _artisService: ArtistService,
      private _uploadService: UploadService
  ){
      this.title ='Edit Artist';
      this.identity = _userService.getIdentity();
      this.url = GLOBAL.url;
      this.token = _userService.getToken();
      this.artist = new Artist('','','','');
      this.is_edit = true;
  }

  ngOnInit(){
    this.getArtist();
  }

  getArtist(){
    this._route.params.forEach((params: Params)=>{
        let id = params['id'];
        this._artisService.getArtist(this.token , id).subscribe(
          response =>{
              if (!response.artist) {
                  // this._router.navigate(['/']);
                  console.log(response.artist);

              }else{
                console.log(response.artist);
                this.artist = response.artist;
              }
          },
          error =>{
              var errorMessage = <any>error;
              if (errorMessage != null) {
                  var body = JSON.parse(error._body);
                  this.alertMessage = body.message;
                  console.log(error);
              }
          }
        )
    });
  }

  onSubmit(){
    // console.log(this.artist);
    this._route.params.forEach((params: Params)=>{
        let id = params['id'];
        this._artisService.editArtis(this.token,id, this.artist).subscribe(
            response =>{
                if (!response.artist) {
                    this.alertMessage = 'error en el servidor';

                }else{
                  this.alertMessage = 'El artisita fue actualizado exitosamente';
                  if (!this.filesToUpload) {
                    this._router.navigate(['admin-panel/list-artist/', response.artist._id])

                  }else{
                    this._uploadService.mekeFileRequest(this.url +'upload-img-artist/' + id, [],this.filesToUpload, this.token, 'image')
                        .then(
                            (result)=>{
                              this.artist = response.artist;
                              swal({
                                position: 'top-end',
                                type: 'success',
                                title: this.alertMessage,
                                showConfirmButton: false,
                                timer: 2500
                              })
                              this._router.navigate(['admin-panel/list-artist/',1])
                            },
                            (error)=>{
                                console.log(error);
                            }
                        )
                  }
                }
                // this.alertMessage = response.message;
            },
            error =>{
                var errorMessage = <any>error;
                if (errorMessage != null) {
                    this.alertMessage = JSON.parse(error._body);
                    // console.log(this.alertMessage);
                    swal({
                      position: 'top-end',
                      type: 'error',
                      title: this.alertMessage,
                      showConfirmButton: false,
                      timer: 1500
                    })
            }
        }
    )
  })
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
    }

}
