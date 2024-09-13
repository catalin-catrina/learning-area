import { AfterContentChecked, Component, effect, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TrainingService } from '../../services/training.service';
import { StateService } from '../../services/state.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

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
    SpinnerComponent,
  ],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css',
})
export class NewTrainingComponent implements AfterContentChecked {
  ngAfterContentChecked(): void {
    console.log(this.isLoading());
    console.log(this.availableExercises());
  }
  trainingService = inject(TrainingService);
  stateService = inject(StateService);

  availableExercises = this.trainingService.availableExercisesSignal;
  activeExercise = this.trainingService.activeExerciseSignal;
  isLoading = this.stateService.exercisesLoadingSignal;

  onTrainingStart(form: NgForm) {
    this.trainingService.setActiveExerciseId(form.value.exercise);
  }
}
