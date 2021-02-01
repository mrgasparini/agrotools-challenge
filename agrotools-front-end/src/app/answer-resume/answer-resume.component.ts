import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { NotifierService } from '../notifier.service';
import AnswerResumeService from './answer-resume.service';

@Component({
  selector: 'app-answer-resume',
  templateUrl: './answer-resume.component.html',
  styleUrls: ['./answer-resume.component.css']
})
export class AnswerResumeComponent implements OnInit {

  constructor(private answerResumeService: AnswerResumeService, private route: ActivatedRoute, private notifierService: NotifierService, public dialog: MatDialog, private router: Router) { }
  answer: any;

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    await this.getAnswer(id);
  }

  async getAnswer(id: any){
      await this.answerResumeService.get(id).subscribe(
        response => { this.answer = response;
        },
        error => { 
          if(error.status === 403) {
            this.notifierService.showNotification("Usuário necessita estar logado.", 'error');
            return this.openDialog();
          }
          this.notifierService.showNotification(error.error.description ? error.error.description : 'Ocorreu um erro inesperado.', 'error')}
      )
  }

  
  openDialog(): void {
    localStorage.clear();
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAnswer(`${this.route.snapshot.url[1].path}`);
    });
  }

  returnToHistory(){
    this.router.navigate(['history']);
  }
}
