import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
declare var swal:any;
declare var M:any;

// declare var select:any;
import * as moment from 'moment';
//servicios
 import {GLOBAL} from '../../../services/global';
 // import {AlbumService} from '../../../services/album.service';
 import {UserService} from '../../../services/user.service';
 import {UploadService} from '../../../services/upload.service';
 import {ArtistService} from '../../../services/artist.service';
 import {AlbumService} from '../../../services/album.service';

// // modelo
 import {Artist} from '../../../models/artist';
 import {Album} from '../../../models/album';


@Component({
  selector: 'details-artis',
  templateUrl: './detailsArtis.component.html',
  styleUrls: ['./detailsArtis.component.css']

})

export class ArtistDetailsComponent implements OnInit{
  public title;
  public artist: Artist;
  public identity;
  public  url:any;
  public token;
  public albums :Album[];
  public alertMessage;
  public disc;
  // public _id:any;


  constructor(
      private _route : ActivatedRoute,
      private _router: Router,
      private _userService : UserService,
      private _artisService: ArtistService,
      private _albumService: AlbumService
  ){
      this.title ='Details Artist';
      this.disc = 'Albums';
      this.identity = _userService.getIdentity();
      this.url = GLOBAL.url;
      this.token = _userService.getToken();
      // this.album = new Album('','','','','')
  }

  ngOnInit(){
    this.getArtist();
    document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    instances.onCloseStart = false;
    instances.onCloseEnd = true;
     console.log(instances.onCloseStart);
  });
  }

  getArtist(){
    this._route.params.forEach((params: Params)=>{
        let id = params['id'];
        this._artisService.getArtist(this.token , id).subscribe(
          response =>{
              if (!response.artist) {
                  // this._router.navigate(['/']);
                  // console.log(response.artist);

              }else{
                // console.log(response.artist);
                this.artist = response.artist;
                // sacar los albums de los ArtistDetailsComponent
                  this._albumService.getAlbums(this.token, response.artist._id).subscribe(
                  response =>{
                      if (!response) {
                        this.alertMessage ='Este artista no tiene Albums';
                      }else{
                        this.albums =response.albums;
                      }
                  },
                  error =>{
                    var errorMessage = <any>error;
                    if (errorMessage != null) {
                        var body = JSON.parse(error._body)
                    }
                  }
                  )
              }
          },
          error =>{
              var errorMessage = <any>error;
              if (errorMessage != null) {
                  var body = JSON.parse(error._body);
                  console.log(error);
              }
          }
        )
    });
  }

  onDeleteAlbum(id){
    swal({
        title: 'Estas seguro?',
        text: "Tu no podras revertir esto!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminalo!'
      }).then((result) => {
        console.log(result.dimiss !="cancel");
        if (result.value) {
          swal(
            'Eliminalo!',
            'El Artista ha sido Eliminado.',
            'success'
          )
                this._albumService.deleteAlbum(this.token,id).subscribe(
                  response =>{
                      if (!response.album) {
                          console.log(response);
                      }

                      this.getArtist();
                  },
                  error =>{
                      var messageError = <any>error;

                      if (messageError != null) {
                          var body = JSON.parse(error._body);
                          console.log(error);
                      }
                  }
                )

        }
      })
  }
}
