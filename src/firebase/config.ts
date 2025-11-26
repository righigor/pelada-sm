// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQtkRa4sjIds5Y2oSwleRB763TKV68h1U",
  authDomain: "pelada-sm.firebaseapp.com",
  projectId: "pelada-sm",
  storageBucket: "pelada-sm.firebasestorage.app",
  messagingSenderId: "833459082",
  appId: "1:833459082:web:8b41f7371bbfa7f748ee73",
  measurementId: "G-E24XSNR9F6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const db = getFirestore(app);