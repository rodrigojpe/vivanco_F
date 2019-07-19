import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
 import { FadeLateral } from '../../animation';
// //servicios
// import {AnimalService} from '../../../services/animal.service';
// import {UserService} from '../../../services/user.service';
// import {UploadService} from '../../../services/upload.service';
// import {GLOBAL} from '../../../services/global';
//
// // modelo
// import {Animal} from '../../../models/animal';

declare var swal: any;


@Component({
  selector: 'list-admin',
  templateUrl: './list.component.html',
  // styleUrls : ['./list.component.css'],
 animations: [FadeLateral]
})

export class ListComponent implements OnInit {
    public  title :string;
  ngOnInit(){
    this.title = "panel de listar";

}
}
