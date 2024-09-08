import { inject, Injectable } from '@angular/core';
import Exercise from '../models/exercise.model';
import { combineLatest, map, Observable, Subject } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private exercises: Exercise[] = [];
  availableExercises$: Observable<Exercise[]>;

  private activeExerciseIdSubject = new Subject<any>();
  activeExerciseId$ = this.activeExerciseIdSubject.asObservable();

  activeExercise$: Observable<any | undefined>;

  private firestore = inject(Firestore);

  constructor() {
    const exercisesCollection = collection(
      this.firestore,
      'availableExercises'
    );

    this.availableExercises$ = collectionData(exercisesCollection, {
      idField: 'id',
    }) as Observable<Exercise[]>;

    this.activeExercise$ = combineLatest([
      this.availableExercises$,
      this.activeExerciseId$,
    ]).pipe(
      map(([exercises, selectedId]: [Exercise[], string]) =>
        exercises.find((exercise: Exercise) => exercise.id === selectedId)
      )
    );
  }

  getExercises() {
    return this.exercises.slice();
  }

  selectExerciseById(selectedId: string) {
    this.activeExerciseIdSubject.next(selectedId);
  }

  completeExercise() {
    if (this.activeExercise) {
      this.exercises.push({
        ...this.activeExercise,
        date: new Date(),
        state: 'completed',
      });
    }
    this.activeExercise = undefined;
    this.activeExerciseIdSubject.next(undefined);
  }

  cancelExercise(progress: number) {
    if (this.activeExercise) {
      this.exercises.push({
        ...this.activeExercise,
        duration: this.activeExercise.duration * (progress / 100),
        calories: this.activeExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled',
      });
    }
    this.activeExercise = undefined;
    this.activeExerciseIdSubject.next(undefined);
  }
}
