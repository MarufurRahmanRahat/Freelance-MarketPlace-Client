// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYlse6ZGptbNfLfpcYgY4_zJAKLXBJ2C4",
  authDomain: "freelance-marketplace-client.firebaseapp.com",
  projectId: "freelance-marketplace-client",
  storageBucket: "freelance-marketplace-client.firebasestorage.app",
  messagingSenderId: "380851945473",
  appId: "1:380851945473:web:2bd2f4aeea39f07ab68000"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);