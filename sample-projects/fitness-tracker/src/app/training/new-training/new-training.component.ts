import { Component, EventEmitter, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css',
})
export class NewTrainingComponent {
  @Output() trainingStart = new EventEmitter();

  emitTrainingStart() {
    this.trainingStart.emit();
  }
}
