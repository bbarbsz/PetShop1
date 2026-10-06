import { getApp, getApps, initializeApp } from "firebase/app";
import {getAuth, getReactNativePersistence, initializeAuth,} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
   apiKey: "AIzaSyAjAr1dbLnGd4Klgr7DY3XDADVOfZwQrEE",
  authDomain: "petshop-d6af8.firebaseapp.com",
  projectId: "petshop-d6af8",
  storageBucket: "petshop-d6af8.firebasestorage.app",
  messagingSenderId: "904450872458",
  appId: "1:904450872458:web:ce212e35982d359f668973"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;

if (getApps().length === 1) {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    auth = getAuth(app);
  }
} else {
  auth = getAuth(app);
}

export { auth };