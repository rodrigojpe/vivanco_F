import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute,Route, Params} from '@angular/router';
declare var swal:any;

//servicios
import {GLOBAL} from '../../services/global';
// import {UserService} from '../../../services/user.service';
// import { SongService } from '../../../services/song.service';
// import {UploadService} from '../../../services/upload.service';
// // modelo
  import {Song} from '../../models/song';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  // template: `  `,
   styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit {
  public url:String;
  public song;

  constructor(){
      this.url = GLOBAL.url;
      this.song = new Song('1','','','','')
  }

  ngOnInit(){

  }
}
