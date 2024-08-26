import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PastTrainingComponent } from './past-training/past-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [MatTabsModule, PastTrainingComponent, NewTrainingComponent],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css',
})
export class TrainingComponent {}
