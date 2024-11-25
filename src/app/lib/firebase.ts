import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCL8JK5-dJy7pQVHt8xpAMAa3wudWuIXNI",
    authDomain: "nw-stats-digitalspace.firebaseapp.com",
    projectId: "nw-stats-digitalspace",
    storageBucket: "nw-stats-digitalspace.firebasestorage.app",
    messagingSenderId: "256376013856",
    appId: "1:256376013856:web:2f9e0cf3b49211ecc32845",
    measurementId: "G-4BW8B93CRY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
