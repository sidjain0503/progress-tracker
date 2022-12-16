// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnRViE0UZ-38VBcNj5ZD4zGzZSM4Ph4sQ",
  authDomain: "progresstracker-ae79b.firebaseapp.com",
  projectId: "progresstracker-ae79b",
  storageBucket: "progresstracker-ae79b.appspot.com",
  messagingSenderId: "767696032146",
  appId: "1:767696032146:web:17746a2d02db645f8cb14b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
