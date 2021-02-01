import {OnInit, Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NotifierService } from '../notifier.service';
import QuizzesListService from './quizzes-list.service';

@Component({
  selector: 'quizzes-list',
  templateUrl: './quizzes-list.component.html',
  styleUrls: ['./quizzes-list.component.css']
})
export class quizzesListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(public quizzesListService: QuizzesListService, private router: Router, private notifierService: NotifierService){}

  async ngOnInit(){
    await this.buildTable();
  }
  
  async buildTable(){
    await this.quizzesListService.get().subscribe(
      response => { this.dataSource = new MatTableDataSource(response) },
      error => { this.notifierService.showNotification(error.error.description ? error.error.description : 'Ocorreu um erro inesperado.', 'error'); }
    )
  }

  async aswerQuiz(id: string){
    this.router.navigate([`/answer/${id}`])
  }

}