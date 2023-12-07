import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword  } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyA0DOZewvqtCWAOYQd0Yd4dB56GKNBZ4Do",
  authDomain: "village-security.firebaseapp.com",
  projectId: "village-security",
  storageBucket: "village-security.appspot.com",
  messagingSenderId: "520185260705",
  appId: "1:520185260705:web:c9e05373f33d32aba9dee0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);