import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-current-training',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatButtonModule, MatDialogModule],
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.css',
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;

  dialog = inject(MatDialog);
  trainingService = inject(TrainingService);

  activeExercise = this.trainingService.getActiveExercise();

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    let step;
    if (this.activeExercise.duration) {
      step = (this.activeExercise.duration / 100) * 1000;
    }

    this.timer = setInterval(() => {
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      } else {
        this.progress += 1;
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startTimer();
      }
    });
  }
}
