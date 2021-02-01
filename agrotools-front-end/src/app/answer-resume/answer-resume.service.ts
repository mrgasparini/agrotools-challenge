import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';

@Injectable()

export default class AnswerResumeService {
  private pathAnswer: String = '';

    constructor(public appService: AppService) {
        this.pathAnswer = 'answer/';
     }
  
    public get(id: any): Observable<any>{
      return this.appService.get(environment.apiPath + this.pathAnswer + `${id}`);
    }
  }