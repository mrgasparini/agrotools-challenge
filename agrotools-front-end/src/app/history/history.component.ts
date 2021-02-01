import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { NotifierService } from '../notifier.service';
import HistoryService from './history.service';

export interface PeriodicElement  {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement [] = [
];
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'
  ]
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private notifierService: NotifierService, private historyService:HistoryService, private dialog: MatDialog, private router: Router){}

  async ngOnInit(){
    let token = localStorage.getItem('token');
    if(!token)
      this.openDialog();

    let answers = await this.historyService.getHistory().subscribe(
      response => { 
        this.dataSource = new MatTableDataSource(response)
      },
      error => { 
        if(error.status === 403) {
          this.notifierService.showNotification("Usuário necessita estar logado.", 'error');
          return this.openDialog();
        }
        this.notifierService.showNotification(error.error.description ? error.error.description : 'Ocorreu um erro inesperado.', 'error');
    })
  }

  openDialog(): void {
    localStorage.clear();
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  viewResume(id: any){
    this.router.navigate([`/answer-resume/${id}`])
  }
}
