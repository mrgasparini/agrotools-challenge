import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';

@Injectable()

export default class HistoryService {
    private path: String = '';

    constructor(public appService: AppService) {
        this.path = 'answer/'
     }
  
    public getHistory(): Observable<any>{
      return this.appService.get(environment.apiPath + this.path);
    }
  }