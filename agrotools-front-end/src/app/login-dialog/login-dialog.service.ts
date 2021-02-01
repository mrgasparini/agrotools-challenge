import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { environment } from 'src/environments/environment';

@Injectable()

export default class LoginDialogService {
    private path: String = '';

    constructor(public appService: AppService) {
        this.path = 'login/'
     }
  
    public doLogin(body: any): Observable<any>{
        return this.appService.post(environment.apiPath + this.path, body);
    }
  }