import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  loginLoadingSubject = new BehaviorSubject<boolean>(false);
  exercisesLoadingSubject = new BehaviorSubject<boolean>(false);

  loginLoadingSignal = toSignal(this.loginLoadingSubject);
  exercisesLoadingSignal = toSignal(this.exercisesLoadingSubject);
}
