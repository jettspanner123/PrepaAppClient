import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB1LE1Oz-PhnZjwfkCNiDjixFoBVY_n8aI",
    authDomain: "personal-fitness-app-jett1.firebaseapp.com",
    databaseURL: "https://personal-fitness-app-jett1-default-rtdb.firebaseio.com",
    projectId: "personal-fitness-app-jett1",
    storageBucket: "personal-fitness-app-jett1.firebasestorage.app",
    messagingSenderId: "918808538961",
    appId: "1:918808538961:web:e96afcf3f124e26f0aad70",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
export default app;
