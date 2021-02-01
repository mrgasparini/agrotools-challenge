import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public httpClient: HttpClient) { }

  public get(route: string): Observable<any>{
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    if(token)
      headers = headers.set('x-access-token', token );
    return this.httpClient.get(route, { headers: headers } );
  }
  
  public post(route: string, body: any): Observable<any>{
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    if(token)
      headers = headers.set('x-access-token', token );
    return this.httpClient.post(route, body, { headers: headers } );
  }
}
