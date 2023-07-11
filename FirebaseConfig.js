// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAVyMat5xOl4Jp2_SSjthm6YDOtQg81dTM",
    authDomain: "lucid-bfbb4.firebaseapp.com",
    projectId: "lucid-bfbb4",
    storageBucket: "lucid-bfbb4.appspot.com",
    messagingSenderId: "511792504360",
    appId: "1:511792504360:web:218e7c45fa70ac859ddf1d",
    measurementId: "G-768WR3WP04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
 
export { db, auth };