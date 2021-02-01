import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { NotifierService } from '../notifier.service';
import CreateQuizService from './create-quiz.service';
  
@Component({
  selector: 'create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})

export class CreateQuizComponent {
  quizForm: FormGroup;
   
  constructor(private fb:FormBuilder, private createQuizService:CreateQuizService, private notifierService: NotifierService, private dialog: MatDialog) {
   
    this.quizForm = this.fb.group({
      name: '',
      description: '',
      questions: this.fb.array([ this.newQuantity() ]),
    });
  }
  
  questions() : FormArray {
    return this.quizForm.get("questions") as FormArray
  }
   
  newQuantity(): FormGroup {
    return this.fb.group({
      questionName: '',
      mandatoryField: 'true',
    },[Validators.required])
  }
  
  getErrorMessage(field: any, questionName: string) {
    switch(questionName){
      case 'questionName':
        if (field.controls.questionName.hasError('required')) 
          return 'Campo obrigatório';
        break;
      case 'quizName':
        if (field.hasError('required')) 
          return 'Campo obrigatório';
        break;
    }
    
    return '';
    }
   
  addQuantity() {
    this.questions().push(this.newQuantity());
  }
   
  removeQuantity(i:number) {
    this.questions().removeAt(i);
  }
   
  async onSubmit() {
    if(this.quizForm.status === 'VALID'){
      let quizViewModel = await this.getQuizViewModel(this.quizForm);
      await this.createQuizService.post(quizViewModel).subscribe(
        response => { this.notifierService.showNotification("Questionário criado com sucesso.", 'success') },
        error => { 
          if(error.status === 403) {
            this.notifierService.showNotification("Usuário necessita estar logado.", 'error');
            return this.openDialog();
          }
          this.notifierService.showNotification(error.error.description ? error.error.description : 'Ocorreu um erro inesperado.', 'error');
      })
    }
  }

  async getQuizViewModel(quiz: any){
    let quizViewModel: any = {};
    quizViewModel.name = quiz.controls.name.value;
    quizViewModel.description = quiz.controls.description.value;
    quizViewModel.questions = [];

    quiz.controls.questions.controls.forEach((question: any) => {
      quizViewModel.questions.push({questionName: question.value.questionName, mandatoryField: question.value.mandatoryField === 'true'? true : false})
    })
    return { quizViewModel }
  }

  openDialog(): void {
    localStorage.clear();
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

