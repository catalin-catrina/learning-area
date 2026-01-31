import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccessTokenStore {
  token = signal<string | null>(null);

  get() {
    return this.token();
  }

  set(token: string | null): void {
    this.token.set(token);
  }

  clear(): void {
    this.token.set(null);
  }
}
