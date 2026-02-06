// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCIpUlNO69WBOE9zWYkjAdqeKbSEwcBpQ",
  authDomain: "evecollections-5ae71.firebaseapp.com",
  projectId: "evecollections-5ae71",
  storageBucket: "evecollections-5ae71.appspot.com",
  messagingSenderId: "824231107553",
  appId: "1:824231107553:web:850ac5797692d09b3f90a0",
  measurementId: "G-6ZC8H3N05T"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);   // <-- NOW THIS WORKS
export default app;