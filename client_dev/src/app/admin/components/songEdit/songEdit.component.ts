import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute,Route, Params} from '@angular/router';
declare var swal:any;

//servicios
import {GLOBAL} from '../../../services/global';
import {UserService} from '../../../services/user.service';
import { SongService } from '../../../services/song.service';
import {UploadService} from '../../../services/upload.service';
// // modelo
 import {Song} from '../../../models/song';

@Component({
  selector: 'edit-song',
  templateUrl: '../addSong/addSong.component.html',
  providers:[SongService, UserService, UploadService]
})

export class EditSongComponent {
  public title;
  public is_edit;
  public song : Song;
  public url;
  public alertMessage;
  public identity;
  public token ;



  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    private _uploadService:UploadService,
    private _songService:SongService,
    private _userService:UserService
  ){
    this.title = "Edit Songs";
    this.is_edit=true;
    this.url = GLOBAL.url;
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.song = new Song('','','','','')

  }

  ngOnInit(){
      this.getSong();
  }

  getSong(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
        this._songService.getSong(this.token, id).subscribe(
          response =>{
              if (!response.song) {
                      this.alertMessage='Error en el servidor';
                      // this._router.navigate(['admin-panel/song/',response.song.album])

              }else{
                  this.song = response.song;
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

    })

  }

  onSubmit(){
    console.log(this.song.album);
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];

      this._songService.editSong(this.token, id , this.song).subscribe(
        response =>{
            if (!response.song) {
                    this.alertMessage='Error en el servidor';
            }else{
              // console.log(response.song.album);
              // return;
                this.alertMessage = 'La cancion se actualizo Correctamente';
                swal({
                  position: 'top-end',
                  type: 'success',
                  title: this.alertMessage,
                  showConfirmButton: false,
                  timer: 2500
                });
                this._router.navigate(['admin-panel/album/',response.song.album]);

            if (!this.filesToUpload) {

                }else{
                  this._uploadService.mekeFileRequest(this.url +'upload-song-file/' + id, [],this.filesToUpload, this.token, 'file')
                      .then(
                          (result)=>{
                            swal({
                              position: 'top-end',
                              type: 'success',
                              title: this.alertMessage,
                              showConfirmButton: false,
                              timer: 2500
                            });
                            console.log('acut');
                            this._router.navigate(['admin-panel/album/',response.song.album])

                            },
                            (error)=>{
                                console.log(error);
                            }
                      );
                }

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
    })

  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}
