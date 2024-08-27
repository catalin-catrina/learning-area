import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PastTrainingComponent } from './past-training/past-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { CommonModule } from '@angular/common';

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
  ongoingTraining = false;

  handleTrainingStart() {
    this.ongoingTraining = true;
  }
}
