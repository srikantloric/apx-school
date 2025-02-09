import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyATp88VZZOiu2MSbHa-2N082DHyfLSnDCs",
  authDomain: "apx-international-dev.firebaseapp.com",
  projectId: "apx-international-dev",
  storageBucket: "apx-international-dev.firebasestorage.app",
  messagingSenderId: "203374079822",
  appId: "1:203374079822:web:da315e750942dced9a381f",
  measurementId: "G-8JYP9S6SE6"
};

// Initialize Firebasecls
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
