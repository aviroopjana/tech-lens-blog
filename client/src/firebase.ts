// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tech-lens-60474.firebaseapp.com",
  projectId: "tech-lens-60474",
  storageBucket: "tech-lens-60474.appspot.com",
  messagingSenderId: "404253914206",
  appId: "1:404253914206:web:f254fbea84d51aaaad30cf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);