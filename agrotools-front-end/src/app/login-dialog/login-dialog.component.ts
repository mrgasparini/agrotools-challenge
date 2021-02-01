import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from '../notifier.service';
import LoginDialogService from './login-dialog.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  password = '';
  username = '';
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>, @Inject(MAT_DIALOG_DATA) public message: string, private loginDialogService: LoginDialogService, private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  async doLogin(){
    await this.loginDialogService.doLogin({username: this.username, password: this.password}).subscribe(
      response => { 
        this.notifierService.showNotification("Usuário logado com sucesso.", 'success');
        localStorage.setItem('token', response.token);
        this.closeDialog();
      },
      error => {
        this.notifierService.showNotification(error.error.description ? error.error.description : 'Ocorreu um erro inesperado.', 'error');
    })
  }

}
