// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "@firebase/firestore"
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOqAHFZxdDRDpiV_L7MgsNLw0l8CDjx7s",
  authDomain: "stuckinthemovie-c53f9.firebaseapp.com",
  projectId: "stuckinthemovie-c53f9",
  storageBucket: "stuckinthemovie-c53f9.appspot.com",
  messagingSenderId: "793388042656",
  appId: "1:793388042656:web:02d59cca6526b319b3fcc5",
  measurementId: "G-CL5S8HC4CS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
export const auth = getAuth(app);