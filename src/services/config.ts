import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyD-j6S4nAO_to3gmKtS9900Ps8wu99hr8k",
//   authDomain: "village-f4548.firebaseapp.com",
//   projectId: "village-f4548",
//   storageBucket: "village-f4548.appspot.com",
//   messagingSenderId: "282231058200",
//   appId: "1:282231058200:web:913156cd726e522d98f86d"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAo4vhQPfilTPjh_HYuJOvUSZYirJ48a7U",
  authDomain: "village-17d46.firebaseapp.com",
  projectId: "village-17d46",
  storageBucket: "village-17d46.appspot.com",
  messagingSenderId: "949161411832",
  appId: "1:949161411832:web:3e90233a75411268d4e70d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistent state
const auth = getAuth(app);
auth.useDeviceLanguage(); 

// Set up Firebase Firestore
const db = getFirestore(app);

// Persist authentication state using AsyncStorage
const persistAuthState = async (user:any) => {
  try {
    if (user) {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem('user');
    }
  } catch (error) {
    console.error('Error persisting auth state:', error);
  }
};

// Listen for changes in authentication state and persist the state
onAuthStateChanged(auth, (user) => {
  persistAuthState(user);
});

export { db, app, auth, persistAuthState };
