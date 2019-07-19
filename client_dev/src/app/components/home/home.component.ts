import { Component, OnInit } from '@angular/core';
 // var Instafeed = require("instafeed");
   // declare var Instafeed:any;
   import * as M from '../../../assets/materialize/js/materialize.min.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// var M:any;
export class HomeComponent implements OnInit {

 image: string;
 options = {  fullWidth: true,
  indicators: true } 
  constructor() {
    this.image = "assets/img/principal.jpg";
   }

  ngOnInit() {
    this.image = "assets/img/principal.jpg";
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems, this.options);







  }



}
