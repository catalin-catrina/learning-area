import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PastTrainingComponent } from './past-training/past-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../services/training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    PastTrainingComponent,
    NewTrainingComponent,
    TrainingComponent,
    CurrentTrainingComponent,
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css',
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  newExerciseSub!: Subscription;

  trainingService = inject(TrainingService);

  ngOnInit(): void {
    this.newExerciseSub = this.trainingService.activeExerciseId$.subscribe(
      (id) => {
        if (id) {
          console.log('if id: ', id);
          this.ongoingTraining = true;
        } else {
          console.log('if not id: ', id);
          this.ongoingTraining = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.newExerciseSub.unsubscribe();
  }
}
