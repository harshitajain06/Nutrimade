import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN2Nqtq2xq7EoroYr3ecNDi1h-yKsEP0I",
  authDomain: "nutrimade-9ec04.firebaseapp.com",
  projectId: "nutrimade-9ec04",
  storageBucket: "nutrimade-9ec04.appspot.com",
  messagingSenderId: "777106934029",
  appId: "1:777106934029:web:8a0d53f9f029c588660844"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
})

export const db = getFirestore(app);
export const storage = getStorage(app);

export const usersRef = collection(db,'users');