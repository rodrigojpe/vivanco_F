import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL} from './global';
import { Inject } from '@angular/core';
//.pipe(map(res => res.json()));
@Injectable()
export class  ContactService{
  public url: String;
  public identity;
  public token;

  constructor( private _http: Http){
    this.url = GLOBAL.url;
  }

public sendemail(contact){
    let params = JSON.stringify(contact);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url + 'send',params, {headers: headers})
            .pipe(map(res => res.json()));
  }

//
// public login(user_to_login, gettoken = null){
//   if (gettoken != null) {
//       user_to_login.gettoken = gettoken;
//   }
//
//   let params = JSON.stringify(user_to_login);
//   let headers = new Headers({'Content-Type':'application/json'});
//
//   return this._http.post(this.url + 'login',params, {headers: headers})
//           .pipe(map(res => res.json()));
// }
}
