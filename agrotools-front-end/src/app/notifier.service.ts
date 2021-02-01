import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from './notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(notificationMessage: string, typeMessage: 'success' | 'error'){
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        notificationMessage: notificationMessage
      },
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: typeMessage
    })
  }
}
