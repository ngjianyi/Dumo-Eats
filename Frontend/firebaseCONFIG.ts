// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM67oDOn1KzMUV58ZQDIEz5LpGaEPPvEs",
  authDomain: "dumoeats.firebaseapp.com",
  projectId: "dumoeats",
  storageBucket: "dumoeats.appspot.com",
  messagingSenderId: "224103694578",
  appId: "1:224103694578:web:6d75d80abfcb48197e506b"
};

// Initialize Firebase
export const APP = initializeApp(firebaseConfig);
export const AUTH = getAuth(APP);
export const DATA_BASE = getFirestore(APP);

