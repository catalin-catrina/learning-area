import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import Exercise from '../../models/exercise.model';
import { TrainingService } from '../../services/training.service';
import { FormsModule, NgForm } from '@angular/forms';

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
  ],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css',
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [];

  trainingService = inject(TrainingService);

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  onTrainingStart(form: NgForm) {
    this.trainingService.startExerciseById(form.value.exercise);
  }
}
