// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZdoH9qSIJHa5ry0sz-YADBB2jh8wXAQU",
  authDomain: "wildcare-f918d.firebaseapp.com",
  projectId: "wildcare-f918d",
  storageBucket: "wildcare-f918d.firebasestorage.app",
  messagingSenderId: "306368947937",
  appId: "1:306368947937:web:aabb4b707ed903d23139a0",
  measurementId: "G-9SC8XK341M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
