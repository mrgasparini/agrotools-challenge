import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';

@Injectable()

export default class QuizzesListService {
    private path: String = '';

    constructor(public appService: AppService) {
        this.path = 'quizzes/'
     }
  
    public get(): Observable<any>{
      return this.appService.get(environment.apiPath + this.path);
    }
  }