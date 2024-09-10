import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import Exercise from '../models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private firestore = inject(Firestore);

  activeExerciseIdSignal = signal<string | undefined>(undefined);
  completedExercisesSignal = signal<Exercise[]>([]);
  cancelledExercisesSignal = signal<Exercise[]>([]);
  allExercisesSignal = signal<Exercise[]>([]);

  private availableExercises$ = collectionData(
    collection(this.firestore, 'availableExercises'),
    {
      idField: 'id',
    }
  ) as Observable<Exercise[]>;

  availableExercisesSignal = toSignal(this.availableExercises$);

  activeExerciseSignal = computed(() =>
    this.availableExercisesSignal()?.find(
      (exercise) => exercise.id === this.activeExerciseIdSignal()
    )
  );

  setActiveExerciseId(selectedId: string) {
    this.activeExerciseIdSignal.set(selectedId);
  }

  addCompletedExercise() {
    const activeExercise = this.activeExerciseSignal();

    if (activeExercise) {
      this.completedExercisesSignal.set([
        ...this.completedExercisesSignal(),
        {
          ...activeExercise,
          date: new Date(),
          state: 'completed',
        },
      ]);
    }

    this.activeExerciseIdSignal.set(undefined);
  }

  addCancelledExercise(progress: number) {
    const activeExercise = this.activeExerciseSignal();

    if (activeExercise) {
      this.completedExercisesSignal.set([
        ...this.completedExercisesSignal(),
        {
          ...activeExercise,
          duration: (activeExercise.duration * progress) / 100,
          calories: (activeExercise.calories * progress) / 100,
          date: new Date(),
          state: 'cancelled',
        },
      ]);
    }

    this.activeExerciseIdSignal.set(undefined);
  }
}
