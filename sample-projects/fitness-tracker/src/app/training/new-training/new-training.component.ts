import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, CommonModule } from '@angular/common';

import Exercise from '../../models/exercise.model';
import { TrainingService } from '../../services/training.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

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
export class NewTrainingComponent implements OnInit {
  exercises$!: Observable<Exercise[]>;

  trainingService = inject(TrainingService);

  ngOnInit(): void {
    this.exercises$ = this.trainingService.availableExercises$;
  }

  onTrainingStart(form: NgForm) {
    this.trainingService.selectExerciseById(form.value.exercise);
  }
}
