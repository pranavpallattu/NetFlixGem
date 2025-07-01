// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "netflixgpt-5fdc9.firebaseapp.com",
  projectId: "netflixgpt-5fdc9",
  storageBucket: "netflixgpt-5fdc9.firebasestorage.app",
  messagingSenderId: "674040139684",
  appId: "1:674040139684:web:f74d6106ebccc99ff3bb31",
  measurementId: "G-T8CRWMYK3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth=getAuth();