import {
  AfterContentChecked,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PastTrainingComponent } from './past-training/past-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TrainingService } from '../services/training.service';

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
export class TrainingComponent {
  newExerciseSub!: Subscription;

  trainingService = inject(TrainingService);

  activeExerciseId = this.trainingService.activeExerciseIdSignal;

  onGoingTrainingSignal = computed(() =>
    this.activeExerciseId() ? true : false
  );
}
