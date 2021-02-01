import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';

@Injectable()

export default class CreateQuizService {
    private path: String = '';

    constructor(public appService: AppService) {
        this.path = 'quizzes/'
     }
  
    public post(body: any): Observable<any>{
      return this.appService.post(environment.apiPath + this.path, body);
    }
  }