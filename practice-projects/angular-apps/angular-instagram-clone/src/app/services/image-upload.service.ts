import { inject, Injectable } from '@angular/core';
import { ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private auth = inject(AuthenticationService);
  private storage: Storage = inject(Storage);
  private userSignal = this.auth.getUser();

  uploadFile(file: File) {
    const storageRef = ref(
      this.storage,
      `users/${this.userSignal()?.uid}/${file.name}`
    );
    uploadBytesResumable(storageRef, file);
  }
}
