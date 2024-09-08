import { inject, Injectable, OnInit } from '@angular/core';
import Exercise from '../models/exercise.model';
import { BehaviorSubject, combineLatest, map, Observable, Subject } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  allExercises$!: Observable<Exercise[]>;
  availableExercises$: Observable<Exercise[]>;

  private activeExerciseSubject = new BehaviorSubject<Exercise | undefined>(
    undefined
  );
  private activeExerciseIdSubject = new BehaviorSubject<string | undefined>(
    undefined
  );
  private completedExercisesSubject = new BehaviorSubject<Exercise[]>([]);
  private cancelledExercisesSubject = new BehaviorSubject<Exercise[]>([]);

  readonly activeExerciseId$ = this.activeExerciseIdSubject.asObservable();
  readonly activeExercise$ = this.activeExerciseSubject.asObservable();
  readonly completedExercises$ = this.completedExercisesSubject.asObservable();
  readonly cancelledExercises$ = this.cancelledExercisesSubject.asObservable();

  private firestore = inject(Firestore);

  constructor() {
    const exercisesCollection = collection(
      this.firestore,
      'availableExercises'
    );

    this.availableExercises$ = collectionData(exercisesCollection, {
      idField: 'id',
    }) as Observable<Exercise[]>;

    this.syncActiveExercise();
    this.allExercises$ = this.getAllExercises();
  }

  getAllExercises() {
    return combineLatest([
      this.completedExercises$,
      this.cancelledExercises$,
    ]).pipe(
      map(
        ([completedExercises, cancelledExercises]: [
          Exercise[],
          Exercise[]
        ]) => {
          return [...completedExercises, ...cancelledExercises];
        }
      )
    );
  }

  selectExerciseById(selectedId: string) {
    this.activeExerciseIdSubject.next(selectedId);
  }

  syncActiveExercise() {
    combineLatest([this.availableExercises$, this.activeExerciseId$])
      .pipe(
        map(([exercises, selectedId]: [Exercise[], string | undefined]) =>
          exercises.find((exercise: Exercise) => exercise.id === selectedId)
        )
      )
      .subscribe((exercise) => {
        this.activeExerciseSubject.next(exercise);
      });
  }

  addCompletedExercise() {
    const activeExercise = this.activeExerciseSubject.value;
    if (activeExercise) {
      const updatedCompletedExercises: Exercise[] = [
        ...this.completedExercisesSubject.value,
        {
          ...activeExercise,
          date: new Date(),
          state: 'completed',
        },
      ];
      this.completedExercisesSubject.next(updatedCompletedExercises);
      this.activeExerciseIdSubject.next(undefined);
      this.activeExerciseSubject.next(undefined);
    }
  }

  addCancelledExercise(progress: number) {
    const activeExercise = this.activeExerciseSubject.value;
    if (activeExercise) {
      const updatedCancelledExercises: Exercise[] = [
        ...this.cancelledExercisesSubject.value,
        {
          ...activeExercise,
          duration: activeExercise.duration * (progress / 100),
          calories: activeExercise.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled',
        },
      ];
      this.cancelledExercisesSubject.next(updatedCancelledExercises);
      this.activeExerciseIdSubject.next(undefined);
      this.activeExerciseSubject.next(undefined);
    }
  }
}
