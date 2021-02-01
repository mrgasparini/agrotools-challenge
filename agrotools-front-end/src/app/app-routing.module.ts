import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerQuizComponent } from './answer-quiz/answer-quiz.component';
import { AnswerResumeComponent } from './answer-resume/answer-resume.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { quizzesListComponent } from './quizzes-list/quizzes-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'quizzes', component: quizzesListComponent },
  { path: 'create', component: CreateQuizComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'answer/:id', component: AnswerQuizComponent },
  { path: 'answer-resume/:id', component: AnswerResumeComponent },
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ quizzesListComponent, CreateQuizComponent, HistoryComponent, AnswerQuizComponent, AnswerResumeComponent, HomeComponent ]
