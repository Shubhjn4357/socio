// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuy6tU3dhqfl4ws0aZJPJSMiQ3TK3WWQ4",
  authDomain: "social-app-c5f59.firebaseapp.com",
  projectId: "social-app-c5f59",
  storageBucket: "social-app-c5f59.appspot.com",
  messagingSenderId: "899478346610",
  appId: "1:899478346610:web:ff393bcbb55a98c79e5beb",
  measurementId: "G-TRMW0MK62B",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Authenticater
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {app,analytics,auth,db,storage}