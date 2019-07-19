import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL} from './global';
import { Inject } from '@angular/core';
import {Artist} from '../models/artist';
import {Album} from '../models/album';

//.pipe(map(res => res.json()));
@Injectable()
export class  AlbumService{
  public url: String;
  public identity;
  public token;

  constructor( private _http: Http){
    this.url = GLOBAL.url;
  }

  addAlbum(token, album:Album){
    let params = JSON.stringify(album);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this._http.post(this.url+ 'create-album', params, {headers: headers})
          .pipe(map(res => res.json()));
  }

  getAlbum(token, id:string ){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers:headers});
    return this._http.get(this.url + 'album/'+id, options)
          .pipe(map(res => res.json()));

  }

  editAlbum(token, id:string, album:Album){
    let params = JSON.stringify(album);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this._http.put(this.url+ 'album/'+ id, params, {headers: headers})
          .pipe(map(res => res.json()));
  }



  getAlbums(token, artisId = null ){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers:headers});

    if (artisId == null) {
        return this._http.get(this.url + 'albums', options)
            .pipe(map(res => res.json()));
    }else{
      return this._http.get(this.url + 'albums/' + artisId, options)
          .pipe(map(res => res.json()));
    }
  }

  deleteAlbum(token, id:string ){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url + 'album/'+id, options)
          .pipe(map(res => res.json()));

  }
}
