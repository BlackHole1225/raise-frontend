// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your Firebase project configuration (from Firebase Console > Project Settings)
const firebaseConfig = {
    apiKey: "AIzaSyAgpASy0g7PrOK0ZCkPuf0Z9kRlwP4nxT8",
    authDomain: "raise-906f1.firebaseapp.com",
    projectId: "raise-906f1",
    storageBucket: "raise-906f1.appspot.com",
    messagingSenderId: "1090624351432",
    appId: "1:1090624351432:web:8033736bbdbb502d74c9fd",
    measurementId: "G-BFM7FY87TC"
  };

// Initialize Firebase and export auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db,RecaptchaVerifier, signInWithPhoneNumber };
