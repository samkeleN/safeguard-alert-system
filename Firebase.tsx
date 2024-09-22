// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP-6_D-3NzPN65dWDbTWKnPPj4YzJN4Oc",
  authDomain: "safeguard-alert-system.firebaseapp.com",
  databaseURL: "https://safeguard-alert-system-default-rtdb.firebaseio.com",
  projectId: "safeguard-alert-system",
  storageBucket: "safeguard-alert-system.appspot.com",
  messagingSenderId: "417348098090",
  appId: "1:417348098090:web:af2d778ad8cf9a6064cb53",
  measurementId: "G-68DQYMVFLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };