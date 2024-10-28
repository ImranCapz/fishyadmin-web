// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "sea1-2a585.firebaseapp.com",
  databaseURL: "https://sea1-2a585-default-rtdb.firebaseio.com",
  projectId: "sea1-2a585",
  storageBucket: "sea1-2a585.appspot.com",
  messagingSenderId: "646492882054",
  appId: "1:646492882054:web:029d013c7bf5930f2abd07",
  measurementId: "G-1HEJ0109R2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
