import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageSnackbarService {


  constructor(
    private snackBar: MatSnackBar,
    
  ) { }

  /** 
   * Display snack bar message on screen
   */
  openSnackBar(msg: string) {
    this.snackBar.open(msg, "Ok", { duration: 3000});
  }

}
