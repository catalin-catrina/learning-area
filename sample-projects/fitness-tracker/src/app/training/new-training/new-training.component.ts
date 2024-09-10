import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css',
})
export class NewTrainingComponent {
  trainingService = inject(TrainingService);

  availableExercises = this.trainingService.availableExercisesSignal;
  activeExercise = this.trainingService.activeExerciseSignal;

  onTrainingStart(form: NgForm) {
    this.trainingService.setActiveExerciseId(form.value.exercise);
  }
}
