// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzOaVTDhIXQhsp39RUvffzYKmXkohICDk",
  authDomain: "notes-app-84e15.firebaseapp.com",
  projectId: "notes-app-84e15",
  storageBucket: "notes-app-84e15.appspot.com",
  messagingSenderId: "495392889602",
  appId: "1:495392889602:web:5e208659d8b3580b57001b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
