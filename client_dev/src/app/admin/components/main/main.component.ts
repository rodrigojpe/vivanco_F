import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var M: any;
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'admin-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'panel de adminitracion';
  public identity;
  constructor(
      private _userService : UserService
  ){
    this.identity = _userService.getIdentity();
  }

ngOnInit(){

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    // instances.open();
    // instances.close();
   });

}
 myFunction($event) {
  // location.reload();
  // $event.preventDefault();
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
     instances.open();});
  console.log('peos');
}

}
