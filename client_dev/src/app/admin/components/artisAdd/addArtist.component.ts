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
  selector: 'add-album',
  templateUrl: './addArtist.component.html'
})

export class ArtistAddComponent implements OnInit{
  public title;
  public artist : Artist;
  public identity;
  public  url:any;
  public token;
  public alertMessage;

  constructor(
      private _route : ActivatedRoute,
      private _router: Router,
      private _userService : UserService,
      private _artisService: ArtistService
  ){
      this.title ='Add Artist';
      this.identity = _userService.getIdentity();
      this.url = GLOBAL.url;
      this.token = _userService.getToken();
      this.artist = new Artist('','','','');

  }

  ngOnInit(){

  }

  onSubmit(){
    // console.log(this.artist);
    this._artisService.addArtis(this.token, this.artist).subscribe(
        response =>{
            if (!response.artist) {
                this.alertMessage = 'error en el servidor';

            }else{
              this.alertMessage = 'El artisita fue creado exitosamente';

                this.artist = response.artist;
                swal({
                  position: 'top-end',
                  type: 'success',
                  title: this.alertMessage,
                  showConfirmButton: false,
                  timer: 1500
                })
                this._router.navigate(['admin-panel/artist-edit/',response.artist._id])

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
  }
}
