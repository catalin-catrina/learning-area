import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private firestore = inject(Firestore);
  private auth = inject(AuthenticationService);
  private storage: Storage = inject(Storage);

  uploadFile(file: File) {
    const userSignal = this.auth.getUser();
    const storageRef = ref(
      this.storage,
      `users/${userSignal()?.['uid']}/${file.name}`
    );
    uploadBytesResumable(storageRef, file);
  }
}
