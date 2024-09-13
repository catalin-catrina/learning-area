import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  snackBar = inject(MatSnackBar);

  displaySnackBar(
    message: string,
    action: string | undefined,
    duration: number
  ) {
    this.snackBar.open(message, action, { duration: duration });
  }
}
