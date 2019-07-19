import { Component, OnInit } from '@angular/core';
import * as M from '../../../assets/materialize/js/materialize.min.js';
import { element } from 'protractor';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {

  options = {  fullWidth: true,
    indicators: true , autoplay: true } ;
  // elem = { next: 1 };
  constructor() { }

  ngOnInit() {
    const elems = document.querySelectorAll('.carousel');
    const instances = M.Carousel.init(elems, this.options);
    // const instance = M.Carousel.getInstance(this.elem.next);
  }

}
