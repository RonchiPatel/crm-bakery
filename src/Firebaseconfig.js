// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeU-iAptzfrPVcwXXG9sT1VZc8OKFjyio",
  authDomain: "bakerycrm-87ba9.firebaseapp.com",
  projectId: "bakerycrm-87ba9",
  storageBucket: "bakerycrm-87ba9.appspot.com",
  messagingSenderId: "665291952132",
  appId: "1:665291952132:web:3233115125ca4a4d442551",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();
