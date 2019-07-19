import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL} from './global';
import { Inject } from '@angular/core';
import {Artist} from '../models/artist';
//.pipe(map(res => res.json()));
@Injectable()
export class  ArtistService{
  public url: String;
  public identity;
  public token;

  constructor( private _http: Http){
    this.url = GLOBAL.url;
  }

  addArtis(token, artist:Artist){
    let params = JSON.stringify(artist);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this._http.post(this.url+ 'artist', params, {headers: headers})
          .pipe(map(res => res.json()));
  }

  getArtists(token, page){
    let headers = new Headers({
      'Content-Type':'application/json; charset = utf-8;',
      'Authorization':token
    });
    let options = new RequestOptions({headers:headers});
    return this._http.get(this.url+'artists/'+page, options)
            .pipe(map(res => res.json()));
  }

  getArtist(token, id:string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers:headers});
    return this._http.get(this.url+'artist/'+id, options)
            .pipe(map(res => res.json()));

  }

  editArtis(token, id:string, artist:Artist){
    let params = JSON.stringify(artist);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this._http.put(this.url+ 'artist/'+id, params, {headers: headers})
          .pipe(map(res => res.json()));
  }

  deleteArtist(token, id:string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'artist/'+id, options)
            .pipe(map(res => res.json()));

  }

}
