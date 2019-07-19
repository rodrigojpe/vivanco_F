import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
// import { MyserviceService } from '../../myservice.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public title;
  player: YT.Player;
 public id: string = '8wgn0LVEP5k';
 public id2: string = 'ktHXfw2L9pQ';
 public id3: string = 'BIJui4jYx4U';


  ngOnInit(){
    this.player.destroy();
  }

  constructor(){
    this.title ="Mis videos";
  }


 savePlayer(player) {
   this.player = player;
   console.log('player instance', player);
 }
 onStateChange(event) {
   console.log('player state', event.data);
 }

}
