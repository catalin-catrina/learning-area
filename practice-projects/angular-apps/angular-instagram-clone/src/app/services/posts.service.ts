import { computed, inject, Injectable } from '@angular/core';
import { getDownloadURL, listAll, ref, Storage } from '@angular/fire/storage';
import { AuthenticationService } from './authentication.service';
import { from, of, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private storage = inject(Storage);
  private auth = inject(AuthenticationService);

  userSignal = this.auth.getUser();
  user$ = toObservable(this.auth.getUser());
}
