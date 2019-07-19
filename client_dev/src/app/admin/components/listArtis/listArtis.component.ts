import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FadeLateral } from '../../animation';
// //servicios
import { UserService } from '../../../services/user.service';
import { ArtistService } from '../../../services/artist.service';
import { GLOBAL } from '../../../services/global';
declare var swal:any;

 // modelo
import {Artist} from '../../../models/artist';

@Component({
  selector: 'listArtis-admin',
  templateUrl: './listArtis.component.html',
  styleUrls: ['./listArtist.component.css']
})

export class ListArtisComponent implements OnInit {
    public  title :string;
    public artists:Artist[];
    public identity;
    public token;
    public url:string;
    public next_page;
    public prev_page;

    constructor(
        private _route : ActivatedRoute,
        private _router: Router,
        private _userService : UserService,
        private _artisService : ArtistService
    ){
        this.title ='Artist';
        this.identity = _userService.getIdentity();
        this.url = GLOBAL.url;
        this.token = _userService.getToken();
        this.next_page = 1;
        this.prev_page = 1;
    }


    ngOnInit(){
      this.title = "panel de listarArtist";
      console.log('inicianlizando lista de artistas');
      this.getArtis();
  }

    getArtis(){
        this._route.params.forEach((params:Params)=>{
          let page = +params['page'];
          if (!page) {
              page = 1;
          }else{
            this.next_page = page +1;
            this.prev_page = page -1;

            if (this.prev_page == 0) {
                this.prev_page = 1;
            }
          }
          this._artisService.getArtists(this.token, page).subscribe(
            response =>{
                if (!response.artists) {
                    console.log(response);
                }else{
                    this.artists = response.artists;
                    console.log(this.artists);
                    console.log(response);
                }
            },
            error =>{
                var messageError = <any>error;

                if (messageError != null) {
                    var body = JSON.parse(error._body);
                    console.log(error);
                }
            }
          )
        });
    }

    onDeleteArtist(id){
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
                  this._artisService.deleteArtist(this.token,id).subscribe(
                    response =>{
                        if (!response.artist) {
                            console.log(response);
                        }

                        this.getArtis();
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
