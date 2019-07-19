import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL} from './global';
import { Inject } from '@angular/core';

@Injectable()
export class UploadService{
  public url:String;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }
// llamada ajax
  mekeFileRequest(url: string, params: Array<string>, files:Array<File>, token:string, name:string){
      return new Promise(function(resolve, reject) {
          var formData: any = new FormData();
          var xhr = new XMLHttpRequest();

          for (var i = 0; i< files.length; i++) {
              formData.append(name, files[i], files[i].name);
          }
          xhr.onreadystatechange = function(){
              if (xhr.readyState == 4) {
                  if (xhr.status == 200) {
                      resolve(JSON.parse(xhr.response));
                  }else{
                    reject(xhr.response);
                  }
              }
          }
          xhr.open('POST',url,true);
          xhr.setRequestHeader('Authorization', token);
          xhr.send(formData);
      });
  }

}
