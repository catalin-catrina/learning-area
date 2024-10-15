import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-stop-training',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './stop-training.component.html',
  styleUrl: './stop-training.component.css',
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
