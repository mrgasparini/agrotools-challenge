import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';

@Injectable()

export default class AnswerQuizService {
  private pathQuiz: String = '';
  private pathAnswer: String = '';

    constructor(public appService: AppService) {
        this.pathQuiz = 'quizzes/';
        this.pathAnswer = 'answer/';
     }
  
    public get(id: any): Observable<any>{
      return this.appService.get(environment.apiPath + this.pathQuiz + `${id}`);
    }
    
    public post(body: any): Observable<any>{
      return this.appService.post(environment.apiPath + this.pathAnswer, body);
    }
  }