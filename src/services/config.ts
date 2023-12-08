// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0DOZewvqtCWAOYQd0Yd4dB56GKNBZ4Do",
  authDomain: "village-security.firebaseapp.com",
  projectId: "village-security",
  storageBucket: "village-security.appspot.com",
  messagingSenderId: "520185260705",
  appId: "1:520185260705:web:c9e05373f33d32aba9dee0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app)

export { db, app, auth}