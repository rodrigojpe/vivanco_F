import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService} from './services/user.service';
import {Router, ActivatedRoute} from '@angular/router';
import { GLOBAL } from './services/global';
import * as M from '../assets/materialize/js/materialize.min.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , DoCheck {
  public title: String;
  public identity;
  public url: string;
  options = {};

constructor(
    private _userServices: UserService,
    private _router: Router,
    private  route: ActivatedRoute,

) {
    this.title = 'VivancoBand';
    this.url = GLOBAL.url;

}

    ngOnInit() {
    this.identity = this._userServices.getIdentity();
    console.log( this.identity);
    const elems = document.querySelectorAll('.dropdown-trigger');
    const instances = M.Dropdown.init(elems, this.options);

  }

  ngDoCheck() {
    this.identity = this._userServices.getIdentity();

  }

  logout() {
  localStorage.clear();
  this.identity = null;
  this._router.navigate(['/home']);
  // location.reload();
  }
}
