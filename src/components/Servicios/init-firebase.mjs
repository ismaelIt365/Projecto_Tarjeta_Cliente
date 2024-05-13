// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEuQUOzbbN_07PYsrWAz2JIzFxfrbzWKU",
  authDomain: "club365obrador.firebaseapp.com",
  projectId: "club365obrador",
  storageBucket: "club365obrador.appspot.com",
  messagingSenderId: "948532793638",
  appId: "1:948532793638:web:4b4a558f120660662831e7",
  measurementId: "G-4SMD59E0DC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
