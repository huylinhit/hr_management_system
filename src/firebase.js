// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAVWWrJ3HB1EzhfaWbac_AyVBrsFiRgYk",
  authDomain: "swp-project-fbfc5.firebaseapp.com",
  databaseURL: "https://swp-project-fbfc5-default-rtdb.firebaseio.com",
  projectId: "swp-project-fbfc5",
  storageBucket: "swp-project-fbfc5.appspot.com",
  messagingSenderId: "472726865657",
  appId: "1:472726865657:web:544f4c70b2be4dd2070428",
  measurementId: "G-0K17MWYD0Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const database = getDatabase(app);



