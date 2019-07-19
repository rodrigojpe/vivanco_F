import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FadeLateral} from '../../admin/animation';
declare var swal:any;
declare var M:any;

// declare var select:any;
import * as moment from 'moment';
//servicios
 import {GLOBAL} from '../../services/global';
 import {AlbumService} from '../../services/album.service';
 import {UserService} from '../../services/user.service';
 import {SongService} from '../../services/song.service';


// // modelo
 import {Artist} from '../../models/artist';
 import {Album} from '../../models/album';
 import {Song} from '../../models/song';



@Component({
  selector: 'list-song',
  templateUrl: './listSong.component.html',
  styleUrls: ['./listSong.component.css'],
  providers:[SongService],
  animations:[FadeLateral]

})

export class ListSongComponent implements OnInit{
  public title;
  public identity;
  public  url:any;
  public token;
  public album :Album;
  public alertMessage;
  public disc;
  public songs: Song[];


  constructor(
      private _route : ActivatedRoute,
      private _router: Router,
      private _userService : UserService,
      private _albumService: AlbumService,
      private _songService: SongService
  ){
      this.title ='Details Albums';
      this.disc = 'Albums';
      this.identity = _userService.getIdentity();
      this.url = GLOBAL.url;
      this.token = _userService.getToken();
      // this.album = new Album('','','','','')
  }

  ngOnInit(){
    if (this.identity) {
      this.getAlbum();
        
    }
    // console.log(this.songs);
  //   document.addEventListener('DOMContentLoaded', function() {
  //   var elems = document.querySelectorAll('.modal');
  //   var instances = M.Modal.init(elems);
  //   instances.onCloseStart = false;
  //   instances.onCloseEnd = true;
  //    console.log(instances.onCloseStart);
  // });
  }
  OnChanges(){
    this.getAlbum();

  }

  getAlbum(){
    this._route.params.forEach((params: Params)=>{
        let id = params['id'];
        this._albumService.getAlbum(this.token , id).subscribe(
          response =>{
              if (!response.album) {
                  // this._router.navigate(['/']);
                  // console.log(response.artist);

              }else{
               this.album = response.album;
               console.log(response.album);
                // sacar las canciones  de los albums
                  this._songService.getSongs(this.token, response.album._id).subscribe(
                  response =>{
                      if (!response.songs) {
                        this.alertMessage ='Este Album no tiene canciones';
                      }else{
                        this.songs =response.songs;
                      }
                  },
                  error =>{
                    var errorMessage = <any>error;
                    if (errorMessage != null) {
                        var body = JSON.parse(error._body);
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

  onDeleteSong(id){
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
        this._songService.deleteSong(this.token, id).subscribe(
              response =>{
                  if (!response.song) {
                      this.alertMessage = 'Error en el Servidor';
                  }else{
                      this.getAlbum();
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
        }
    })
  }

  myFunction(name, event){
    // console.log(event.play);
    // console.log(name);
    var estado:any;
    var array =[];
    var vid = <HTMLAudioElement>document.getElementById("audio");
    var count=0;
    if(vid.paused) {
       // vid.play();
       count = count +1;
       let total=0;
       array.push(count);
       estado = false;
       console.log(array);

     }
     else {
       // vid.pause();
       estado = true;

       count = 0;
       let total = count;
       console.log(total);


     }
     console.log(vid.paused);
    // return;



    switch(name) {
       case this.songs[0].name:
       count = count +1;
       break;
       case this.songs[1].name:
       count = count +1;
       break;
       case this.songs[2].name:
       count = count +1;
       break;
       case this.songs[3].name:
       count = count +1;
       break;
       case this.songs[4].name:
       count = count +1;
       break;
       case this.songs[5].name:
       count = count +1;
       break;
       case this.songs[6].name:
       count = count +1;
       break;
       case this.songs[7].name:
       count = count +1;
       break;
       default:
       count = 0;
   }
   console.log(count);
  }

  onPly(song){
    console.log(song);

    let player = JSON.stringify(song);
    let file_path = this.url + 'get-song-file/' + song.file;
    console.log(file_path);
    let image_album = this.url + 'upload-img-album/' + song.album.image;

    localStorage.setItem('sound_song', player);

    document.getElementById('mp3-source').setAttribute("src", file_path);
    (document.getElementById('player') as any).load();
    (document.getElementById('player') as any).play();
    console.log('nombre');
    console.log(song.album.artist.name);

    document.getElementById('nombre-song').innerHTML = song.name;
    document.getElementById('artist-song').innerHTML = song.album.artist.name;
    document.getElementById('play-image-album').setAttribute('src',image_album);


  }
}
