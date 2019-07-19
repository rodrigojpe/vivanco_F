import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute,Route, Params} from '@angular/router';
declare var M:any;
declare var select:any;
declare var swal:any;

import * as moment from 'moment';
// import { Moment } from 'moment';

//servicios
 import {GLOBAL} from '../../../services/global';
 import {AlbumService} from '../../../services/album.service';
 import {UserService} from '../../../services/user.service';
// import {UploadService} from '../../../services/upload.service';
// // modelo
 import {Song} from '../../../models/song';
 import {Album} from '../../../models/album';


@Component({
  selector: 'add-album',
  templateUrl: './addAlbum.component.html',
  providers:[UserService, AlbumService]
})

export class AddAlbumComponent implements OnInit{
  public title;
  public song : Song;
  public album : Album;
  public now:Date;
  year :Date ;
  public token;
  public alertMessage;
  public formateYear:String;
  date:Date;

  constructor(
    private _albumService : AlbumService,
    private _userService : UserService,
    private _router:Router,
    private _route:ActivatedRoute

  ){
    this.title = "crear nuevo Album";
    this.token = _userService.getToken();
    this.formateYear = moment(this.year).format('YYYY/MM/DD');
    // this.date = new Date(formateYear);
    // this.year =

    // this.album.year = moment('20180101').format('YYYY-MM-DD');
    this.album = new Album('','','','','','');
    document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    var   select = M.FormSelect.getInstance(elems);
    // console.log(select)

  });

  // document.addEventListener('DOMContentLoaded', function() {
  // var elems = document.querySelectorAll('.datepicker');
  // var instances = M.Datepicker.init(elems);
  // this.instances.format = 'yyyy';

// });
  }
  onSubmit(){
    console.log('mostrando fecha');

    console.log(JSON.stringify(this.album.year));

    this._route.params.forEach((params:Params)=>{
      let artis_id = params['artist'];
      this.album.artist = artis_id;

      this._albumService.addAlbum(this.token, this.album).subscribe(
        response =>{
            if (!response.album) {
                // this._router.navigate(['/']);
                console.log(response.album);

            }else{
              this.alertMessage ='El album se a creado Correctamente';
              console.log(response.album);
              this.album = response.album;
              swal({
                position: 'top-end',
                type: 'success',
                title: this.alertMessage,
                showConfirmButton: false,
                timer: 1500
              })
              this._router.navigate(['admin-panel/editar-album/',response.album._id])

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
  ngOnInit(){
    // console.log(moment('01/01/2018').format('YYYY/MM/DD'))

  }

}
