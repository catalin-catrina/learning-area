import { Injectable } from '@angular/core';
import Exercise from '../models/exercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'pushups', name: 'Pushups', duration: 40, calories: 14 },
    { id: 'lunges', name: 'Lunges', duration: 35, calories: 11 },
  ];
  private activeExercise: Exercise | undefined;
  private exercises: Exercise[] = [];

  private activeExerciseSubject = new Subject<Exercise | undefined>();
  activeExercise$ = this.activeExerciseSubject.asObservable();

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  getActiveExercise() {
    return { ...this.activeExercise };
  }

  getExercises() {
    return this.exercises.slice();
  }

  startExerciseById(selectedId: string) {
    this.activeExercise = this.availableExercises.find(
      (x) => x.id === selectedId
    );
    if (this.activeExercise) {
      this.activeExerciseSubject.next({ ...this.activeExercise });
    }
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
    this.activeExerciseSubject.next(undefined);
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
    this.activeExerciseSubject.next(undefined);
  }
}
