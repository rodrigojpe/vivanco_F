import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL} from './global';
import { Inject } from '@angular/core';
import {Song} from '../models/song';
import {Album} from '../models/album';

//.pipe(map(res => res.json()));
@Injectable()
export class  SongService{
  public url: String;
  public identity;
  public token;


  constructor( private _http: Http){
    this.url = GLOBAL.url;
  }

  addSong(token, song:Song){
    let params = JSON.stringify(song);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this._http.post(this.url+ 'song', params, {headers: headers})
          .pipe(map(res => res.json()));
  }

  getSong(token, id:String){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers:headers})
    return this._http.get(this.url+ 'song/'+ id, {headers: headers})
          .pipe(map(res => res.json()));
  }

  getSongs(token, albumId= null){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers:headers})
    if (albumId == null) {
      return this._http.get(this.url+ 'songs/'+ options)
            .pipe(map(res => res.json()));
    }else{
      return this._http.get(this.url+ 'songs/'+ albumId, options)
            .pipe(map(res => res.json()));
    }

  }

  editSong(token,id:String, song:Song){
    let params = JSON.stringify(song);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this._http.put(this.url+ 'update/' + id, params, {headers: headers})
          .pipe(map(res => res.json()));
  }

  deleteSong(token, id:String){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers:headers})
    return this._http.delete(this.url+ 'song/'+ id, {headers: headers})
          .pipe(map(res => res.json()));
  }
}
