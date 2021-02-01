import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { NotifierService } from '../notifier.service';
import AnswerQuizService from './answer-quiz.service';

@Component({
  selector: 'app-aswer-quiz',
  templateUrl: './answer-quiz.component.html',
  styleUrls: ['./answer-quiz.component.css']
})
export class AnswerQuizComponent implements OnInit {
  quiz: any;
  quizForm: FormGroup;

  constructor(private router: Router, private answerQuizService: AnswerQuizService, private route: ActivatedRoute, private fb:FormBuilder, private notifierService: NotifierService, public dialog: MatDialog) { 
    this.quizForm = this.fb.group({
      questions: this.fb.array([]),
    });
  }

  async ngOnInit(){

    let id = this.route.snapshot.paramMap.get('id');
    await this.getQuiz(id);

  }

  async getQuiz(id: any){
    await this.answerQuizService.get(id).subscribe(
      response => { this.createForm(response) },
      error => { 
        if(error.status === 403) {
          this.notifierService.showNotification("Usuário necessita estar logado.", 'error');
          return this.openDialog();
        }
        this.notifierService.showNotification(error.error.description ? error.error.description : 'Ocorreu um erro inesperado.', 'error')}
    )
  }

  async createForm(quiz: any){
    this.quiz = quiz;

    quiz.questions.forEach((question: any) => {
      this.questions().push(this.newQuestion(question))
    })

  }

  newQuestion(question: any): FormGroup {
    return this.fb.group({
      questionName: question.questionName,
      mandatoryField: question.mandatoryField,
      questionValue: ''
    },[Validators.required])
  }

  questions() : FormArray {
    return this.quizForm.get("questions") as FormArray
  }

  async onSubmit(){
    if(this.quizForm.status === 'VALID'){
      let quizViewModel = await this.getQuizViewModel(this.quizForm);

      await this.answerQuizService.post(quizViewModel).subscribe(
        response => { 
          this.notifierService.showNotification("Resposta cadastrada com sucesso.", 'success');
          this.router.navigate(['quizzes']);
         },
        error => { 
          if(error.status === 403) {
            this.notifierService.showNotification("Usuário necessita estar logado.", 'error');
            return this.openDialog();
          }
          this.notifierService.showNotification(error.error.description ? error.error.description : 'Ocorreu um erro inesperado.', 'error');
        }
      )    
    }
  }

  async getQuizViewModel(quiz: any){
    let quizViewModel: any = {};
    quizViewModel.quizId = this.quiz.id;
    quizViewModel.name = this.quiz.quizName;
    quizViewModel.questions = [];

    quiz.controls.questions.controls.forEach((question: any) => {
      quizViewModel.questions.push({questionName: question.value.questionName, questionValue: question.value.questionValue })
    })
    return { quizViewModel }
  }
  
  getErrorMessage(field: any) {
    if (field.controls.questionValue.hasError('required')) 
      return 'Campo obrigatório';
    return '';
    }
   
    
  openDialog(): void {
    localStorage.clear();
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getQuiz(`${this.route.snapshot.url[1].path}`);
    });
  }
}
