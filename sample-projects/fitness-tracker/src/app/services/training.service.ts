import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  Firestore,
} from '@angular/fire/firestore';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import Exercise from '../models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private firestore = inject(Firestore);
  availableExercisesReference: CollectionReference = collection(
    this.firestore,
    'availableExercises'
  );
  completedExercisesReference: CollectionReference = collection(
    this.firestore,
    'completedExercises'
  );

  private availableExercises$ = collectionData(
    this.availableExercisesReference,
    {
      idField: 'id',
    }
  ) as Observable<Exercise[]>;
  completedExercises$ = collectionData(
    this.completedExercisesReference
  ) as Observable<Exercise[]>;

  availableExercisesSignal = toSignal(this.availableExercises$);
  completedExercisesSignal = toSignal(this.completedExercises$);

  activeExerciseIdSignal = signal<string | undefined>(undefined);

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
      this.writeToFirebase({
        ...activeExercise,
        date: new Date().toISOString(),
        state: 'completed',
      });
    }

    this.activeExerciseIdSignal.set(undefined);
  }

  addCancelledExercise(progress: number) {
    const activeExercise = this.activeExerciseSignal();

    if (activeExercise) {
      this.writeToFirebase({
        ...activeExercise,
        duration: (activeExercise.duration * progress) / 100,
        calories: (activeExercise.calories * progress) / 100,
        date: new Date().toISOString(),
        state: 'cancelled',
      });
    }

    this.activeExerciseIdSignal.set(undefined);
  }

  writeToFirebase(exercise: Exercise) {
    addDoc(this.completedExercisesReference, { ...exercise }).then(() => {});
  }
}
