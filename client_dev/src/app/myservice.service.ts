import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(private http : HttpClient) { }

  subnitRegister(body:any){
    return this.http.post('http://localhost:3000/user/register', body);
  }
}
