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
  selector: 'add-song',
  templateUrl: './addSong.component.html',
  providers:[SongService, UserService]
})

export class AddSongComponent {
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
    this.title = "Songs Album";
    this.is_edit=false;
    this.song = new Song('1','','','','')
    this.url = GLOBAL.url;
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();


  }

  onSubmit(){
    this._route.params.forEach((params:Params)=>{
      let album_id = params['album'];
       console.log(album_id);
       console.log(this.song);
       console.log('===========')
       this.song.album = album_id;

      this._songService.addSong(this.token, this.song).subscribe(
        response =>{
            if (!response.song) {
                    this.alertMessage='Error en el servidor';
            }else{
              console.log('actualizo');
                this.alertMessage = 'La cancion se grabo Correctamente';
                  this.song = response.song;
                  this._router.navigate(['/admin-panel/song-edit/', response.song._id])
              // this.album = response.album;


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
