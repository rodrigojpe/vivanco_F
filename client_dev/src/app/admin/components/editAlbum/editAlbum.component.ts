import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute,Route, Params} from '@angular/router';
declare var M:any;
declare var select:any;
declare var swal:any;

// import * as moment from 'moment';
// import { Moment } from 'moment';

//servicios
 import {GLOBAL} from '../../../services/global';
 import {AlbumService} from '../../../services/album.service';
 import {UserService} from '../../../services/user.service';
 import {UploadService} from '../../../services/upload.service';
// // modelo
 import {Song} from '../../../models/song';
 import {Album} from '../../../models/album';


@Component({
  selector: 'editar-album',
  templateUrl: '../addAlbum/addAlbum.component.html',
  providers:[UserService, AlbumService, UploadService]
})

export class EditAlbumComponent implements OnInit{
  public title:String="";
  public song : Song;
  public album : Album;
  public now:Date;
  year :Date = new Date;
  public token;
  public alertMessage;
  public is_edit;
  public url;

  constructor(
    private _albumService : AlbumService,
    private _userService : UserService,
    private _router:Router,
    private _route:ActivatedRoute,
    private _uploadService:UploadService

  ){
    this.title = "Edit Album";
    this.token = _userService.getToken();
    this.is_edit = true;
    this.url = GLOBAL.url;
    // this.album.year = moment('20180101').format('YYYY-MM-DD');
    this.album = new Album('','','2017','','','');
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
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
       console.log(id);
       console.log('===========')

      this._albumService.editAlbum(this.token, id, this.album).subscribe(
        response =>{
            if (!response.album) {
                    this.alertMessage='Error en el servidor';
                    console.log('actualizo');
            }else{
              console.log('actualizo');
                this.alertMessage = 'El Album se ha actualizado Correctamente';

                if (!this.filesToUpload) {
                      this._router.navigate(['admin-panel/artist/'+ response.album.artist])
                }else{
                  this._uploadService.mekeFileRequest(this.url +'upload-img-album/' + id, [],this.filesToUpload, this.token, 'image')
                      .then(
                          (result)=>{
                            swal({
                              position: 'top-end',
                              type: 'success',
                              title: this.alertMessage,
                              showConfirmButton: false,
                              timer: 2500
                            })
                            this._router.navigate(['admin-panel/artist/',response.album.artist])

                            // id= '';

                          },
                          (error)=>{
                              console.log(error);
                          }
                      )
                }
              console.log(response.album);
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

  getAlbum(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
      console.log(id);
      this._albumService.getAlbum(this.token, id).subscribe(
        response =>{
            if (!response.album) {
                    this.alertMessage='Error en el servidor';
            }else{
              this.album = response.album;
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
      this.getAlbum();
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
    }

}
