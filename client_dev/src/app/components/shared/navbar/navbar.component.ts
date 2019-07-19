import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService} from '../../../services/user.service';
import {Router, ActivatedRoute} from '@angular/router';
import { GLOBAL } from '../../../services/global';
declare var  M: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public title :String;
    public identity;
    public url:string;


    constructor(
        private _userServices : UserService,
        private _router : Router,
        private  route: ActivatedRoute,

    ){
        this.title = 'VivancoBand';
        this.url = GLOBAL.url;

    }

        ngOnInit(){
        this.identity = this._userServices.getIdentity();
        console.log( this.identity);

      }

      ngDoCheck(){
        this.identity = this._userServices.getIdentity();

      }
  logout(){
  localStorage.clear();
  this.identity = null;
  this._router.navigate(['/home']);
  // location.reload();
}
}
