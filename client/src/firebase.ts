// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrrQTgyv76WGZCPfNU_n3Lvb8kEaZV5Ok",
  authDomain: "collegebazar-44fc4.firebaseapp.com",
  projectId: "collegebazar-44fc4",
  storageBucket: "collegebazar-44fc4.appspot.com",
  messagingSenderId: "1004641870968",
  appId: "1:1004641870968:web:ce62b7c2f5a930b5fe398d",
  measurementId: "G-1NV5Z1GSWX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);